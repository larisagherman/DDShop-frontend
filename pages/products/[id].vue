<script setup lang="ts">
const route = useRoute()

const {product, getProductById} = useProduct()
const loading=ref(true)

onMounted(async() => {
  const id = Number(route.params.id)
  loading.value=true
  await getProductById(id)
  loading.value=false
})

const router = useRouter()

function goBack() {
  router.back()
}

const breadcrumbs = ref<BreadcrumbItem[]>([
  {
    label: 'Home',
    to: '/'
  },
  {
    label: 'Products',
    to: '/products'
  }
])

watch(product, (newProduct) => {
  if (newProduct) {
    const capitalizedName = newProduct.name.charAt(0).toUpperCase() + newProduct.name.slice(1)
    breadcrumbs.value.push({
      label: capitalizedName,
    })
  }
})
const groupedAttributes = computed(() => {
  const groups = {}

  product.value?.productAttributes?.forEach(attr => {
    if (!groups[attr.name]) {
      groups[attr.name] = []
    }
    if (!groups[attr.name].includes(attr.value)) {
      groups[attr.name].push(attr.value)
    }
  })

  return groups
})
const carousel = useTemplateRef('carousel')
const activeIndex = ref(0)

// Use carousel's built-in prev/next methods:
function onClickPrev() {
  carousel.value?.emblaApi?.scrollPrev()
}

function onClickNext() {
  carousel.value?.emblaApi?.scrollNext()
}

function onSelect(index: number) {
  activeIndex.value = index
}

function select(index: number) {
  activeIndex.value = index

  carousel.value?.emblaApi?.scrollTo(index)
}

const {addToCart} = useCart()

function handleAddToCart(product) {
  const quantity = 1
  const pricePerPiece = product.price
  const totalPricePerEntry = pricePerPiece * quantity

  console.log('Adding to cart', product)
  addToCart(product.id, product.name, quantity, pricePerPiece, totalPricePerEntry)
}
const quantity = ref(1)

</script>

<template >
  <div class="h-screen">
    <div class="p-4 mb-10 ">
      <UBreadcrumb  :items="breadcrumbs" />
    </div>
    <div class="max-w-6xl mx-auto">
      <!-- Loading skeleton -->
      <div v-if="loading" class="animate-pulse">
        <div class="flex justify-start items-start gap-20">

          <!-- Left side: carousel + vertical thumbnails skeleton -->
          <div class="flex gap-4 max-w-lg ">
            <div class="flex flex-col gap-4">
              <div v-for="i in 4" :key="i" class="w-20 h-20 bg-gray-300 rounded-lg"></div>
            </div>

            <div class="flex-grow bg-gray-300 rounded-lg h-[400px] w-[400px]"></div>
          </div>

          <!-- Right side: text details skeleton -->
          <div class="flex flex-col h-full max-h-[450px] w-full gap-4">
            <!-- Title skeleton -->
            <div class="h-10 bg-gray-300 w-3/4 rounded"></div>

            <!-- Description skeleton -->
            <div class="flex-grow flex flex-col gap-2">
              <div class="h-6 bg-gray-300 w-full rounded"></div>
              <div class="h-6 bg-gray-300 w-5/6 rounded"></div>
              <div class="h-6 bg-gray-300 w-2/3 rounded"></div>
            </div>

            <!-- Price and buttons skeleton -->
            <div class="mt-auto flex flex-col gap-2">
              <div class="h-6 bg-gray-300 w-1/4 rounded"></div>
              <div class="flex gap-4 items-center">
                <div class="h-10 w-10 bg-gray-300 rounded"></div>
                <div class="h-10 flex-grow bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div v-else v-if="product" class="">
        <div class="flex justify-start  items-start gap-20">

          <!-- Left side: carousel + vertical thumbnails -->
          <div class="flex gap-4 max-w-lg">
            <div class="flex flex-col gap-4">
              <div
                  v-for="(img, index) in product.imageUrls"
                  :key="index"
                  class="w-20 h-20 rounded-lg overflow-hidden cursor-pointer transition-opacity"
                  :class="activeIndex === index ? 'opacity-100 ring-2 ring-primary scale-105' : 'opacity-50 hover:opacity-100'"
                  @click="select(index)"
              >
                <img
                    :src="`${img.imageUrl}?q_auto,f_auto`"
                    alt="Thumbnail"
                    class="w-full h-full object-cover"
                />
              </div>
            </div>

            <UCarousel
                ref="carousel"
                v-slot="{ item }"
                :items="product.imageUrls.map(img => img.imageUrl)"
                class="flex-grow rounded-lg"
                arrows
                :prev="{ onClick: onClickPrev }"
                :next="{ onClick: onClickNext }"
                @select="onSelect(index)"
            >
              <img
                  :src="`${item}?q_auto,f_auto`"
                  alt="Product Image"
                  class="rounded-lg object-contain w-full h-96"
              />
            </UCarousel>
          </div>

          <!-- Right side: text details -->
          <div class="flex flex-col h-full max-h-[450px]"> <!-- container height for demo -->
            <!-- Title at the top -->
            <div class="mb-4">
              <h1 class="text-6xl font-semibold capitalize">{{ product.name }}</h1>
            </div>

            <!-- Description fills available space -->
            <div class="flex-grow overflow-auto mb-4">
              <h3 class="mb-4 text-2xl lowercase">{{ product.description }}</h3>

              <ul v-if="Object.keys(groupedAttributes).length" class="text-md text-gray-600">
                <li v-for="(values, name) in groupedAttributes" :key="name" class="mb-1">
                  <strong class="capitalize">{{ name }}</strong>: {{ values.join(', ') }}
                </li>
              </ul>
            </div>

            <!-- Price, quantity selector, and button at bottom -->
            <div class="mt-auto">
              <p class="text-gray-500 mb-2 text-lg font-semibold">{{ product.price }} RON</p>

              <!-- Quantity selector -->
              <div class="flex items-center gap-4">
                <div class="flex items-center space-x-2">
                  <button
                      @click="quantity = Math.max(quantity - 1, 1)"
                      class="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
                      aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <input
                      type="number"
                      v-model.number="quantity"
                      min="1"
                      class="w-10 text-center border rounded"
                  />
                  <button
                      @click="quantity++"
                      class="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                      aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <UButton @click="handleAddToCart(product)" class="w-full cursor-pointer text-2xl">
                  Add to Cart
                </UButton>
              </div>


            </div>
          </div>

        </div>
      </div>
    </div>

  </div>


</template>
