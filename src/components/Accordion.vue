<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/solid'

defineProps<{
  btnClasses: String
  menuClasses?: String
}>()
</script>

<template>
  <Disclosure as="div" v-slot="{ open }">
    <DisclosureButton
      class="group inline-flex items-center justify-between px-3 py-2 text-[12px] focus:outline-none accordion-btn"
      :class="[btnClasses, open ? 'rounded-t-md' : 'rounded-md']"
    >
      <slot name="title" />

      <ChevronDownIcon
        :key="open.toString()"
        :class="{ 'transform rotate-180': open }"
        class="ml-2 h-5 w-5 transition duration-150 ease-in-out"
        aria-hidden="true"
      />
    </DisclosureButton>

    <DisclosurePanel>
      <div
        class="p-5 w-full bg-white rounded-b-md accordion-content accordion-menu-shadow"
        :class="menuClasses"
      >
        <slot name="data" />
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<style scoped>
.accordion-menu-shadow {
  box-shadow: 0px 0px 30px 20px rgba(0, 0, 0, 0.1);
}
</style>
