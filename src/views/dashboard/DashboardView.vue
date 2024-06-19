<script setup lang="ts">
import PieChart from './components/PieChart.vue'
import BarChart from './components/BarChart.vue'
import { useParticipantsStore } from '@/stores/participants'

import { Organisation, StatusCount } from '@/models/Organisation'

const participantsStore = useParticipantsStore()

const loading = computed<boolean>(() => participantsStore.loading)
const organisations = computed<Organisation[]>(() => participantsStore.organisations)

const statusesCount = computed<StatusCount>(() => participantsStore.getStatusesCount)
const organisationsByState = computed<Record<string, number>>(
  () => participantsStore.getOrganisationsByState
)
const authorisationServersFeatureSupportCount = computed<{
  total: number
  featureSupport: Record<string, number>
}>(() => participantsStore.getAuthorisationServersFeatureSupport)

onMounted(() => {
  if (!organisations.value || organisations.value.length === 0) {
    participantsStore.loadOrganisations()
  }
})
</script>

<template>
  <div class="flex flex-col gap-y-3">
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      <LoadingCardSkeleton v-for="i in 12" :key="`loading-card-skeleton-${i}`" />
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
      <div class="col-span-1 bg-gray-200 rounded-lg shadow-md p-6">
        <h1 class="text-[16px] font-semibold mb-4">Organisations Status</h1>
        <PieChart
          :data-values="statusesCount.values"
          :data-labels="statusesCount.labels"
          :data-colors="['#42b983', '#ffcc00', '#ffa07a']"
        />
      </div>

      <div class="col-span-1 lg:col-span-2 bg-gray-200 rounded-lg shadow-md p-6">
        <h1 class="text-[16px] font-semibold mb-4">Organisations By State</h1>
        <BarChart
          :data-values="Object.values(organisationsByState)"
          :data-labels="Object.keys(organisationsByState)"
        />
      </div>

      <div class="col-span-1 bg-gray-200 rounded-lg shadow-md p-6">
        <h1 class="text-[16px] font-semibold mb-2">
          Support for Key Features in Authorisation Servers
        </h1>
        <p class="text-[14px] mb-4">
          Total Auth. Servers: {{ authorisationServersFeatureSupportCount.total }}
        </p>
        <BarChart
          :data-values="Object.values(authorisationServersFeatureSupportCount.featureSupport)"
          :data-labels="Object.keys(authorisationServersFeatureSupportCount.featureSupport)"
          :data-colors="['#1abc9c', '#e67e22', '#2980b9']"
        />
      </div>
    </div>
  </div>
</template>
