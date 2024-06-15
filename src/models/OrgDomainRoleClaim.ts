export interface OrgDomainRoleClaim {
  Status: string
  AuthorisationDomain: string
  Role: string
  RegistrationId: string
  Authorisations: string[]
  RoleType: string
  Exclusive: boolean
  Metadata: any[]
}
