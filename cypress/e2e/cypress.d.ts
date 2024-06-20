/// <reference types="cypress" />

declare namespace Cypress {
  interface AUTWindow {
    stores: {
      participantsStore: {
        organisations: any[]
        [key: string]: any
      }
      [key: string]: any
    }
  }
}
