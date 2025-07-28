<script setup lang="ts">

const {products, getProducts} = useProduct()
const {cart, addToCart, getCartByUserId} = useCart()
const {categories, getCategories} = useCategory()
const {userId} = useAuth()
onMounted(async () => {
  await getProducts()
  await getCategories()
  //to get the max price of the actual products
  const prices = products.value.map(p => p.price)
  const max = Math.max(...prices)

  priceRange.value[1] = max
})

watch(
    () => userId.value,
    (id) => {
      if (id) {
        getCartByUserId(id)
      }
    },
    {immediate: true}
)

function handleAddToCart(product) {
  const quantity = 1
  const pricePerPiece = product.price
  const totalPricePerEntry = pricePerPiece * quantity

  console.log('Adding to cart', product)
  addToCart(product.id, product.name, quantity, pricePerPiece, totalPricePerEntry)
}

//filtering
const selectedCategory = ref('')
const priceRange = ref([0,300])

const filteredProducts = computed(() => {
  return products.value.filter(p => {
    const categoryMatch = selectedCategory.value === '' || p.categoryName === selectedCategory.value
    const priceMatch = p.price>=priceRange.value[0]&&p.price <= priceRange.value[1]
    return categoryMatch && priceMatch
  })
})
</script>
<template>
  <div class="flex gap-6 p-2">
      <!-- Sidebar Filters -->
      <div class="w-full sm:w-64 flex-shrink-0">
        <!-- Category Filter -->
        <div class="mb-6">
          <label class="block mb-2 font-medium">Category:</label>
          <select v-model="selectedCategory" class="border border-pink-500 px-2 py-1 rounded w-full">
            <option value="" >All</option>
            <option
                v-for="category in categories"
                :key="category.id"
                :value="category.name"
            >
              {{ category.name }}
            </option>
          </select>
        </div>

        <!-- Price Range Slider -->
        <div class="mb-6">
          <label class="block mb-2 font-medium">Price Range:</label>
          <USlider v-model="priceRange" :min="0" :max="300" class="w-full" />

          <!-- Min/Max Cards aligned below -->
          <div class="flex justify-between mt-4">
            <div>
              <p class="text-xs text-gray-500">Min Price</p>
              <p class="text-sm font-semibold">{{ priceRange[0] }} RON</p>
            </div>
            <div>
              <p class="text-xs text-gray-500">Max Price</p>
              <p class="text-sm font-semibold">{{ priceRange[1] }} RON</p>
            </div>
          </div>
        </div>
      </div>
    <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 flex-1">
      <NuxtLink v-for="product in filteredProducts" :key="product.id" :to="`/products/${product.id}`"
                class="block  h-full">
        <UCard class="max-w-sm w-full hover:shadow-md transition-shadow flex flex-col justify-between h-full min-h-[28rem]">
          <div class="flex flex-col flex-grow">
            <img :src="product.imageUrls?.[0]?.imageUrl" alt="Product Image"
                 class="rounded-md w-full h-64 object-cover mb-2"/>
            <h1 class="text-xl font-semibold mb-1 line-clamp-2 min-h-[3.5rem] capitalize">{{ product.name }}</h1>
            <p class="lowercase">{{ product.description }}</p>
            <p class="text-gray-500 mb-4">{{ product.price }} RON</p>
          </div>
          <div class="mt-auto">
            <UButton @click.prevent="handleAddToCart(product)" class="cursor-pointer">Add to Cart</UButton>
          </div>
        </UCard>
      </NuxtLink>
    </div>
  </div>
</template>