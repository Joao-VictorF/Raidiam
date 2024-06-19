export enum BreadcrumbsKeys {
  DASHBOARD = 'dashboard',
  ORGANISATIONS = 'organisations',
  ORGANISATION_BY_ID = 'organisation-by-id',
  AUTHORISATION_SERVERS = 'authorisation-servers',
  API_RESOURCES = 'api-resources',
  API_FAMILY_TYPES = 'api-family-types',
  DISCOVERY_ENDPOINTS = 'discovery-endpoints'
}

export enum BreadcrumbsTitles {
  DASHBOARD = 'Dashboard',
  ORGANISATIONS = 'Organisations',
  AUTHORISATION_SERVERS = 'Authorisation Servers',
  API_RESOURCES = 'API Resources',
  API_FAMILY_TYPES = 'API Family Types',
  DISCOVERY_ENDPOINTS = 'Discovery Endpoints'
}

export interface Breadcrumb {
  key: BreadcrumbsKeys
  title: BreadcrumbsTitles
  route: string
  hidden?: boolean
}
