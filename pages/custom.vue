<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const items = ref<DropdownMenuItem[]>([
  {
    label: 'Profile',
    icon: 'i-lucide-user'
  },
  {
    label: 'Billing',
    icon: 'i-lucide-credit-card'
  },
  {
    label: 'Settings',
    icon: 'i-lucide-cog'
  }
])
</script>

<template>
  <UDropdownMenu

      :items="items"
      :ui="{
      content: 'w-48'
    }"
  >
    <UButton label="Open"  color="neutral" variant="outline" />
  </UDropdownMenu>
</template>