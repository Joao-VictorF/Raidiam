/// <reference types="cypress" />
import organisation from '../fixtures/organisation.json'

let stores

describe('Org. Authorisation Servers Page', () => {
  beforeEach(() => {
    cy.visit(`/organisations/${organisation.OrganisationId}`).then((win) => {
      stores = win.stores
      stores.participantsStore.organisations = [organisation]
    })
  })

  it('should display the organisation details', () => {
    cy.get('.header-title').should('contain', organisation.OrganisationName)
  })

  it('should render authorisation server cards', () => {
    cy.get('.authorisation-server-card').should(
      'have.length',
      organisation.AuthorisationServers.length
    )
    organisation.AuthorisationServers.forEach((server) => {
      cy.get('.authorisation-server-card').should('contain', server.CustomerFriendlyName)
    })
  })

  it('should open the Authorisation Server Certifications popover and check its content', () => {
    cy.get('.popover-btn').first().click()
    cy.get('.popover-content').within(() => {
      cy.get('table').should('exist')
      cy.get('tr').should('have.length.greaterThan', 1)
    })
  })

  it('should search for a specific authorisation server and only display it', () => {
    const searchTerm = organisation.AuthorisationServers[0].CustomerFriendlyName
    cy.get('input').type(searchTerm)
    cy.get('.authorisation-server-card').should('have.length', 1)
    cy.get('.authorisation-server-card').should('contain', searchTerm)
  })

  it('should search for nonexistent authorisation server and show no results message', () => {
    const searchTerm = 'Nonexistent Authorisation Server'
    cy.get('input').type(searchTerm)
    cy.get('.authorisation-server-card').should('have.length', 0)
    cy.contains('No authorisation servers match your search.').should('be.visible')
  })
})
