<script setup lang="ts">
interface Props {
  id?: string
  title?: string
  subtitle?: string
  columnsClasses?: string
}

withDefaults(defineProps<Props>(), {
  columnsClasses: 'col-span-1'
})
</script>

<template>
  <div :id="id" class="bg-gray-200 rounded-lg shadow-md p-6" :class="columnsClasses">
    <h1 class="text-[16px] font-semibold mb-2">{{ title }}</h1>
    <p class="text-[14px] mb-4">
      {{ subtitle }}
    </p>
    <slot />
  </div>
</template>
