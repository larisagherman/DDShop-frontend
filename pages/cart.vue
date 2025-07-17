<script setup lang="ts">
// import {useCartStore} from "~/stores/useCartStore.js";


const { userId } = useAuth()
const { cart, getCartByUserId,updateCartEntryQuantity,deleteCartEntry } = useCart()

onMounted(() => {
  if (userId.value) {
    getCartByUserId(userId.value)
  }
})

async function increaseQuantity(entry) {
  await updateCartEntryQuantity(entry.id, entry.quantity+1)
}

async function decreaseQuantity(entry) {
  if (entry.quantity > 1) {
    await updateCartEntryQuantity(entry.id, entry.quantity-1)
  } else {
    await deleteCartEntry(entry.id)

  }
}
const router = useRouter()
function shopNow() {
  router.push('/products')
}
</script>
<template>
  <div class="max-w-4xl mx-auto p-4">

    <div v-if="cart?.cartEntries?.length==0" class="flex flex-col items-center justify-center h-96 text-center">
      <h1 class="text-2xl font-semibold mb-4 text-center mb-8 mt-8">Your cart is currently empty</h1>
      <UButton class="mt-4 cursor-pointer " @click="shopNow">Shop Now</UButton>
    </div>
    <div v-else>
      <h1 class="text-2xl font-bold mb-4 text-center mb-8 mt-8">Your Cart</h1>
      <div
          class="hidden sm:flex items-center justify-between py-2 border-b  border-b-gray-300 font-semibold text-sm text-gray-700">
        <div class="w-1/3 ">Product</div>
        <div class="w-1/3 text-center">Quantity</div>
        <div class="w-24 text-right">Subtotal</div>
      </div>
      <ul>
        <li v-for="entry in cart.cartEntries" :key="entry.id"
            class="flex items-center justify-between py-2 border-b border-b-gray-200">
          <div class="font-semibold w-1/3">
            <h2 class="text-base line-clamp-2 leading-snug break-words">{{ entry.productName }}</h2>
            <p class="text-sm text-gray-500">{{ entry.pricePerPiece }} RON</p>
          </div>
          <div class="flex items-center space-x-2">
            <button @click="decreaseQuantity(entry)" class="px-2 bg-pink-100 rounded ">-</button>
            <span>{{ entry.quantity }}</span>
            <button @click="increaseQuantity(entry)" class="px-2 bg-pink-100 rounded ">+</button>
          </div>
          <div class="text-right w-24">{{ entry.totalPricePerEntry }} RON</div>
        </li>
      </ul>
      <div class="mt-4 flex justify-between font-semibold text-lg">
        <span>Total:</span>
        <span>{{ cart.totalPrice }} RON</span>
      </div>
      <div class="mt-6 flex justify-end">
        <UButton class="text-base py-3 px-6"> CHECKOUT</UButton>
      </div>

    </div>
  </div>
</template>