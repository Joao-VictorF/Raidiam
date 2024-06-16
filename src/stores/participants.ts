// src/stores/participants.ts

import { defineStore } from 'pinia'
import { fetchOrganisations } from '@/services/participantsService'
import type { Organisation } from '@/models/Organisation'

export const useParticipantsStore = defineStore('participants', {
  state: () => ({
    organisations: [] as Organisation[],
    uniqueTags: [] as String[],
    loading: false as boolean,
    error: null as string | null
  }),
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
      console.log(this.uniqueTags)
    }
  }
})
