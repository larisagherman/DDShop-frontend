<!-- components/CheckoutStepper.vue -->
<script setup lang="ts">


import type {StepperItem} from '@nuxt/ui'
import {useRoute, useRouter} from 'vue-router'

const router = useRouter()
const route = useRoute()

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

const currentIndex = computed(() =>
    items.findIndex(item => item.to === route.path)
)

const goToStep = (index: number) => {
  const item = items[index]
  if (item) router.push(item.to)
}

const hasPrev = computed(() => currentIndex.value > 0)
const hasNext = computed(() => currentIndex.value < items.length - 1)

function goBackToCart() {
  router.push('/cart')
}
</script>

<template>

  <div class="w-full max-w-4xl mx-auto flex flex-col">
    <div class="mb-4">
      <UButton leading-icon="i-lucide-arrow-left" @click="goBackToCart" variant="ghost" color="grey">
        Back to Cart
      </UButton>
    </div>
    <div class="mb-8">
      <UStepper :items="items" :model-value="currentIndex"/>
    </div>
    <div class="flex-grow">
      <slot/>
    </div>

    <div class="flex gap-2 justify-between mt-6">
      <UButton
          leading-icon="i-lucide-arrow-left"
          :disabled="!hasPrev"
          @click="goToStep(currentIndex - 1)"
      >
        Back
      </UButton>

      <UButton
          trailing-icon="i-lucide-arrow-right"
          :disabled="!hasNext"
          @click="goToStep(currentIndex + 1)"
      >
        Next
      </UButton>
    </div>
  </div>
</template>
