<script setup lang="ts">
import { useParticipantsStore } from '@/stores/participants'
import type { Organisation } from '@/models/Organisation'

const participantsStore = useParticipantsStore()
const props = defineProps<{
  organisations: Organisation[]
}>()

const emit = defineEmits(['filtered'])

const statusOptions = ['All', 'Active', 'Pending', 'Withdrawn']
const uniqueTags = computed(() => ['All', ...participantsStore.uniqueTags])

const searchQuery = ref('')
const selectedStatus = ref(statusOptions[0])
const selectedTag = ref('All')

const applyFilters = () => {
  const filtered = props.organisations.filter((org) => {
    const matchesSearchQuery =
      org.OrganisationName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      org.RegistrationId?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      org.RegistrationNumber.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesStatus = selectedStatus.value === 'All' || org.Status === selectedStatus.value

    const matchesTag = selectedTag.value === 'All' || org.Tags.includes(selectedTag.value)

    return matchesSearchQuery && matchesStatus && matchesTag
  })

  emit('filtered', filtered)
}

watch([selectedStatus, selectedTag, searchQuery], applyFilters)
</script>

<template>
  <div class="mb-4 flex justify-between flex-wrap items-center gap-x-4">
    <input
      v-model="searchQuery"
      @input="applyFilters"
      type="text"
      placeholder="Search by Name, Registration ID or Registration Number"
      class="px-4 py-2 placeholder:text-[14px] placeholder:text-gray-700 rounded-lg shadow-lg w-full sm:w-1/3 focus:outline-none h-[36px] mt-1"
    />

    <div class="flex gap-x-4 grow justify-end">
      <ListBox
        :options="statusOptions"
        v-model:selected-item="selectedStatus"
        class="w-full sm:w-1/3"
        prefix-text="Status:"
      />

      <ListBox
        :options="uniqueTags"
        v-model:selected-item="selectedTag"
        class="w-full sm:w-1/3"
        prefix-text="Tags:"
      />
    </div>
  </div>
</template>
