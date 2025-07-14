<script setup lang="ts">

const {products, getProducts} = useProduct()

onMounted(() => {
  getProducts()
})

</script>
<template>
  <div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      <NuxtLink v-for="product in products" :key="product.id" :to="`/products/${product.id}`" class="block w-full h-full">
        <UCard class="hover:shadow-lg transition-shadow h-full">
          <img src="" alt="Product Image" class="rounded-md h-48 object-cover mb-2 "/>
          <h2 class="text-lg font-semibold">{{ product.name }}</h2>
          <p class="text-gray-500">{{ product.price }} RON</p>
          <UButton>Add to Cart</UButton>
        </UCard>
      </NuxtLink>
    </div>
  </div>
</template>