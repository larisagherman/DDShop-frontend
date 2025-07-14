<script setup lang="ts">
const route = useRoute()

const {product,getProductById}=useProduct()
onMounted(() => {
  const id=Number(route.params.id)
  getProductById(id)
})
</script>
<template>
<div class="grid grid-cols-1 align-middle" v-if="product">
  <UCard class="hover:shadow-lg transition-shadow h-full">
    <img src="" alt="Product Image" class="rounded-md h-48 object-cover mb-2 "/>
    <h2 class="text-lg font-semibold">{{ product.name }}</h2>
    <p class="text-gray-500">{{ product.price }} RON</p>
    <ul v-if="product.productAttributes && product.productAttributes.length" class="mb-4">
      <li v-for="(attr, index) in product.productAttributes" :key="index" class="text-sm text-gray-600">
        {{ attr.name }}: {{ attr.value }}
      </li>
    </ul>
    <UButton>Add to Cart</UButton>
  </UCard>
</div>
</template>