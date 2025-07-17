<script setup lang="ts">
definePageMeta({
  // middleware:
})
</script>

<template>
  <div class="max-w-4xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Your Cart</h1>
    <div  class="text-gray-600">Your cart is empty.</div>

    <div >
      <ul>
        <li  class="flex justify-between items-center py-2 border-b">
          <div>
            <h2 class="font-semibold">ITEM NAME</h2>
            <p>20 RON</p>
          </div>
          <div class="flex items-center space-x-2">
            <button  class="px-2 bg-gray-300 rounded">-</button>
            <span>quantity</span>
            <button  class="px-2 bg-gray-300 rounded">+</button>
          </div>
          <div> RON</div>
        </li>
      </ul>

      <div class="mt-4 flex justify-between font-semibold text-lg">
        <span>Total:</span>
        <span> RON</span>
      </div>

      <div class="mt-6">
        <UButton @click="clearCart" color="danger">Clear Cart</UButton>
      </div>
    </div>
  </div>
</template>
