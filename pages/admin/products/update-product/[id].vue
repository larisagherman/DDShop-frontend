<script setup lang="ts">
definePageMeta({
  middleware: 'admin',
})


const route = useRoute()
const router = useRouter()
const toast = useToast()

const { getProductAttributesById,getProductById, updateProduct, product,productAttributes } = useProduct()
const { categories, getCategories } = useCategory()

const id = Number(route.params.id)

// Form data (same structure as create)
const formProduct = reactive({
  name: '',
  description: '',
  price: 0,
  availabilityQuantity: 0,
  addedDate: new Date().toISOString().slice(0,10),
  categoryId: 0,
  imageUrls: [{ imageUrl: '' }],
  productAttributes: [{ name: '', value: '' }],
})

// Helpers for dynamic fields
const addAttribute = () => formProduct.productAttributes.push({ name: '', value: '' })
const removeAttribute = (index: number) => formProduct.productAttributes.splice(index, 1)
const addImage = () => formProduct.imageUrls.push({ imageUrl: '' })
const removeImage = (index: number) => formProduct.imageUrls.splice(index, 1)

// ✅ Fill form on mount
onMounted(() => {
  // Register lifecycle synchronously
  (async () => {
    try {
      await getCategories()
      await getProductById(id)
      await getProductAttributesById(id)
      if (product.value) {
        const p = product.value
        formProduct.name = p.name
        formProduct.description = p.description
        formProduct.price = p.price
        formProduct.availabilityQuantity = p.availabilityQuantity
        formProduct.addedDate = p.addedDate.slice(0, 10)
        formProduct.categoryId = p.category.id

        formProduct.imageUrls = p.imageUrls.length
            ? p.imageUrls.map(img => ({ imageUrl: img.imageUrl }))
            : [{ imageUrl: '' }]

        formProduct.productAttributes = p.productAttributes.length
            ? p.productAttributes.map(attr => ({ name: attr.name, value: attr.value }))
            : [{ name: '', value: '' }]

      }
    } catch (err) {
      toast.add({
        title: 'Error loading product',
        description: 'Could not fetch product details',
        color: 'error',
        icon: 'i-heroicons-exclamation-triangle',
      })
    }
  })()
})

// 🟣 Handle form submission
const submitUpdate = async () => {
  try {
    await updateProduct(id, formProduct)

    toast.add({
      title: 'Product updated successfully!',
      description: `${formProduct.name} was updated.`,
      color: 'success',
      icon: 'i-heroicons-check-circle',
    })

    await router.push('/admin/products') // go back to products list
  } catch (err) {
    toast.add({
      title: 'Update failed',
      description: 'Please check your input and try again.',
      color: 'error',
      icon: 'i-heroicons-exclamation-triangle',
    })
  }
}
</script>

<template>
  <div class="max-w-3xl mx-auto p-8 flex flex-col items-center justify-center">
    <UForm :state="formProduct" @submit="submitUpdate" class="space-y-6 bg-pink-50 pl-20 pr-20 pt-15 pb-20 rounded-2xl shadow">
      <h1 class="text-center text-2xl font-semibold mb-6 text-pink-500">Update Product</h1>

      <UFormField label="Name of Product">
        <UInput v-model="formProduct.name" class="w-full" />
      </UFormField>

      <UFormField label="Description of Product">
        <UTextarea v-model="formProduct.description" class="w-full" />
      </UFormField>

      <UFormField label="Product Attributes">
        <div v-for="(attr, index) in formProduct.productAttributes" :key="index" class="flex gap-4 mb-3 items-center">
          <UInput v-model="attr.name" placeholder="Attribute name" class="w-full" />
          <UInput v-model="attr.value" placeholder="Attribute value" class="w-full" />
          <UButton variant="ghost" @click="removeAttribute(index)" size="sm" class="text-pink-500">✕</UButton>
        </div>
        <UButton color="gray" variant="soft" size="sm" @click="addAttribute">+ Add Attribute</UButton>
      </UFormField>

      <div class="grid grid-cols-2 gap-4">
        <UFormField label="Price">
          <UInputNumber v-model="formProduct.price" class="w-full"
                        :format-options="{style: 'currency',
                                          currency:'LEI',
                                          currencyDisplay: 'code',
                                          currencySign: 'accounting'}"
                        orientation="vertical"/>        </UFormField>

        <UFormField label="Availability Quantity">
          <UInputNumber v-model="formProduct.availabilityQuantity" class="w-full" />
        </UFormField>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <UFormField label="Category">
          <USelect
              v-model="formProduct.categoryId"
              :items="categories.map(cat => ({ label: cat.name, value: cat.id }))"
              placeholder="Select category"
          />
        </UFormField>

        <UFormField label="Added Date">
          <UInput v-model="formProduct.addedDate" type="date" class="w-full" />
        </UFormField>
      </div>

      <UFormField label="Image URLs">
        <div v-for="(url, index) in formProduct.imageUrls" :key="index" class="flex gap-4 mb-3 items-center">
          <UInput v-model="url.imageUrl" class="w-full" />
          <UButton variant="ghost" @click="removeImage(index)" size="sm" class="text-pink-500">✕</UButton>
        </div>
        <UButton color="gray" variant="soft" size="sm" @click="addImage">+ Add Image</UButton>
      </UFormField>

      <div class="flex justify-end">
        <UButton type="submit" class="text-md" size="lg">Update Product</UButton>
      </div>
    </UForm>
  </div>
</template>
