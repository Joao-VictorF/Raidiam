interface CountData {
  labels: string[]
  values: number[]
}

interface FeatureSupport {
  total: number
  featureSupport: Record<string, number>
}

export interface DashboardData {
  statusCount: CountData
  organisationsByState: Record<string, number>
  authorisationServersFeatureSupport: FeatureSupport
  certifications: Record<string, number>
  familyCompleteCount: CountData
  apiResourceCertStatus: CountData
}
