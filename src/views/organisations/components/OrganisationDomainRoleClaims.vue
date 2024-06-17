<script setup lang="ts">
import { OrgDomainRoleClaim, OrgDomainRoleClaimStatus } from '@/models/OrgDomainRoleClaim'

defineProps<{ OrgDomainRoleClaims: OrgDomainRoleClaim[] }>()

const statusClasses = {
  [OrgDomainRoleClaimStatus.Active]: 'text-green-600',
  [OrgDomainRoleClaimStatus.Inactive]: 'text-gray-500',
  default: ''
}

const statusTextClass = function (status: OrgDomainRoleClaimStatus) {
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
          <th class="px-4 py-2">AuthorisationDomain</th>
          <th class="px-4 py-2">Role</th>
          <th class="px-4 py-2">Registration ID</th>
          <th class="px-4 py-2">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="orgDomainRoleClaim in OrgDomainRoleClaims"
          :key="orgDomainRoleClaim.RegistrationId"
          class="border-b text-gray-600 text-[12px] text-left"
        >
          <td class="px-4 py-2">{{ orgDomainRoleClaim.AuthorisationDomain }}</td>
          <td class="px-4 py-2">{{ orgDomainRoleClaim.Role }}</td>
          <td class="px-4 py-2">{{ orgDomainRoleClaim.RegistrationId }}</td>
          <td class="px-4 py-2 font-semibold" :class="statusTextClass(orgDomainRoleClaim.Status)">
            {{ orgDomainRoleClaim.Status ?? '—' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
