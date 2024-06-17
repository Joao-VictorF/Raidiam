<script setup lang="ts">
import type { AuthorisationServer } from '@models/AuthorisationServer'

const props = defineProps<{ server: AuthorisationServer }>()

const _server = props.server

const features = computed(() =>
  [
    {
      name: 'CIBA',
      supported: _server.SupportsCiba
    },
    {
      name: 'DCR',
      supported: _server.SupportsDCR
    },
    {
      name: 'Redirect',
      supported: _server.SupportsRedirect
    },
    {
      name: `Auto Registration`,
      href: _server.AutoRegistrationSupported
    }
  ].sort((a, b) => b.supported - a.supported)
)

const links = computed(() =>
  [
    {
      name: 'Issuer',
      href: _server.Issuer
    },
    {
      name: 'Developer Portal',
      href: _server.DeveloperPortalUri
    },
    {
      name: 'OpenID Configuration',
      href: _server.OpenIDDiscoveryDocument
    },
    {
      name: 'Terms of Service',
      href: _server.TermsOfServiceUri
    },
    {
      name: 'Payload Signing Cert. Location',
      href: _server.PayloadSigningCertLocationUri
    }
  ].filter((link) => link.href)
)

function formattedJson(obj) {
  return JSON.stringify(obj, null, 4)
}
</script>

<template>
  <div class="flex flex-col justify-between gap-y-3 bg-white shadow-md rounded-lg p-6">
    <!-- <div class="flex flex-col justify-between gap-y-3"> -->
    <div class="flex gap-x-3 items-center">
      <img
        :src="server.CustomerFriendlyLogoUri"
        alt="Logo"
        class="w-16 h-16 object-contain bg-gray-100 p-2 rounded-full"
      />
      <div class="flex flex-col grow flex-wrap">
        <h2 class="text-[18px] font-semibold">{{ server.CustomerFriendlyName }}</h2>
        <div
          v-if="server.ParentAuthorisationServerId"
          class="flex gap-x-2 items-center text-[14px]"
        >
          <span class="text-gray-500">Parent Authorisation Server Id: </span>
          <span class="font-semibold text-source-code">
            {{ server.ParentAuthorisationServerId }}
          </span>
        </div>
      </div>
    </div>

    <div class="flex gap-2 flex-wrap">
      <span
        v-for="feature in features"
        :key="feature.name"
        :class="[
          feature.supported ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800',
          'text-[12px] font-semibold px-2 py-1 rounded whitespace-nowrap'
        ]"
      >
        {{ feature.supported ? `Support ${feature.name}` : `Don't Support ${feature.name}` }}
      </span>
    </div>

    <!-- <p class="text-gray-700 mb-2 text-justify">{{ server.CustomerFriendlyDescription }}</p> -->
    <!-- </div> -->

    <!-- Useful Links -->
    <div
      class="flex flex-wrap gap-x-4 pt-4 border-t-2 border-gray-500 border-opacity-20 text-[14px]"
    >
      <a
        v-for="link in links"
        :key="link.name"
        :href="link.href"
        class="text-blue-400 hover:underline cursor-pointer"
        target="_blank"
      >
        {{ link.name }}
      </a>
    </div>

    <pre class="whitespace-pre-wrap bg-gray-100 p-4 rounded">
      {{ formattedJson(server?.AuthorisationServerCertifications[0]) }}
    </pre>
  </div>
</template>