import type { ApiResource } from './ApiResource'
import type { AuthorisationServerCertification } from './AuthorisationServerCertification'

export interface AuthorisationServer {
  AuthorisationServerId: string
  AutoRegistrationNotificationWebhook: string | null
  AutoRegistrationSupported: boolean
  CreatedAt: number
  CustomerFriendlyDescription: string
  CustomerFriendlyLogoUri: string
  CustomerFriendlyName: string
  DeprecatedDate: string | null
  DeveloperPortalUri: string
  FederationEndpoint: string | null
  FederationId: string | null
  Issuer: string
  NotificationWebhook: string | null
  NotificationWebhookAddedDate: string | null
  NotificationWebhookStatus: string | null
  OpenIDDiscoveryDocument: string
  OrganisationId: string
  ParentAuthorisationServerId: string | null
  PayloadSigningCertLocationUri: string
  RetirementDate: string | null
  SupersededByAuthorisationServerId: string | null
  SupportsCiba: boolean
  SupportsDCR: boolean
  SupportsRedirect: boolean
  TermsOfServiceUri: string
  ApiResources: ApiResource[]
  AuthorisationServerCertifications: AuthorisationServerCertification[]
  Flags: {
    [key: string]: string[]
  }
}
