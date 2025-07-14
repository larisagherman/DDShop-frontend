<script setup>
const products = [
  {
    id: 1,
    name: 'Chocolate Donut',
    price: 12,
    image: '/donut.jpg',
    availabilityQuantity: 4
  },
  {
    id: 1,
    name: 'Chocolate Donut',
    price: 12,
    image: '/donut.jpg',
    availabilityQuantity: 4
  },{
    id: 1,
    name: 'Chocolate Donut',
    price: 12,
    image: '/donut.jpg',
    availabilityQuantity: 4
  },
  {
    id: 1,
    name: 'Chocolate Donut',
    price: 12,
    image: '/donut.jpg',
    availabilityQuantity: 4
  }
]
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
    <UCard
        v-for="product in products"
        :key="product.id"
        class="flex flex-col justify-between"
    >
      <img
          :src="product.image"
          alt="Product image"
          class="rounded-md h-48 object-cover mb-2"
      />
      <h2 class="text-lg font-semibold">{{ product.name }}</h2>
      <p class="text-gray-500">{{ product.price }} RON</p>
      <UButton
          class="mt-2"
          :disabled="product.availabilityQuantity === 0"
          @click="addToCart(product)"
      >
        Add to Cart
      </UButton>
    </UCard>
  </div>
</template>
