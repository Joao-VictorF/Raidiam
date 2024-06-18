<script setup lang="ts">
import { useNavigationStore } from '@/stores/navigation'
import { useParticipantsStore } from '@/stores/participants'

import ApiResourceInformation from './components/ApiResourceInformation.vue'

import { ApiResource } from '@/models/ApiResource'
import { BreadcrumbsKeys, BreadcrumbsTitles } from '@/models/Breadcrumb'

const route = useRoute()
const navigationStore = useNavigationStore()
const participantsStore = useParticipantsStore()

const ApiResources = ref<ApiResource[]>()

onMounted(() => {
  const organisation = participantsStore.getById(route.params.id as String)
  ApiResources.value =
    organisation?.AuthorisationServers.find(
      (server) => server.AuthorisationServerId === route.params.serverId
    )?.ApiResources ?? []

  navigationStore.addBreadcrumb(
    {
      key: BreadcrumbsKeys.ORGANISATIONS,
      title: BreadcrumbsTitles.ORGANISATIONS,
      route: '/'
    },
    0
  )
  navigationStore.addBreadcrumb(
    {
      key: BreadcrumbsKeys.ORGANISATION_BY_ID,
      title: organisation?.OrganisationName as BreadcrumbsTitles,
      route: `/organisations/${route.params.id}`
    },
    1
  )
  navigationStore.addBreadcrumb(
    {
      key: BreadcrumbsKeys.AUTHORISATION_SERVERS,
      title: BreadcrumbsTitles.AUTHORISATION_SERVERS,
      route: `/organisations/${route.params.id}`
    },
    2
  )
  navigationStore.addBreadcrumb(
    {
      key: 'temp-api-resources' as BreadcrumbsKeys,
      title: BreadcrumbsTitles.API_RESOURCES,
      route: `#api-resources`
    },
    3
  )

  navigationStore.updateBreadcrumb(BreadcrumbsKeys.API_RESOURCES, {
    title: organisation?.OrganisationName as BreadcrumbsTitles,
    hidden: true
  })
})
</script>

<template>
  <div class="flex flex-col gap-y-3">
    <h1 class="text-[42px] text-source-code tracking-tighter font-medium">Api Resources</h1>

    <template v-for="api in ApiResources" :key="api.ApiResourceId">
      <Accordion
        btn-classes="text-source-code text-[14px] bg-blue-500 bg-opacity-40 hover:bg-opacity-50 text-black w-full font-semibold"
      >
        <template #title>
          <div class="flex items-center grow justify-between">
            #{{ api.ApiFamilyType }} - (v{{ api.ApiVersion }})
            <div
              :class="{
                'bg-green-600': api.FamilyComplete,
                'bg-red-400': !api.FamilyComplete
              }"
              class="rounded-lg px-2 py-1 text-[10px] text-white"
            >
              Api Familly {{ api.FamilyComplete ? 'Complete' : 'Incomplete' }}
            </div>
          </div>
        </template>
        <template #data>
          <ApiResourceInformation :Api="api" />
        </template>
      </Accordion>
    </template>
  </div>
</template>