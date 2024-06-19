import { defineStore } from 'pinia'
import { fetchOrganisations } from '@/services/participantsService'
import { Organisation, OrganisationStatus, StatusCount } from '@/models/Organisation'

export const useParticipantsStore = defineStore('participants', {
  state: () => ({
    organisations: [] as Organisation[],
    uniqueTags: [] as String[],
    loading: false as boolean,
    error: null as string | null
  }),
  getters: {
    getStatusesCount: (state): StatusCount => {
      const statusCount = {
        [OrganisationStatus.Active]: 0,
        [OrganisationStatus.Pending]: 0,
        [OrganisationStatus.Withdrawn]: 0
      }

      state.organisations.forEach((org) => {
        statusCount[org.Status]++
      })

      return {
        labels: [
          OrganisationStatus.Active,
          OrganisationStatus.Pending,
          OrganisationStatus.Withdrawn
        ],
        values: [statusCount.Active, statusCount.Pending, statusCount.Withdrawn]
      }
    },
    getOrganisationsByState: (state) => {
      const states: Record<string, number> = {}

      state.organisations.forEach((org) => {
        const state = org.City?.split(', ')[1]?.toUpperCase()
        if (state) {
          if (!states[state]) {
            states[state] = 0
          }
          states[state]++
        }
      })
      return states
    },
    getAuthorisationServersFeatureSupport: (state) => {
      let total = 0
      const support = {
        Ciba: 0,
        DCR: 0,
        Redirect: 0
      }

      state.organisations.forEach((org) => {
        org.AuthorisationServers.forEach((server) => {
          total++
          if (server.SupportsCiba) support.Ciba++
          if (server.SupportsDCR) support.DCR++
          if (server.SupportsRedirect) support.Redirect++
        })
      })

      return { total, featureSupport: support }
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
