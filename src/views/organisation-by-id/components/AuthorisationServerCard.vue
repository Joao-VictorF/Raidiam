<script setup lang="ts">
import AuthorisationServerCertifications from './AuthorisationServerCertifications.vue'
import type { AuthorisationServer } from '@/models/AuthorisationServer'

const route = useRoute()
const router = useRouter()
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
      supported: _server.AutoRegistrationSupported
    }
  ].sort((a, b) => Number(b.supported) - Number(a.supported))
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

function openApiResources() {
  router.push(`${route.path}/s/${props.server.AuthorisationServerId}/api-resources`)
}
</script>

<template>
  <div
    @click="openApiResources()"
    class="flex flex-col justify-between gap-y-3 bg-white shadow-md rounded-lg p-6 cursor-pointer authorisation-server-card"
  >
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

    <!-- Useful Links -->
    <div class="flex flex-col py-4 border-y-2 border-gray-500 border-opacity-20 text-[14px]">
      <h1 class="font-semibold mb-2">Useful Links</h1>
      <div class="flex flex-wrap gap-x-4">
        <a
          v-for="link in links"
          :key="link.name"
          :href="link.href"
          class="text-blue-400 hover:underline cursor-pointer"
          target="_blank"
        >
          * {{ link.name }}
        </a>
      </div>
    </div>

    <Popover
      :btnTitle="`Authorisation Server Certifications (${server.AuthorisationServerCertifications.length})`"
      btnClasses="text-source-code text-[12px] bg-raidiamPink bg-opacity-30 hover:bg-opacity-50 text-black w-full font-semibold"
      menuClasses="!w-[50vw]"
    >
      <AuthorisationServerCertifications
        :Certifications="server.AuthorisationServerCertifications"
      />
    </Popover>
  </div>
</template>
