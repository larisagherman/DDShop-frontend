<script setup lang="ts">

const {products,getProductsByPage,totalPages,totalItems,getAllProductAttributes,allOfTheProductAttributes} = useProduct()
const {cart, addToCart, getCartByUserId} = useCart()
const {categories, getCategories} = useCategory()
const {userId} = useAuth()


const route = useRoute()
const router = useRouter()

const page = ref(Number(route.query.page)||1)

const loading=ref(true)

//filtering
const selectedCategory = ref(route.query.category as string ||'')
const priceRange = ref([0,300])
const selectedFlavours = ref<string[]>([])  // multi-select for flavours
const selectedIngredients=ref<string[]>([])
const sortField=ref("price")
const sortDir=ref("asc")

if(route.query.ingredients){
  selectedIngredients.value=Array.isArray(route.query.ingredients)
  ?route.query.ingredients
      :[route.query.ingredients as string]
}
if(route.query.flavours){
  selectedFlavours.value=Array.isArray(route.query.flavours)
  ?route.query.flavours
      :[route.query.flavours as string]
}

const flavourOptions = computed(() => {
  const set = new Set()
  allOfTheProductAttributes.value.forEach(attr => {
      if (attr.name === 'flavour') {
        set.add(attr.value)
      }
    })
  return Array.from(set)
})
const ingredientsOptions=computed(() => {
  const set = new Set()
  allOfTheProductAttributes.value.forEach(attr => {
      if (attr.name === 'ingredients') {
        set.add(attr.value)
      }
    })
  return Array.from(set)
})
const filters=computed(()=>({
  category:selectedCategory.value,
  ingredients:selectedIngredients.value,
  flavours:selectedFlavours.value,
  sortField:sortField.value,
  sortDir:sortDir.value,
}))


watch([page, filters], async ([newPage, newFilters]) => {
  loading.value = true
  router.replace({
    query: {
      page:newPage,
      category:newFilters.category||undefined,
      ingredients:newFilters.ingredients.length ? newFilters.ingredients.join(',') : undefined,
      flavours:newFilters.flavours.length ? newFilters.flavours.join(',') : undefined,
      sortField: sortField.value,
      sortDir: sortDir.value,
    }
  })
  await getProductsByPage(newPage, newFilters);
  loading.value = false
}, { immediate: true });

watch(
    () => route.query,
    async (newQuery) => {
      loading.value = true
      page.value = Number(newQuery.page) || 1;
      selectedCategory.value = (newQuery.category as string) || '';
      selectedIngredients.value = newQuery.ingredients
          ? (newQuery.ingredients as string).split(',')
          : [];
      selectedFlavours.value = newQuery.flavours
          ? (newQuery.flavours as string).split(',')
          : [];
      sortField.value = (newQuery.sortField as string) || 'price';
      sortDir.value = (newQuery.sortDir as string) || 'asc';

      // Fetch products with updated filters
      await getProductsByPage(page.value, {
        category: selectedCategory.value,
        ingredients: selectedIngredients.value,
        flavours: selectedFlavours.value,
        sortField: sortField.value,
        sortDir: sortDir.value,
      });
      loading.value = false
    },
    {immediate: true}
);
onMounted(async () => {
  await getCategories()
  await getAllProductAttributes()
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


function clearFilters() {
  selectedCategory.value = ''
  selectedIngredients.value = []
  selectedFlavours.value = []
}


function toggleSortDirection(){
  sortDir.value=sortDir.value==="asc"?"desc":"asc";
}
</script>
<template>
  <div class="mt-4 mb-4 flex items-center gap-2">
    <p>Sort:</p>
    <button @click="toggleSortDirection" class="cursor-pointer underline">
       {{ sortDir === 'asc' ? 'Ascending' : 'Descending' }}
    </button>
  </div>

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
        <!-- Flavour Filter -->
        <div class="mb-6">
          <label class="block mb-2 font-medium">Flavours:</label>
          <div class="flex flex-col gap-1">
            <label v-for="flavour in flavourOptions" :key="flavour" class="inline-flex items-center">
              <input
                  type="checkbox"
                  :value="flavour"
                  v-model="selectedFlavours"
                  class="mr-2"
              />
              {{ flavour }}
            </label>
          </div>
        </div>

        <!-- Ingredient Filter -->
        <div class="mb-6">
          <label class="block mb-2 font-medium">Ingredients:</label>
          <div class="flex flex-col gap-1">
            <label v-for="ingredient in ingredientsOptions" :key="ingredient" class="inline-flex items-center">
              <input
                  type="checkbox"
                  :value="ingredient"
                  v-model="selectedIngredients"
                  class="mr-2"
              />
              {{ ingredient }}
            </label>
          </div>
        </div>
        <UButton @click="clearFilters">Clear Filters</UButton>

      </div>
    <div v-if="loading" class="fixed flex inset-0 justify-center items-center h-screen">
      <p class="text-2xl font-semibold animate-pulse">Loading...</p>
    </div>

    <div v v-else class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 flex-1">
      <NuxtLink v-for="product in products" :key="product.id" :to="`/products/${product.id}`"
                class="block  h-full">
        <UCard class="max-w-sm w-full hover:shadow-md transition-shadow flex flex-col justify-between h-full min-h-[28rem]">
          <div class="flex flex-col flex-grow">
            <img :src="product.imageUrls?.[0]?.imageUrl" alt="Product Image"
                 class="rounded-md w-full h-64 object-cover mb-2"/>
            <h1 class="text-xl font-semibold mb-1 line-clamp-2 min-h-[3.5rem] capitalize">{{ product.name }}</h1>
            <p class="lowercase line-clamp-4">{{ product.description }}</p>
            <p class="text-gray-500 mb-4 line line-clamp-1 mt-2">{{ product.price }} RON</p>
          </div>
          <div class="mt-auto">
            <UButton @click.prevent="handleAddToCart(product)" class="cursor-pointer">Add to Cart</UButton>
          </div>
        </UCard>
      </NuxtLink>

    </div>

  </div>

  <div class="flex items-center justify-center">
   <UPagination v-model:page="page"
                :total="totalItems"
                size="xs"
                active-variant="subtle"
                class="mt-6"/>
  </div>

</template>