
<script setup lang="ts">
import type { StepperItem } from '@nuxt/ui'

const items: StepperItem[] = [
  {
    title: 'Shipping',
    description: 'Set your preferred shipping method',
    icon: 'i-lucide-truck',
    to: '/checkout/shipping',
  },
  {
    title: 'Billing',
    description: 'Enter billing info',
    icon: 'i-lucide-wallet',
    to: '/checkout/billing',
  },
  {
    title: 'Checkout',
    description: 'Confirm your order',
    icon: 'i-lucide-check-circle',
    to: '/checkout/confirmation',
  }
]

const stepper = useTemplateRef('stepper')
</script>

<template>
  <div class="w-full">
    <UStepper ref="stepper" :items="items">
      <template #content="{ item }">
        <Placeholder class="aspect-video">
          {{ item.description }}
        </Placeholder>
      </template>
    </UStepper>

    <div class="flex gap-2 justify-between mt-4">
      <UButton
          leading-icon="i-lucide-arrow-left"
          :disabled="!stepper?.hasPrev"
          @click="stepper?.prev()"
      >
        Back
      </UButton>

      <UButton
          trailing-icon="i-lucide-arrow-right"
          :disabled="!stepper?.hasNext"
          @click="stepper?.next()"
      >
        Next
      </UButton>
    </div>
  </div>
</template>

