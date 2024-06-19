<script setup lang="ts">
import PieChart from './components/PieChart.vue'
import BarChart from './components/BarChart.vue'
import { useParticipantsStore } from '@/stores/participants'

import { Organisation } from '@/models/Organisation'

const participantsStore = useParticipantsStore()

const loading = computed<boolean>(() => participantsStore.loading)
const organisations = computed<Organisation[]>(() => participantsStore.organisations)

const dashboardData = computed(() => participantsStore.getDashboardData)
const totalCertifications = computed(() =>
  Object.values(dashboardData.value.certifications).reduce((a, b) => a + b, 0)
)

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
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
      <div class="col-span-1 bg-gray-200 rounded-lg shadow-md p-6">
        <h1 class="text-[16px] font-semibold mb-4">Organisations Status</h1>
        <PieChart
          :data-values="dashboardData.statusCount.values"
          :data-labels="dashboardData.statusCount.labels"
          :data-colors="['#42b983', '#ffcc00', '#ffa07a']"
        />
      </div>

      <div class="col-span-1 lg:col-span-2 bg-gray-200 rounded-lg shadow-md p-6">
        <h1 class="text-[16px] font-semibold mb-4">Organisations By State</h1>
        <BarChart
          :data-values="Object.values(dashboardData.organisationsByState)"
          :data-labels="Object.keys(dashboardData.organisationsByState)"
        />
      </div>

      <div class="col-span-1 bg-gray-200 rounded-lg shadow-md p-6">
        <h1 class="text-[16px] font-semibold mb-2">Features Support in Authorisation Servers</h1>
        <p class="text-[14px] mb-4">
          Total Auth. Servers: {{ dashboardData.authorisationServersFeatureSupport.total }}
        </p>
        <BarChart
          :data-values="
            Object.values(dashboardData.authorisationServersFeatureSupport.featureSupport)
          "
          :data-labels="
            Object.keys(dashboardData.authorisationServersFeatureSupport.featureSupport)
          "
          :data-colors="['#1abc9c', '#e67e22', '#2980b9']"
        />
      </div>

      <div class="col-span-1 bg-gray-200 rounded-lg shadow-md p-6">
        <h1 class="text-[16px] font-semibold mb-2">Authorisation Server Certifications</h1>
        <p class="text-[14px] mb-4">Total Auth. Servers: {{ totalCertifications }}</p>
        <BarChart
          :data-values="Object.values(dashboardData.certifications)"
          :data-labels="Object.keys(dashboardData.certifications)"
          :data-colors="['#42b983', '#ffcc00', '#ffa07a', '#c3a1e6', '#f78da7', '#8ecae6']"
        />
      </div>

      <div class="bg-gray-200 rounded-lg shadow-md p-6">
        <h1 class="text-[16px] font-semibold mb-4">API Family Completion Status</h1>
        <PieChart
          :data-values="dashboardData.familyCompleteCount.values"
          :data-labels="dashboardData.familyCompleteCount.labels"
          :data-colors="['#42b983', '#ffa07a']"
        />
      </div>

      <div class="bg-gray-200 rounded-lg shadow-md p-6">
        <h1 class="text-[16px] font-semibold mb-4">API Resources Certification Status</h1>
        <PieChart
          :data-values="dashboardData.apiResourceCertStatus.values"
          :data-labels="dashboardData.apiResourceCertStatus.labels"
          :data-colors="['#8ecae6', '#ffa07a', '#f78da7', '#66d154', '#ffcc00']"
        />
      </div>
    </div>
  </div>
</template>
