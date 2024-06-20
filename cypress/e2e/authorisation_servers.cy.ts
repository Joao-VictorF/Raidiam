/// <reference types="cypress" />
import organisation from '../fixtures/organisation.json'

let stores: Cypress.AUTWindow['stores']

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
})
