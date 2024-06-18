<script setup lang="ts">
import { SearchIcon } from '@heroicons/vue/outline'

defineProps<{ message?: String }>()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-16">
    <slot name="icon">
      <SearchIcon class="w-16 h-16 text-gray-600" />
    </slot>
    <p class="mt-4 text-gray-600 text-center text-lg">
      <slot name="message"> No items found. </slot>
    </p>
  </div>
</template>
