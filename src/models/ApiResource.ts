import type { ApiDiscoveryEndpoint } from './ApiDiscoveryEndpoint'

export interface ApiResource {
  ApiResourceId: string
  ApiVersion: string
  FamilyComplete: boolean
  ApiCertificationUri: string | null
  CertificationStatus: string
  CertificationStartDate: string | null
  CertificationExpirationDate: string | null
  ApiFamilyType: string
  ApiDiscoveryEndpoints: ApiDiscoveryEndpoint[]
}
