<script setup lang="ts">
import { ApiDiscoveryEndpoint } from '@/models/ApiDiscoveryEndpoint'
import { LinkIcon, ClipboardCopyIcon } from '@heroicons/vue/solid'

defineProps<{ Endpoints: ApiDiscoveryEndpoint[] }>()

const highlightParams = (endpoint: string) => {
  return endpoint.replace(/\{([^}]+)\}/g, '<span class="!text-raidiamPink font-500">{$1}</span>')
}

const extractBaseUrl = (endpoint: string) => {
  const url = new URL(endpoint)
  return url.origin
}

const extractEndpoint = (endpoint: string) => {
  const url = new URL(endpoint)
  return decodeURIComponent(url.pathname)
}

const copyToClipboard = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {})
    .catch((err) => {
      console.error('Could not copy text: ', err)
    })
}
</script>

<template>
  <div class="ml-2">
    <div class="text-[16px] flex gap-x-3 items-center mb-2">
      <span class="font-medium">API Discovery Endpoints</span>
      -
      <span class="text-gray-500 text-source-code"
        >BaseUrl ({{ extractBaseUrl(Endpoints[0].ApiEndpoint) }})</span
      >
    </div>

    <ul class="">
      <li
        v-for="endpoint in Endpoints"
        :key="endpoint.ApiDiscoveryId"
        class="flex items-center justify-between gap-x-4 mb-1 text-source-code tracking-tight bg-gray-100 py-3 px-4 rounded-md"
      >
        <div>
          <span v-html="highlightParams(extractEndpoint(endpoint.ApiEndpoint))"></span>
        </div>

        <div class="flex items-center gap-x-2">
          <a
            :href="endpoint.ApiEndpoint"
            target="_blank"
            class="flex items-center gap-x-1 py-1.5 px-3 bg-blue-600 bg-opacity-20 text-[12px] rounded-full max-w-[300px] overflow-hidden whitespace-nowrap text-ellipsis"
          >
            <LinkIcon
              class="flex-shrink-0 h-5 w-5 text-blue-600 hover:text-blue-800"
              aria-hidden="true"
            />
            <span class="text-blue-700 overflow-hidden whitespace-nowrap text-ellipsis">
              {{ endpoint.ApiEndpoint }}
            </span>
          </a>

          <button
            @click="copyToClipboard(endpoint.ApiEndpoint)"
            class="flex items-center gap-x-1 py-1.5 px-3 rounded-full bg-raidiamPink bg-opacity-20 text-[12px]"
          >
            <ClipboardCopyIcon class="flex-shrink-0 h-5 w-5 text-raidiamPink" aria-hidden="true" />
            <span class="text-raidiamPink font-bold">Copy</span>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
