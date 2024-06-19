<script setup lang="ts">
import PieChart from './components/PieChart.vue'
import BarChart from './components/BarChart.vue'
import DashboardCard from './components/DashboardCard.vue'

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
      <h1 class="col-span-3 text-3xl font-semibold">Organisations</h1>
      <DashboardCard title="Organisations Status">
        <PieChart
          :data-values="dashboardData.statusCount.values"
          :data-labels="dashboardData.statusCount.labels"
          :data-colors="['#42b983', '#ffcc00', '#ffa07a']"
        />
      </DashboardCard>

      <DashboardCard title="Organisations By State" columns-classes="col-span-1 lg:col-span-2">
        <BarChart
          :data-values="Object.values(dashboardData.organisationsByState)"
          :data-labels="Object.keys(dashboardData.organisationsByState)"
        />
      </DashboardCard>

      <h1 class="col-span-3 text-3xl font-semibold">Authorisation Servers</h1>
      <DashboardCard
        title="Features Support in Authorisation Servers"
        :subtitle="`Total Auth. Servers: ${dashboardData.authorisationServersFeatureSupport.total}`"
      >
        <BarChart
          :data-values="
            Object.values(dashboardData.authorisationServersFeatureSupport.featureSupport)
          "
          :data-labels="
            Object.keys(dashboardData.authorisationServersFeatureSupport.featureSupport)
          "
          :data-colors="['#1abc9c', '#e67e22', '#2980b9', '#42b983']"
        />
      </DashboardCard>

      <DashboardCard
        title="Authorisation Server Certifications"
        :subtitle="`Total Auth. Servers Certifications: ${totalCertifications}`"
      >
        <BarChart
          :data-values="Object.values(dashboardData.certifications)"
          :data-labels="Object.keys(dashboardData.certifications)"
          :data-colors="['#42b983', '#ffcc00', '#ffa07a', '#c3a1e6', '#f78da7', '#8ecae6']"
        />
      </DashboardCard>

      <h1 class="col-span-3 text-3xl font-semibold">API Resources</h1>
      <DashboardCard title="API Family Completion Status">
        <PieChart
          :data-values="dashboardData.familyCompleteCount.values"
          :data-labels="dashboardData.familyCompleteCount.labels"
          :data-colors="['#42b983', '#ffa07a']"
        />
      </DashboardCard>

      <DashboardCard title="API Resources Certification Status">
        <PieChart
          :data-values="dashboardData.apiResourceCertStatus.values"
          :data-labels="dashboardData.apiResourceCertStatus.labels"
          :data-colors="['#8ecae6', '#ffa07a', '#f78da7', '#42b983', '#ffcc00']"
        />
      </DashboardCard>
    </div>
  </div>
</template>
