<script setup lang="ts">
definePageMeta({
  layout: 'checkout'
})

import {onMounted} from 'vue'
import {useCart} from '~/composables/useCart'
import {useAuth} from '~/composables/useAuth'
import {useCheckoutStore} from '~/stores/useCheckoutStore'

const {userId} = useAuth()
const {cart, getCartByUserId, checkout,disableCart,createCart} = useCart()

onMounted(() => {
  if (userId.value) {
    getCartByUserId(userId.value)
  }
})
const checkoutStore = useCheckoutStore()
const router = useRouter()
async function placeOrder() {
  const isSubmitting = ref(false)

  try {
    const orderForm = {
      userId: userId.value,
      cartId: cart.value.id,
      paymentType: checkoutStore.formState.paymentType,
      deliveryAddress: { ...checkoutStore.formState.deliveryAddress },
      invoiceAddress: { ...checkoutStore.formState.billingAddress },
      totalPrice: cart.value.totalPrice,
      orderDate: new Date().toISOString()
    }
    await checkout(orderForm)
    await disableCart(cart.value.id)
    await createCart(userId.value)
    sessionStorage.setItem('orderSuccess', 'true')

    await router.push('/checkout/success')
  } catch (error) {
    console.error('Order failed:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-4 animate-fade-in">
    <h1 class="text-2xl font-bold text-center mb-8">Order Summary</h1>

    <div v-if="!cart || !cart.cartEntries || cart.cartEntries.length === 0" class="text-center mt-20">
      <h2 class="text-xl font-semibold">Your cart is empty</h2>
    </div>

    <div v-else>
      <!-- Table Header -->
      <div
          class="hidden sm:flex items-center justify-between py-2 border-b border-gray-300 font-semibold text-sm text-gray-700">
        <div class="w-1/3">Product</div>
        <div class="w-1/3 text-center">Quantity</div>
        <div class="w-24 text-right">Subtotal</div>
      </div>

      <!-- Cart Items -->
      <ul>
        <li v-for="entry in cart.cartEntries" :key="entry.id"
            class="flex items-center justify-between py-3 border-b border-gray-200">
          <div class="w-1/3">
            <h2 class="text-base font-medium">{{ entry.productName }}</h2>
            <p class="text-sm text-gray-500">{{ entry.pricePerPiece }} RON each</p>
          </div>
          <div class="w-1/3 text-center text-sm">{{ entry.quantity }}</div>
          <div class="w-24 text-right font-semibold">{{ entry.totalPricePerEntry }} RON</div>
        </li>
      </ul>

      <!-- Total -->
      <div class="mt-6 flex justify-between font-semibold text-lg border-t pt-4">
        <span>Total:</span>
        <span>{{ cart.totalPrice }} RON</span>
      </div>

      <!-- Confirm Button -->
      <div class="flex justify-center mt-8">
        <UButton class="text-base py-3 px-6" @click="placeOrder" :loading="isSubmitting">ORDER NOW</UButton>
      </div>
    </div>
  </div>
</template>
