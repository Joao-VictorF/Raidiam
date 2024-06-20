# Technical Assignment Documentation

## Project Overview

This project involves developing a Vue.js application that displays various organizational data through interactive charts. The application uses `vue3-charts` for visualizations and `pinia` for state management.

## Prerequisites

Ensure you have the following installed on your system:

- Node.js (version 18.x or higher)
- Yarn (version 1.x or higher)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Joao-VictorF/Raidiam
   cd Raidiam
   ```
2. Install the dependencies: `yarn`

## Development

To start the development server, run: `yarn dev`

This command will start the application on `localhost:8080` and automatically open it.

## Running Tests

The project uses Cypress for end-to-end testing. The test files are located in the `cypress/` directory.

To run the tests in development mode, use the following command:
`yarn test:e2e:dev`

This will open the Cypress test runner, allowing you to run individual tests or all tests at once.

## Component Structure

The main components used in the project are as follows:

1. `PieChart.vue` - Renders pie charts based on provided data.
2. `BarChart.vue` - Renders bar charts based on provided data.
3. `DashboardCard.vue` - Wrapper component for individual dashboard sections.
4. `OrganisationCard.vue` - Displays individual organization details.
5. `ApiResourceInformation.vue -` Shows detailed information about API resources.
6. `AuthorisationServerCard.vue` - Displays individual authorization server details.
7. `Filters.vue` - Handles filtering of organizations based on various criteria.

## Cypress Tests

The Cypress tests are organized to cover various aspects of the application, such as loading states, filtering functionality, and popover interactions. Below is a brief overview of the Cypress test structure:

1. Organisations Page Tests (`organisations.cy.ts`):
   - Verify loading skeleton cards.
   - Ensure organizations are displayed and filtered correctly.
   - Test popover content for domain claims and role claims.
   - Check tag filtering functionality.
     <br>
2. Authorisation Servers Page Tests (`authorisation-servers.cy.ts`):
   - Validate the display of organization details.
   - Check rendering of authorization server cards.
   - Test popover content for authorization server certifications.
   - Verify search functionality for authorization servers.
     <br>
3. API Resources Page Tests (`api-resources.cy.ts`):
   - Ensure API resources are displayed correctly.
   - Verify the search functionality for API resources.
   - Check accordion content for API resource information.
   - Validate links and copy functionality in API discovery endpoints.
     <br>
4. Dashboard Page Tests (`dashboard.cy.ts`):

   - Validate the display of loading skeletons.
   - Check rendering of charts and data correctness.
   - Verify interactions with chart elements.

   # Thanks! =)
