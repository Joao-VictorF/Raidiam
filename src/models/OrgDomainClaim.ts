export enum OrgDomainClaimStatus {
  Active = 'Active',
  Inactive = 'Inactive'
}
export interface OrgDomainClaim {
  AuthorisationDomainName: string
  AuthorityName: string
  RegistrationId: string
  Status: OrgDomainClaimStatus
}
