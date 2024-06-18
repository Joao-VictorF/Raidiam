<script setup lang="ts">
import {
  AuthorisationServerCertification,
  AuthorisationServerCertificationStatus
} from '@/models/AuthorisationServerCertification'

defineProps<{
  Certifications: AuthorisationServerCertification[]
}>()

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
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white">
      <thead>
        <tr
          class="w-full border-b-2 border-gray-200 text-gray-600 text-[12px] font-semibold text-left"
        >
          <th class="px-4 py-2">Status</th>
          <th class="px-4 py-2">Profile Variant</th>
          <th class="px-4 py-2">Profile Type</th>
          <th class="px-4 py-2">Profile Version</th>
          <th class="px-4 py-2">Start Date</th>
          <th class="px-4 py-2">Expiration Date</th>
          <th class="px-4 py-2">Certification URI</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="certification in Certifications"
          :key="certification.CertificationId"
          class="border-b text-gray-600 text-[12px] text-left"
        >
          <td class="px-4 py-2 font-semibold" :class="statusTextClass(certification.Status)">
            {{ certification.Status ?? '—' }}
          </td>
          <td class="px-4 py-2">{{ certification.ProfileVariant }}</td>
          <td class="px-4 py-2">{{ certification.ProfileType }}</td>
          <td class="px-4 py-2">{{ certification.ProfileVersion }}</td>
          <td class="px-4 py-2">{{ certification.CertificationStartDate }}</td>
          <td class="px-4 py-2">{{ certification.CertificationExpirationDate }}</td>
          <td class="px-4 py-2">
            <a
              :href="certification.CertificationURI"
              class="text-blue-500 hover:underline"
              target="_blank"
            >
              Certification Link
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
