<script setup lang="ts">
defineProps<{
  cart: any
}>()
defineEmits(['increaseQuantity', 'decreaseQuantity'])

const router = useRouter()
function shopNow() {
  router.push('/products')
}
function checkout() {
  router.push('/checkout/shipping')
}

</script>
<template>
  <div class="max-w-4xl mx-auto p-4">
    <!-- 💡 Check if cart is loaded -->
    <div v-if="!cart">
      <p class="text-center text-gray-500 mt-10">Loading cart...</p>
    </div>

    <!-- ✅ When cart is empty -->
    <div v-else-if="cart.cartEntries?.length === 0" class="flex flex-col items-center justify-center text-center mt-20">
      <h1 class="text-2xl font-semibold mb-4">Your cart is currently empty.</h1>
      <UButton @click="shopNow" class="text-center text-md text-md font-bold mt-2 p-4">Continue Shopping</UButton>
    </div>

    <!-- ✅ When cart has entries -->
    <div v-else>
      <h1 class="text-2xl font-bold mb-4 text-center mb-8 mt-8">Your Cart</h1>
      <div
          class="hidden sm:flex items-center justify-between py-2 border-b border-b-gray-300 font-semibold text-md text-gray-700">
        <div class="w-1/3 ">Product</div>
        <div class="w-1/3 text-center">Quantity</div>
        <div class="w-24 text-right">Subtotal</div>
      </div>

      <ul>
        <li
            v-for="entry in cart.cartEntries"
            :key="entry.id"
            class="flex items-center justify-between py-2 border-b border-b-gray-200"
        >
          <div class="font-semibold w-1/3">
            <h2 class="text-base line-clamp-2 leading-snug break-words">{{ entry.productName }}</h2>
            <p class="text-sm text-gray-500">{{ entry.pricePerPiece }} RON</p>
          </div>
          <div class="flex items-center space-x-2">
            <button @click="$emit('decreaseQuantity', entry)" class="px-2 bg-pink-100 rounded cursor-pointer">-</button>
            <span>{{ entry.quantity }}</span>
            <button @click="$emit('increaseQuantity', entry)" class="px-2 bg-pink-100 rounded cursor-pointer">+</button>
          </div>
          <div class="text-right w-24">{{ entry.totalPricePerEntry }} RON</div>
        </li>
      </ul>

      <div class="mt-4 flex justify-between font-semibold text-lg">
        <span>Total:</span>
        <span>{{ cart.totalPrice }} RON</span>
      </div>

      <div class="flex justify-end mt-8">
        <UButton class="text-base py-3 px-6" @click="checkout">CHECKOUT</UButton>
      </div>
    </div>
  </div>
</template>
