<script setup lang="ts">
import { OrgDomainClaimStatus } from '@/models/OrgDomainClaim'
import type { OrgDomainClaim } from '@/models/OrgDomainClaim'

defineProps<{
  OrgDomainClaims: OrgDomainClaim[]
}>()

const statusClasses = {
  [OrgDomainClaimStatus.Active]: 'text-green-600',
  [OrgDomainClaimStatus.Inactive]: 'text-gray-500',
  default: ''
}

const statusTextClass = function (status: OrgDomainClaimStatus) {
  return statusClasses[status] || statusClasses.default
}
</script>

<template>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white">
      <thead>
        <tr
          class="w-full border-b-2 border-gray-200 text-gray-600 text-[12px] font-semibold text-left"
        >
          <th class="px-4 py-2">AuthorityName</th>
          <th class="px-4 py-2">AuthorisationDomainName</th>
          <th class="px-4 py-2">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="orgDomainClaim in OrgDomainClaims"
          :key="orgDomainClaim.RegistrationId"
          class="border-b text-gray-600 text-[12px] text-left"
        >
          <td class="px-4 py-2">{{ orgDomainClaim.AuthorityName }}</td>
          <td class="px-4 py-2">{{ orgDomainClaim.AuthorisationDomainName ?? '—' }}</td>
          <td class="px-4 py-2 font-semibold" :class="statusTextClass(orgDomainClaim.Status)">
            {{ orgDomainClaim.Status ?? '—' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
