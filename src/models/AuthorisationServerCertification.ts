export enum AuthorisationServerCertificationStatus {
  AwaitingCertification = 'Awaiting Certification',
  Certified = 'Certified',
  Deprecated = 'Deprecated',
  Rejected = 'Rejected',
  SelfCertified = 'Self-Certified'
}

export interface AuthorisationServerCertification {
  CertificationStartDate: string
  CertificationExpirationDate: string
  CertificationId: string
  AuthorisationServerId: string
  Status: AuthorisationServerCertificationStatus
  ProfileVariant: string
  ProfileType: string
  ProfileVersion: number
  CertificationURI: string
}
