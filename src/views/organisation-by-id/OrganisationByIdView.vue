<script setup lang="ts">
import AuthorisationServerCard from './components/AuthorisationServerCard.vue'

import { useNavigationStore } from '@/stores/navigation'
import { useParticipantsStore } from '@/stores/participants'

import { Organisation } from '@/models/Organisation'
import { BreadcrumbsKeys, BreadcrumbsTitles } from '@/models/Breadcrumb'

const route = useRoute()
const navigationStore = useNavigationStore()
const participantsStore = useParticipantsStore()

const organisation = ref<Organisation | undefined>()
const searchTerm = ref('')

const filteredAuthorisationServers = computed(() => {
  if (!searchTerm.value) {
    return organisation.value?.AuthorisationServers ?? []
  }
  return (organisation.value?.AuthorisationServers ?? []).filter((server) =>
    server.CustomerFriendlyName.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

onMounted(() => {
  navigationStore.addBreadcrumb(
    {
      key: BreadcrumbsKeys.ORGANISATIONS,
      title: BreadcrumbsTitles.ORGANISATIONS,
      route: '/'
    },
    0
  )

  organisation.value = participantsStore.getById(route.params.id as String)
  navigationStore.updateBreadcrumb(BreadcrumbsKeys.ORGANISATION_BY_ID, {
    title: organisation.value?.OrganisationName as BreadcrumbsTitles
  })

  navigationStore.addBreadcrumb({
    key: BreadcrumbsKeys.AUTHORISATION_SERVERS,
    title: BreadcrumbsTitles.AUTHORISATION_SERVERS,
    route: '#authorisation-servers'
  })

  navigationStore.removeUntil(BreadcrumbsKeys.AUTHORISATION_SERVERS)
})

onBeforeUpdate(() => {
  if (organisation.value) {
    navigationStore.updateBreadcrumb(BreadcrumbsKeys.ORGANISATION_BY_ID, {
      title: organisation.value?.OrganisationName as BreadcrumbsTitles
    })
  }
})
</script>

<template>
  <div class="flex flex-col gap-y-3">
    <h1 class="text-[42px] text-source-code tracking-tighter font-medium">Authorisation Servers</h1>
    <input
      v-model="searchTerm"
      type="text"
      placeholder="Search Authorisation Servers"
      class="mb-4 px-4 py-2 border rounded-md text-[14px] focus:outline-none"
    />

    <div id="authorisation-servers" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <AuthorisationServerCard
        v-for="server in filteredAuthorisationServers"
        :key="server.AuthorisationServerId"
        :server="server"
      />
    </div>
  </div>
</template>
