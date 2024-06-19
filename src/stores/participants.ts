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
