<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({
  title: 'Raidiam - Technical Case'
})
</script>

<template>
  <Header />
  <RouterView class="my-8 lg:my-10 mx-8" />
</template>
