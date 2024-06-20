/// <reference types="cypress" />

describe('Organisations Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display loading skeleton cards', () => {
    cy.intercept('GET', '**/participants', {
      delay: 500, // Simulate network delay
      fixture: 'participants.json'
    }).as('getOrganisations')

    cy.visit('/')
    cy.get('.loading-card-skeleton').its('length').should('be.gt', 1)
  })

  it('should display filtered organisations', () => {
    cy.intercept('GET', '**/participants', {
      fixture: 'participants.json'
    }).as('getOrganisations')

    cy.visit('/')
    cy.wait('@getOrganisations')

    cy.get('input').type('Santander{enter}')
    cy.get('.organisation-card').should('have.length.greaterThan', 0)
    cy.get('.organisation-card')
      .filter((index, element) => {
        return Cypress.$(element).text().toLowerCase().includes('santander'.toLowerCase())
      })
      .should('exist')
  })

  it('should display empty state message when no organisations match the filter', () => {
    cy.intercept('GET', '**/participants', {
      fixture: 'participants.json'
    }).as('getOrganisations')

    cy.visit('/')
    cy.wait('@getOrganisations')

    cy.get('input').type('Nonexistent Organisation{enter}')
    cy.contains('No organisation match your search.').should('be.visible')
  })
})

describe('Organisation Card Popovers', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should open the popover and check its content for OrgDomainClaims', () => {
    cy.get('.organisation-card').first().find('.popover-btn:contains("Org. Domain Claims")').click()

    cy.get('.popover-content').should('be.visible')
    cy.get('.popover-content table').within(() => {
      cy.get('thead').contains('th', 'AuthorityName')
      cy.get('thead').contains('th', 'AuthorisationDomainName')
      cy.get('thead').contains('th', 'Status')
      cy.get('tbody').find('tr').should('have.length.greaterThan', 0)
    })
  })

  it('should open the popover and check its content for OrgDomainRoleClaims', () => {
    cy.get('.organisation-card')
      .first()
      .find('.popover-btn:contains("Org. Domain Role Claims")')
      .click()

    cy.get('.popover-content').should('be.visible')
    cy.get('.popover-content table').within(() => {
      cy.get('thead').contains('th', 'AuthorisationDomain')
      cy.get('thead').contains('th', 'Role')
      cy.get('thead').contains('th', 'Registration ID')
      cy.get('thead').contains('th', 'Status')
      cy.get('tbody').find('tr').should('have.length.greaterThan', 0)
    })
  })
})

describe('Tags Filtering', () => {
  before(() => {
    cy.visit('/')
  })

  it('should filter organisations by selected tag', () => {
    cy.intercept('GET', '**/participants', {
      fixture: 'participants.json'
    }).as('getOrganisations')

    cy.visit('/')
    cy.wait('@getOrganisations')

    // Open the tags dropdown
    cy.get('.listbox-btn:contains("Tags:")').click()
    cy.get('.listbox-content').contains('Instituições bancárias').click()
    cy.get('.organisation-card').should('have.length', 2)

    // Open the tags dropdown again
    cy.get('.listbox-btn:contains("Tags:")').click()
    cy.get('.listbox-content').contains('All').click()

    // Check if all organisations are displayed again
    cy.get('.organisation-card').its('length').should('be.gt', 2)
  })
})
