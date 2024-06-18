<script setup lang="ts">
import ApiDiscoveryEndpoints from './ApiDiscoveryEndpoints.vue'

import type { ApiResource } from '@/models/ApiResource'
import { AuthorisationServerCertificationStatus } from '@/models/AuthorisationServerCertification'

defineProps<{ Api: ApiResource }>()

const statusClasses = {
  [AuthorisationServerCertificationStatus.AwaitingCertification]: 'text-yellow-600',
  [AuthorisationServerCertificationStatus.Certified]: 'text-green-600',
  [AuthorisationServerCertificationStatus.Deprecated]: 'text-red-600',
  [AuthorisationServerCertificationStatus.Rejected]: 'text-red-500',
  [AuthorisationServerCertificationStatus.SelfCertified]: 'text-blue-600',
  default: ''
}

const statusTextClass = function (status: AuthorisationServerCertificationStatus) {
  return statusClasses[status] || statusClasses.default
}
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <table class="min-w-full bg-white mb-3">
      <thead>
        <tr
          class="w-full border-b-2 border-gray-200 text-gray-600 text-[14px] font-semibold text-left"
        >
          <th class="px-4 py-2">Status</th>
          <th class="px-4 py-2">Start Date</th>
          <th class="px-4 py-2">Expiration Date</th>
          <th class="px-4 py-2">API Certification URI</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b text-gray-600 text-[14px] text-left">
          <td
            class="px-4 py-2 font-semibold"
            :class="
              statusTextClass(Api.CertificationStatus as AuthorisationServerCertificationStatus)
            "
          >
            {{ Api.CertificationStatus ?? '—' }}
          </td>
          <td class="px-4 py-2">{{ Api.CertificationStartDate }}</td>
          <td class="px-4 py-2">{{ Api.CertificationExpirationDate }}</td>
          <td class="px-4 py-2">
            <a
              v-if="Api.ApiCertificationUri"
              :href="Api.ApiCertificationUri"
              class="text-blue-500 hover:underline"
              target="_blank"
            >
              Certification Link
            </a>
            <span v-else>—</span>
          </td>
        </tr>
      </tbody>
    </table>

    <ApiDiscoveryEndpoints :Endpoints="Api.ApiDiscoveryEndpoints" />
  </div>
</template>
