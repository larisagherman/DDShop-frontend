<script setup lang="ts">

const {products, getProducts} = useProduct()
const {cart,addToCart,getCartByUserId}=useCart()
const {userId} = useAuth()
onMounted(() => {
  getProducts()
})

watch(
    () => userId.value,
    (id) => {
      if (id) {
        console.log("Fetching cart for user:", id)
        getCartByUserId(id)
      }
    },
    { immediate: true }
)

function handleAddToCart(product) {
  const quantity = 1
  const pricePerPiece = product.price
  const totalPricePerEntry = pricePerPiece * quantity

  console.log('Adding to cart', product)
  addToCart(product.id,product.name, quantity, pricePerPiece, totalPricePerEntry)

}

</script>
<template>
  <div class="p-2">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      <NuxtLink v-for="product in products" :key="product.id" :to="`/products/${product.id}`"
                class="block  h-full">
        <UCard class="hover:shadow-lg transition-shadow flex flex-col justify-between max-w-sm mx-auto">
          <div class="flex flex-col flex-grow">
            <img src="" alt="Product Image" class="rounded-md h-36 object-cover mb-2 w-full"/>
            <h2 class="text-lg font-semibold mb-1 line-clamp-2 min-h-[3.5rem]">{{ product.name }}</h2>
            <p class="text-gray-500 mb-4">{{ product.price }} RON</p>
          </div>
          <div class="mt-auto">
            <UButton @click.prevent="handleAddToCart(product)">Add to Cart</UButton>
          </div>
        </UCard>
      </NuxtLink>
    </div>
  </div>
</template>