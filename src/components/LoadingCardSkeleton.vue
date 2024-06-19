<script setup lang="ts">
interface Props {
  showTitle?: boolean
  showSubtitle?: boolean
  showText?: boolean
  showBtn?: boolean
}

withDefaults(defineProps<Props>(), {
  showTitle: true,
  showSubtitle: true,
  showText: true,
  showBtn: false
})
</script>

<template>
  <div class="bg-white w-full rounded-lg shadow-md px-6 py-8 loading-card-skeleton">
    <div class="animate-pulse">
      <!-- Title -->
      <div v-if="showTitle" class="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>

      <!-- Subtitle -->
      <div v-if="showSubtitle" class="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>

      <!-- Text -->
      <div v-if="showText">
        <div class="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div class="h-4 bg-gray-300 rounded w-3/5 mb-2"></div>
        <div class="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>

      <!-- Button -->
      <div v-if="showBtn" class="mt-4 h-10 bg-gray-300 rounded w-full"></div>
    </div>
  </div>
</template>
