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
const popoverBtnClasses =
  'text-source-code text-[12px] bg-raidiamPink bg-opacity-30 hover:bg-raidiamDarkPink hover:bg-opacity-40 text-black w-full font-semibold'

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
  },
  {
    label: 'Registration Number',
    organisationProp: 'RegistrationNumber'
  }
]
</script>

<template>
  <div
    class="bg-white rounded-lg shadow-md px-6 py-8 text-source-code flex flex-col justify-between cursor-pointer hover:shadow-lg"
  >
    <div class="flex flex-col">
      <div class="flex justify-between gap-x-3">
        <h2 class="text-[14px] font-medium">
          {{ organisation.OrganisationName }}
        </h2>
        <div class="text-white w-fit h-min px-3 py-1 rounded-lg text-[12px]" :class="statusClass">
          {{ organisation.Status ?? 'Unknown' }}
        </div>
      </div>
      <p class="text-[11px] text-gray-600">{{ organisation.City }} - {{ organisation.Country }}</p>
    </div>

    <div class="relative flex flex-col gap-y-2 mt-4">
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
    </div>
  </div>
</template>
