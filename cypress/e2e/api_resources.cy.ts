/// <reference types="cypress" />
import organisation from '../fixtures/organisation.json'

let stores: Cypress.AUTWindow['stores']

const SELECTORS = {
  headerTitle: '.header-title',
  searchInput: 'input[placeholder="Search by Family Type"]',
  accordionBtn: '.accordion-btn',
  accordionContent: '.accordion-content',
  noResultsMessage: "No Api's match your search.",
  apiResourceCard: '.api-resource-card',
  certificationStatus: '.certification-status',
  certificationTable: 'table',
  certificationTableRows: 'table tbody tr'
}

describe('API Resources Page', () => {
  beforeEach(() => {
    const route = `/organisations/${organisation.OrganisationId}/s/${organisation.AuthorisationServers[0].AuthorisationServerId}/api-resources`
    cy.visit(route).then((win) => {
      stores = win.stores
      stores.participantsStore.organisations = [organisation]
      console.log(stores)
    })
  })

  it('should render API resource cards', () => {
    cy.get(SELECTORS.accordionBtn).should(
      'have.length',
      organisation.AuthorisationServers[0].ApiResources.length
    )
    organisation.AuthorisationServers[0].ApiResources.forEach((api) => {
      cy.get(SELECTORS.accordionBtn).should('contain', api.ApiFamilyType)
    })
  })

  it('should open the API resource accordion and check its content', () => {
    cy.get(SELECTORS.accordionBtn).first().click()
    cy.get(SELECTORS.accordionContent).should('be.visible')
    cy.get(SELECTORS.certificationTable).should('exist')
    cy.get(SELECTORS.certificationTableRows).should('have.length.greaterThan', 0)
  })

  it('should search for a specific API resource and only display it', () => {
    const searchTerm = organisation.AuthorisationServers[0].ApiResources[0].ApiFamilyType
    cy.get(SELECTORS.searchInput).clear()
    cy.get(SELECTORS.searchInput).type(searchTerm)

    cy.get(SELECTORS.accordionBtn).should('have.length', 1)
    cy.get(SELECTORS.accordionBtn).should('contain', searchTerm)
  })

  it('should search for nonexistent API resource and show no results message', () => {
    const searchTerm = 'Nonexistent API Resource'
    cy.get(SELECTORS.searchInput).clear()
    cy.get(SELECTORS.searchInput).type(searchTerm)

    cy.get(SELECTORS.accordionBtn).should('have.length', 0)
    cy.contains(SELECTORS.noResultsMessage).should('be.visible')
  })

  it('should check if the API certification status are displaying the right colors', () => {
    const certificationStatuses = {
      AwaitingCertification: 'text-yellow-600',
      Certified: 'text-green-600',
      Deprecated: 'text-red-600',
      Rejected: 'text-red-500',
      SelfCertified: 'text-blue-600'
    }

    cy.get(SELECTORS.accordionBtn).each(($btn, index) => {
      cy.wrap($btn).click()
      cy.get(SELECTORS.accordionContent)
        .eq(index)
        .within(() => {
          cy.get(SELECTORS.certificationStatus).each(($status) => {
            const statusText = $status.text().trim().replace(/\s+/g, '')
            if (certificationStatuses[statusText]) {
              cy.wrap($status).should('have.class', certificationStatuses[statusText])
            }
          })
        })
    })
  })
})
