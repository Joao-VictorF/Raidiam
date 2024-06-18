<script setup lang="ts">
import { useNavigationStore } from '@/stores/navigation'
import { useParticipantsStore } from '@/stores/participants'

import Filters from './components/Filters.vue'
import OrganisationCard from './components/OrganisationCard.vue'

import { Organisation } from '@/models/Organisation'
import { BreadcrumbsKeys } from '@/models/Breadcrumb'

const navigationStore = useNavigationStore()
const participantsStore = useParticipantsStore()

const loading = computed<boolean>(() => participantsStore.loading)
const organisations = computed<Organisation[]>(() => participantsStore.organisations)
const filteredOrganisations = ref<Organisation[]>([])

const updateFilteredOrganisations = (filtered: Organisation[]) => {
  filteredOrganisations.value = filtered
}

watchOnce(organisations, (result) => {
  filteredOrganisations.value = result
})
onMounted(() => {
  participantsStore.loadOrganisations()
  navigationStore.removeUntil(BreadcrumbsKeys.ORGANISATIONS)
})
</script>

<template>
  <div class="flex flex-col gap-y-3">
    <Filters :organisations="organisations" @filtered="updateFilteredOrganisations" />
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <template v-if="loading">
        <LoadingCardSkeleton v-for="i in 12" :key="`loading-card-skeleton-${i}`" />
      </template>

      <template v-else>
        <OrganisationCard
          v-for="organisation in filteredOrganisations"
          :key="organisation.OrganisationId"
          :organisation="organisation"
        />
      </template>
    </div>
  </div>
</template>
