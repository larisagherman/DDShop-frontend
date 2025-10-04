<script setup lan="ts">

const {getAllDisabledCartsByUserId,disabledCarts,cart}=useCart()
const {orders,getOrdersByUserId} = userOrder()
const {userId}=useAuth()
onMounted(() => {
  console.log(userId.value)
  console.log(disabledCarts)
  if(userId.value){
    getAllDisabledCartsByUserId(userId.value)
    getOrdersByUserId(userId.value)
  }
})
</script>
<template>
  <div class="max-w-4xl mx-auto p-6 ">
    <h1 class="text-2xl font-bold mb-6">Order History</h1>

    <div v-if="disabledCarts.length === 0">
      <p>No past orders found.</p>
    </div>

    <div v-else>
      <div v-for="(cart, index) in [...disabledCarts].reverse()" :key="cart.id" class="mb-6 p-4 border rounded shadow">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold mb-2">Order #{{ disabledCarts.length - index }}</h2>

          <!-- Find order that matches this cart -->
          <h3 >
            Ordered On: {{
              orders.find(order => order.cartId === cart.id)?.orderDate || 'Date not found'
            }}
          </h3>
        </div>
        <p><strong>Total:</strong> {{ cart.totalPrice }} RON</p>
        <ul class="mt-2">
          <li v-for="entry in cart.cartEntries" :key="entry.id">
            {{ entry.productName }} - {{ entry.quantity }} x {{ entry.pricePerPiece }} RON
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>