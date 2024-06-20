<script setup lang="ts">
import { autoUpdate, offset, shift, useFloating } from '@floating-ui/vue'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/solid'

defineProps<{
  btnTitle: String
  btnClasses: String
  menuClasses: String
  disabled?: boolean
}>()

const popoverBtn = ref(null)
const popoverMenu = ref(null)

const { floatingStyles } = useFloating(popoverBtn, popoverMenu, {
  placement: 'bottom',
  middleware: [offset(10), shift({ padding: 20 })],
  whileElementsMounted: autoUpdate
})
</script>

<template>
  <Popover v-slot="{ open }" class="relative">
    <PopoverButton
      ref="popoverBtn"
      class="group inline-flex items-center justify-between rounded-md px-3 py-2 text-[12px] focus:outline-none popover-btn"
      :class="[btnClasses, disabled ? '!bg-gray-100' : '']"
      :disabled="disabled"
    >
      <span :class="{ 'text-gray-400': disabled }">{{ btnTitle }}</span>

      <ChevronDownIcon
        :key="open.toString()"
        :class="{
          'transform rotate-180': open,
          'text-gray-400': disabled
        }"
        class="ml-2 h-5 w-5 transition duration-150 ease-in-out"
        aria-hidden="true"
      />
    </PopoverButton>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <PopoverPanel class="absolute left-1/2 z-10 mt-3 -translate-x-1/2 transform">
        <div
          ref="popoverMenu"
          class="p-5 w-full bg-white rounded-md popover-menu-shadow popover-content"
          :class="menuClasses"
          :style="floatingStyles"
        >
          <slot />
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<style scoped>
.popover-menu-shadow {
  box-shadow: 0px 0px 30px 20px rgba(0, 0, 0, 0.1);
}
</style>
