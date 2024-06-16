export enum OrgDomainRoleClaimStatus {
  Active = 'Active',
  Inactive = 'Inactive'
}
export interface OrgDomainRoleClaim {
  Status: OrgDomainRoleClaimStatus
  AuthorisationDomain: string
  Role: string
  RegistrationId: string
  Authorisations: string[]
  RoleType: string
  Exclusive: boolean
  Metadata: any[]
}
