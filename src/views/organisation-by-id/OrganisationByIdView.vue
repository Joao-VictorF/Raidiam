<script setup lang="ts">
import { onMounted } from 'vue'
import { useNavigationStore } from '@/stores/navigation'
import { useParticipantsStore } from '@/stores/participants'

import { Organisation } from '@/models/Organisation'
import { BreadcrumbsKeys, BreadcrumbsTitles } from '@/models/Breadcrumb'

const route = useRoute()
const navigationStore = useNavigationStore()
const participantsStore = useParticipantsStore()

const organisation = ref<Organisation | undefined>()

onMounted(() => {
  organisation.value = participantsStore.getById(route.params.id as String)
  navigationStore.updateBreadcrumb(BreadcrumbsKeys.ORGANISATION_BY_ID, {
    title: organisation.value?.OrganisationName as BreadcrumbsTitles
  })
})
</script>

<template>
  <div class="flex flex-col gap-y-3">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {{ organisation }}
    </div>
  </div>
</template>
