import type { OrgDomainClaim } from './OrgDomainClaim'
import type { OrgDomainRoleClaim } from './OrgDomainRoleClaim'
import type { AuthorisationServer } from './AuthorisationServer'

export enum OrganisationStatus {
  Active = 'Active',
  Pending = 'Pending',
  Withdrawn = 'Withdrawn'
}

export interface StatusCount {
  labels: OrganisationStatus[]
  values: number[]
}

export interface Organisation extends Record<string, any> {
  OrganisationId: string
  Status: OrganisationStatus
  OrganisationName: string
  CreatedOn: string
  LegalEntityName: string
  CountryOfRegistration: string
  CompanyRegister: string
  Tags: string[]
  Flags: {
    generated: string[]
  }
  Size: string | null
  RegistrationNumber: string
  RegistrationId: string
  RegisteredName: string
  AddressLine1: string
  AddressLine2: string
  City: string
  Postcode: string
  Country: string
  ParentOrganisationReference: string
  AuthorisationServers: AuthorisationServer[]
  OrgDomainClaims: OrgDomainClaim[]
  OrgDomainRoleClaims: OrgDomainRoleClaim[]
}
