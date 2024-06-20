<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useParticipantsStore } from '@/stores/participants'

useHead({
  title: 'Raidiam - Technical Case'
})

onMounted(() => {
  const participantsStore = useParticipantsStore()
  if (window.Cypress) {
    window.store = { participantsStore }
  }
})
</script>

<template>
  <Header />
  <RouterView class="my-8 lg:my-10 mx-8" />
</template>

<style>
body {
  background-color: #f5f5f5;
}
</style>
