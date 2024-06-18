<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ChevronRightIcon } from '@heroicons/vue/solid'

import { useNavigationStore } from '@/stores/navigation'
import { Breadcrumb, BreadcrumbsKeys } from '@/models/Breadcrumb'

const route = useRoute()
const router = useRouter()

const navigationStore = useNavigationStore()
const breadcrumbsMap = computed<Record<BreadcrumbsKeys, Breadcrumb>>(
  () => navigationStore.breadcrumbs
)
const breadcrumbsList = computed<Breadcrumb[]>(() =>
  navigationStore.breadcrumbsArray().filter((item) => !item.hidden)
)

const pageKey = computed<BreadcrumbsKeys>(() => route.meta?.key as BreadcrumbsKeys)
const pageTitle = computed(() => breadcrumbsMap.value[pageKey.value]?.title ?? '-')
const pageHeaderClasses = computed(() => route.meta.pageHeaderClasses)

const navigateToBreadcrumbLink = (route: string) => {
  if (route.includes('/')) router.push(route)

  const element = document.querySelector(route)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  } else {
    router.push(route)
  }
}
</script>

<template>
  <div
    class="lg:flex lg:items-center lg:justify-between header-bg-gradient"
    :class="pageHeaderClasses"
    style="z-index: 101"
  >
    <div class="flex-1 min-w-0 p-4 py-6 flex flex-col justify-center">
      <nav class="flex mb-2" aria-label="Breadcrumb">
        <ol v-if="breadcrumbsList.length > 1" role="list" class="flex items-center">
          <li v-for="(breadcrumb, index) in breadcrumbsList" :key="index">
            <div class="flex items-center">
              <template v-if="index > 0">
                <ChevronRightIcon class="flex-shrink-0 h-5 w-5 text-gray-500" aria-hidden="true" />
              </template>
              <button
                @click.prevent="navigateToBreadcrumbLink(breadcrumb.route)"
                class="text-sm font-medium text-gray-300 hover:text-white mr-1"
                :class="{ 'ml-1': index > 0 }"
              >
                {{ breadcrumb.title }}
              </button>
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
