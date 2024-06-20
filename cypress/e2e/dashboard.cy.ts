/// <reference types="cypress" />
import dashboard from '../fixtures/dashboard.json'

let stores

const SELECTORS = {
  loadingSkeleton: '.loading-card-skeleton',
  headerTitle: 'h1',
  pieChart: 'canvas#doughnut-chart',
  barChart: 'canvas#bar-chart',
  dashboardCard: (id) => `#${id}`
}

describe('Dashboard Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/participants', {
      fixture: 'participants.json'
    }).as('getOrganisations')

    cy.visit('/dashboard').then((win) => {
      stores = win.stores
      stores.participantsStore.dashboardData = dashboard
    })
  })

  it('should render loading skeleton cards', () => {
    cy.intercept('GET', '**/participants', {
      delay: 500, // Simulate network delay
      fixture: 'participants.json'
    }).as('getOrganisations')

    cy.visit('/dashboard')
    cy.get(SELECTORS.loadingSkeleton).its('length').should('be.gt', 1)
  })

  it('should display the dashboard sections title', () => {
    cy.get(SELECTORS.headerTitle).contains('Organisations')
    cy.get(SELECTORS.headerTitle).contains('Authorisation Servers')
    cy.get(SELECTORS.headerTitle).contains('API Resources')
  })

  it('should render organisations status pie chart', () => {
    cy.get(SELECTORS.dashboardCard('organisations-status')).within(() => {
      cy.get(SELECTORS.pieChart).should('exist')
    })
  })

  it('should render organisations by state bar chart', () => {
    cy.get(SELECTORS.dashboardCard('organisations-by-state')).within(() => {
      cy.get(SELECTORS.barChart).should('exist')
    })
  })

  it('should render authorisation server feature support bar chart', () => {
    cy.get(SELECTORS.dashboardCard('authorisation-servers-feature-support')).within(() => {
      cy.get(SELECTORS.barChart).should('exist')
    })
  })

  it('should render authorisation server certifications bar chart', () => {
    cy.get(SELECTORS.dashboardCard('authorisation-servers-certifications')).within(() => {
      cy.get(SELECTORS.barChart).should('exist')
    })
  })

  it('should render API family completion status pie chart', () => {
    cy.get(SELECTORS.dashboardCard('api-resources-family-completion')).within(() => {
      cy.get(SELECTORS.pieChart).should('exist')
    })
  })

  it('should render API resources certification status pie chart', () => {
    cy.get(SELECTORS.dashboardCard('api-resources-certification-status')).within(() => {
      cy.get(SELECTORS.pieChart).should('exist')
    })
  })
})
