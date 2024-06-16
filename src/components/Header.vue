<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ChevronRightIcon } from '@heroicons/vue/solid'

import type Breadcrumb from '@/models/Breadcrumb'
const route = useRoute()

const pageTitle = computed(() => route.name as string)
const breadcrumbs = computed<Breadcrumb[]>(() => (route.meta.breadcrumbs as Breadcrumb[]) ?? [])
</script>

<template>
  <div class="lg:flex lg:items-center lg:justify-between header-bg-gradient">
    <div class="flex-1 min-w-0 p-4 py-6 flex flex-col justify-center">
      <nav class="flex mb-2" aria-label="Breadcrumb">
        <ol role="list" class="flex items-center space-x-4">
          <li v-for="(breadcrumb, index) in breadcrumbs" :key="index">
            <div class="flex items-center">
              <template v-if="index > 0">
                <ChevronRightIcon class="flex-shrink-0 h-5 w-5 text-gray-500" aria-hidden="true" />
              </template>
              <RouterLink
                :to="breadcrumb.route"
                class="ml-4 text-sm font-medium text-gray-300 hover:text-white"
              >
                {{ breadcrumb.text }}
              </RouterLink>
            </div>
          </li>
        </ol>
      </nav>
      <h2 class="text-2xl font-bold text-white text-arvo sm:text-3xl sm:truncate">
        {{ pageTitle }}
      </h2>
    </div>
  </div>
</template>

<style scoped>
.header-bg-gradient {
  background: linear-gradient(90deg, #072323, #020c0c 50%);
}
</style>
