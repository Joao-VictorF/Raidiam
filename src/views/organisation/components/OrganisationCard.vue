<script setup lang="ts">
import { defineProps } from 'vue'
import type { Organisation } from '@/models/Organisation'

defineProps<{ organisation: Organisation }>()
</script>

<template>
  <div class="bg-white rounded-lg shadow-md px-6 py-8">
    <div class="flex items-center">
      <div>
        <h2 class="text-md font-bold">{{ organisation.OrganisationName }}</h2>
        <p class="text-gray-600">{{ organisation.Status }}</p>
      </div>
    </div>
    <div class="mt-4">
      <p class="text-gray-800"><strong>Country:</strong> {{ organisation.Country }}</p>
      <p class="text-gray-800"><strong>City:</strong> {{ organisation.City }}</p>
      <p class="text-gray-800">
        <strong>Registration Number:</strong> {{ organisation.RegistrationNumber }}
      </p>
    </div>
  </div>
</template>
