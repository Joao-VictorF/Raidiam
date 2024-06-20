/// <reference types="cypress" />

const SELECTORS = {
  organisationCard: '.organisation-card',
  popoverBtn: '.popover-btn',
  popoverContent: '.popover-content',
  searchInput: 'input[placeholder="Search by Name, Registration ID or Registration Number"]',
  listboxBtn: '.listbox-btn',
  listboxContent: '.listbox-content',
  loadingSkeleton: '.loading-card-skeleton',
  noResultsMessage: 'No organisation match your search.'
}

describe('Organisations Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/participants', {
      fixture: 'participants.json'
    }).as('getOrganisations')
    cy.visit('/')
  })

  it('should display loading skeleton cards', () => {
    cy.intercept('GET', '**/participants', {
      delay: 500, // Simulate network delay
      fixture: 'participants.json'
    }).as('getOrganisations')

    cy.visit('/')
    cy.get(SELECTORS.loadingSkeleton).its('length').should('be.gt', 1)
  })

  it('should display filtered organisations', () => {
    cy.wait('@getOrganisations')

    cy.get(SELECTORS.searchInput).type('Santander{enter}')
    cy.get(SELECTORS.organisationCard).should('have.length.greaterThan', 0)
    cy.get(SELECTORS.organisationCard)
      .filter((index, element) => {
        return Cypress.$(element).text().toLowerCase().includes('santander'.toLowerCase())
      })
      .should('exist')
  })

  it('should display empty state message when no organisations match the filter', () => {
    cy.wait('@getOrganisations')

    cy.get(SELECTORS.searchInput).type('Nonexistent Organisation{enter}')
    cy.contains(SELECTORS.noResultsMessage).should('be.visible')
  })
})

describe('Organisation Card Popovers', () => {
  beforeEach(() => cy.visit('/'))

  it('should open the popover and check its content for OrgDomainClaims', () => {
    cy.get(SELECTORS.organisationCard)
      .first()
      .find(`${SELECTORS.popoverBtn}:contains("Org. Domain Claims")`)
      .click()

    cy.get(SELECTORS.popoverContent).should('be.visible')
    cy.get(`${SELECTORS.popoverContent} table`).within(() => {
      cy.get('thead').contains('th', 'AuthorityName')
      cy.get('thead').contains('th', 'AuthorisationDomainName')
      cy.get('thead').contains('th', 'Status')
      cy.get('tbody').find('tr').should('have.length.greaterThan', 0)
    })
  })

  it('should open the popover and check its content for OrgDomainRoleClaims', () => {
    cy.get(SELECTORS.organisationCard)
      .first()
      .find(`${SELECTORS.popoverBtn}:contains("Org. Domain Role Claims")`)
      .click()

    cy.get(SELECTORS.popoverContent).should('be.visible')
    cy.get(`${SELECTORS.popoverContent} table`).within(() => {
      cy.get('thead').contains('th', 'AuthorisationDomain')
      cy.get('thead').contains('th', 'Role')
      cy.get('thead').contains('th', 'Registration ID')
      cy.get('thead').contains('th', 'Status')
      cy.get('tbody').find('tr').should('have.length.greaterThan', 0)
    })
  })
})

describe('Tags Filtering', () => {
  beforeEach(() => cy.visit('/'))

  it('should filter organisations by selected tag', () => {
    // Open the tags dropdown
    cy.get(`${SELECTORS.listboxBtn}:contains("Tags:")`).click()
    cy.get(SELECTORS.listboxContent).contains('Instituições bancárias').click()
    cy.get(SELECTORS.organisationCard).should('have.length', 2)

    // Open the tags dropdown again
    cy.get(`${SELECTORS.listboxBtn}:contains("Tags:")`).click()
    cy.get(SELECTORS.listboxContent).contains('All').click()

    // Check if all organisations are displayed again
    cy.get(SELECTORS.organisationCard).its('length').should('be.gt', 2)
  })
})
