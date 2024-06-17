<script setup lang="ts">
import { defineProps } from 'vue'
import { OrganisationStatus } from '@/models/Organisation'
import type { Organisation } from '@/models/Organisation'

import OrganisationDomainClaims from './OrganisationDomainClaims.vue'
import OrganisationDomainRoleClaims from './OrganisationDomainRoleClaims.vue'

interface ICardFields {
  label: String
  organisationProp: string
}

const props = defineProps<{ organisation: Organisation }>()
const router = useRouter()

const popoverBtnClasses =
  'text-source-code text-[12px] bg-raidiamPink bg-opacity-30 hover:bg-raidiamDarkBlue hover:bg-opacity-40 text-black w-full font-semibold'

const statusClasses = {
  [OrganisationStatus.Active]: 'bg-green-600',
  [OrganisationStatus.Pending]: 'bg-yellow-500',
  [OrganisationStatus.Withdrawn]: 'bg-gray-500',
  default: 'bg-gray-300'
}

const statusClass = computed(
  () => statusClasses[props.organisation.Status] || statusClasses.default
)

const cardFields: ICardFields[] = [
  {
    label: 'Registration Id',
    organisationProp: 'RegistrationId'
  },
  {
    label: 'Registration Number',
    organisationProp: 'RegistrationNumber'
  }
]

function openOrganisationPage() {
  router.push({
    name: 'OrganisationById',
    params: {
      id: props.organisation.OrganisationId
    }
  })
}
</script>

<template>
  <div
    class="bg-white rounded-lg shadow-md px-6 py-8 text-source-code flex flex-col justify-start cursor-pointer hover:shadow-lg"
    @click="openOrganisationPage()"
  >
    <div class="flex flex-col">
      <div class="flex justify-between gap-x-3">
        <h2 class="text-[14px] font-medium whitespace-nowrap text-ellipsis overflow-hidden">
          {{ organisation.OrganisationName }}
        </h2>
        <div class="text-white w-fit h-min px-2 py-1 rounded-lg text-[10px]" :class="statusClass">
          {{ organisation.Status ?? 'Unknown' }}
        </div>
      </div>
      <p class="text-[10px] font-bold text-gray-600">
        {{ organisation.City }} - {{ organisation.Country }}
      </p>
    </div>

    <div class="flex flex-col gap-y-2 mt-4">
      <div
        v-for="field in cardFields"
        :key="`${field.label}`"
        class="flex items-center justify-between gap-x-2 border-b-2 pb-2 border-gray-200 text-gray-600 text-[12px]"
      >
        <p>{{ field.label }}</p>
        <p class="font-bold">{{ organisation[field.organisationProp] ?? '—' }}</p>
      </div>

      <Popover btnTitle="Org. Domain Claims" :btnClasses="popoverBtnClasses" menuClasses="!w-fit">
        <OrganisationDomainClaims :OrgDomainClaims="organisation.OrgDomainClaims" />
      </Popover>

      <Popover
        btnTitle="Org. Domain Role Claims"
        :btnClasses="popoverBtnClasses"
        menuClasses="!w-fit"
      >
        <OrganisationDomainRoleClaims :OrgDomainRoleClaims="organisation.OrgDomainRoleClaims" />
      </Popover>

      <div
        v-if="organisation.Tags.length > 0"
        class="flex flex-col gap-y-2 border-t-2 border-gray-200 pt-2 mt-2"
      >
        <p class="text-[14px] font-semibold">Tags</p>
        <div class="flex flex-wrap gap-2 justify-start">
          <div
            v-for="tag in organisation.Tags"
            :key="tag"
            class="text-center text-gray-800 text-[10px] bg-[#dddddd] rounded-lg px-3 py-1"
          >
            {{ tag }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
