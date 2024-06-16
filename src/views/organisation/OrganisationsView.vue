<script setup lang="ts">
import { onMounted } from 'vue'
import { useParticipantsStore } from '@/stores/participants'

import OrganisationCard from './components/OrganisationCard.vue'

import { Organisation } from '@/models/Organisation'

const participantsStore = useParticipantsStore()

const loading = computed<boolean>(() => participantsStore.loading)
const organisations = computed<Organisation[]>(() => participantsStore.organisations)

onMounted(() => participantsStore.loadOrganisations())
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <template v-if="loading">
      <LoadingCardSkeleton v-for="i in 12" :key="`loading-card-skeleton-${i}`" />
    </template>

    <template v-else>
      <OrganisationCard
        v-for="organisation in organisations"
        :key="organisation.OrganisationId"
        :organisation="organisation"
      />
    </template>
  </div>
</template>
