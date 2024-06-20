/// <reference types="cypress" />
import organisation from '../fixtures/organisation.json'

let stores

const SELECTORS = {
  organisationCard: '.organisation-card',
  headerTitle: '.header-title',
  authorisationServerCard: '.authorisation-server-card',
  popoverBtn: '.popover-btn',
  popoverContent: '.popover-content',
  searchInput: 'input[placeholder="Search Authorisation Servers"]',
  noResultsMessage: 'No authorisation servers match your search.'
}

describe('Org. Authorisation Servers Page', () => {
  beforeEach(() => {
    cy.visit(`/organisations/${organisation.OrganisationId}`).then((win) => {
      stores = win.stores
      stores.participantsStore.organisations = [organisation]
    })
  })

  it('should display the organisation details', () => {
    cy.get(SELECTORS.headerTitle).should('contain', organisation.OrganisationName)
  })

  it('should render authorisation server cards', () => {
    cy.get(SELECTORS.authorisationServerCard).should(
      'have.length',
      organisation.AuthorisationServers.length
    )
    organisation.AuthorisationServers.forEach((server) => {
      cy.get(SELECTORS.authorisationServerCard).should('contain', server.CustomerFriendlyName)
    })
  })

  it('should open the Authorisation Server Certifications popover and check its content', () => {
    cy.get(SELECTORS.popoverBtn).first().click()
    cy.get(SELECTORS.popoverContent).within(() => {
      cy.get('table').should('exist')
      cy.get('tr').should('have.length.greaterThan', 1)
    })
    cy.get(SELECTORS.popoverBtn).first().click() // Ensure the popover can be closed
  })

  it('should search for a specific authorisation server and only display it', () => {
    const searchTerm = organisation.AuthorisationServers[0].CustomerFriendlyName
    cy.get(SELECTORS.searchInput).clear()
    cy.get(SELECTORS.searchInput).type(searchTerm)
    cy.get(SELECTORS.authorisationServerCard).should('have.length', 1)
    cy.get(SELECTORS.authorisationServerCard).should('contain', searchTerm)
  })

  it('should search for nonexistent authorisation server and show no results message', () => {
    const searchTerm = 'Nonexistent Authorisation Server'
    cy.get(SELECTORS.searchInput).clear()
    cy.get(SELECTORS.searchInput).type(searchTerm)
    cy.get(SELECTORS.authorisationServerCard).should('have.length', 0)
    cy.contains(SELECTORS.noResultsMessage).should('be.visible')
  })

  it('should check feature support indicators in authorisation server card', () => {
    const server = organisation.AuthorisationServers[0]
    cy.get(SELECTORS.authorisationServerCard)
      .first()
      .within(() => {
        if (server.SupportsDCR) {
          cy.contains('Support DCR').should('have.class', 'bg-green-200 text-green-800')
        } else {
          cy.contains("Don't Support DCR").should('have.class', 'bg-red-200 text-red-800')
        }

        if (server.SupportsCiba) {
          cy.contains('Support CIBA').should('have.class', 'bg-green-200 text-green-800')
        } else {
          cy.contains("Don't Support CIBA").should('have.class', 'bg-red-200 text-red-800')
        }

        if (server.SupportsRedirect) {
          cy.contains('Support Redirect').should('have.class', 'bg-green-200 text-green-800')
        } else {
          cy.contains("Don't Support Redirect").should('have.class', 'bg-red-200 text-red-800')
        }

        if (server.AutoRegistrationSupported) {
          cy.contains('Support Auto Registration').should(
            'have.class',
            'bg-green-200 text-green-800'
          )
        } else {
          cy.contains("Don't Support Auto Registration").should(
            'have.class',
            'bg-red-200 text-red-800'
          )
        }
      })
  })
})
