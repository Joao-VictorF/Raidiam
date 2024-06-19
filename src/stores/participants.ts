import { defineStore } from 'pinia'
import { fetchOrganisations } from '@/services/participantsService'
import { Organisation, OrganisationStatus } from '@/models/Organisation'
import { AuthorisationServerCertification } from '@/models/AuthorisationServerCertification'
import { AuthorisationServer } from '@/models/AuthorisationServer'

export const useParticipantsStore = defineStore('participants', {
  state: () => ({
    organisations: [] as Organisation[],
    uniqueTags: [] as String[],
    loading: false as boolean,
    error: null as string | null
  }),
  getters: {
    getDashboardData: (state) => {
      const statusCount = {
        [OrganisationStatus.Active]: 0,
        [OrganisationStatus.Pending]: 0,
        [OrganisationStatus.Withdrawn]: 0
      }

      const states: Record<string, number> = {}

      let totalAuthServers = 0
      const featureSupport = {
        Ciba: 0,
        DCR: 0,
        Redirect: 0,
        AutoRegistration: 0
      }

      const certifications: Record<string, number> = {}
      const apiResourceCertStatus: Record<string, number> = {}
      const familyCompleteCount = {
        Complete: 0,
        Incomplete: 0
      }

      state.organisations.forEach((org: Organisation) => {
        // Status count
        statusCount[org.Status]++

        // State count
        const state = org.City?.split(', ')[1]?.toUpperCase()
        if (state) {
          if (!states[state]) {
            states[state] = 0
          }
          states[state]++
        }

        // Authorisation server data
        org.AuthorisationServers.forEach((server: AuthorisationServer) => {
          totalAuthServers++

          if (server.SupportsCiba) featureSupport.Ciba++
          if (server.SupportsDCR) featureSupport.DCR++
          if (server.SupportsRedirect) featureSupport.Redirect++
          if (server.AutoRegistrationSupported) featureSupport.AutoRegistration++

          // Certification data
          server.AuthorisationServerCertifications.forEach(
            (cert: AuthorisationServerCertification) => {
              const key = `${cert.ProfileType}:${cert.Status}`
              if (!certifications[key]) {
                certifications[key] = 0
              }
              certifications[key]++
            }
          )

          // Certification status count
          server.ApiResources.forEach((resource) => {
            const apiStatus = resource.CertificationStatus

            // API Resource Certification status count
            if (!apiResourceCertStatus[apiStatus]) {
              apiResourceCertStatus[apiStatus] = 0
            }
            apiResourceCertStatus[apiStatus]++

            // Family complete count
            if (resource.FamilyComplete) {
              familyCompleteCount.Complete++
            } else {
              familyCompleteCount.Incomplete++
            }
          })
        })
      })

      return {
        statusCount: {
          labels: [
            OrganisationStatus.Active,
            OrganisationStatus.Pending,
            OrganisationStatus.Withdrawn
          ],
          values: [statusCount.Active, statusCount.Pending, statusCount.Withdrawn]
        },
        organisationsByState: states,
        authorisationServersFeatureSupport: {
          total: totalAuthServers,
          featureSupport: featureSupport
        },
        certifications,
        familyCompleteCount: {
          labels: ['Complete', 'Incomplete'],
          values: [familyCompleteCount.Complete, familyCompleteCount.Incomplete]
        },
        apiResourceCertStatus: {
          labels: Object.keys(apiResourceCertStatus).filter((status) => status !== 'null'),
          values: Object.values(apiResourceCertStatus).filter(
            (_, index) => Object.keys(apiResourceCertStatus)[index] !== 'null'
          )
        }
      }
    }
  },

  actions: {
    async loadOrganisations() {
      this.loading = true
      this.error = null
      try {
        const organisations = await fetchOrganisations()
        this.setUniqueTags(organisations)
        this.organisations = organisations
      } catch (error) {
        this.error = 'Failed to fetch organisations'
      } finally {
        this.loading = false
      }
    },
    setUniqueTags(organisations: Organisation[]) {
      const tags = new Set<string>()
      organisations.forEach((org) => {
        org.Tags.forEach((tag) => tags.add(tag))
      })

      this.uniqueTags = Array.from(tags)
    },
    getById(id: String) {
      return this.organisations.find((organisation) => organisation.OrganisationId === id)
    }
  },
  persist: true
})
