<script setup lang="ts">
import CartDisplay from "~/components/cart/CartDisplay.vue";

const {userId,isAuthenticated,user} = useAuth()
const {cart, getCartByUserId, updateCartEntryQuantity, deleteCartEntry} = useCart()

onMounted(() => {

  if (userId.value) {
    getCartByUserId(userId.value)
  }
})

async function increaseQuantity(entry) {
  await updateCartEntryQuantity(entry.id, entry.quantity + 1)
}

async function decreaseQuantity(entry) {
  if (entry.quantity > 1) {
    await updateCartEntryQuantity(entry.id, entry.quantity - 1)
  } else {
    await deleteCartEntry(entry.id)

  }
}

</script>
<template>
  <div class="max-w-4xl mx-auto p-4 mb-30 ">
    <div v-if="user">
      <div class="flex justify-center items-center">
        <CartDisplay :cart="cart" @increaseQuantity="increaseQuantity" @decreaseQuantity="decreaseQuantity"/>
      </div>
    </div>
    <div v-else>
      <h1 class="text-center text-3xl mt-40 mb-90">Login or Register to add items to your cart.</h1>
    </div>
  </div>
</template>