// src/stores/participants.ts

import { defineStore } from 'pinia'
import { fetchOrganisations } from '@/services/participantsService'
import type { Organisation } from '@/models/Organisation'

export const useParticipantsStore = defineStore('participants', {
  state: () => ({
    organisations: [] as Organisation[],
    filteredOrganisations: [] as Organisation[],
    loading: false as boolean,
    error: null as string | null
  }),
  actions: {
    async loadOrganisations() {
      this.loading = true
      this.error = null
      try {
        const organisations = await fetchOrganisations()
        this.organisations = organisations
        this.filteredOrganisations = organisations
      } catch (error) {
        this.error = 'Failed to fetch organisations'
      } finally {
        this.loading = false
      }
    },
    filterOrganisations(criteria: { [key: string]: any }) {
      this.filteredOrganisations = this.organisations.filter((org) => {
        return org.OrganisationName.includes(criteria.name)
      })
    }
  }
})
