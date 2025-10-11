<script setup lang="ts">
definePageMeta({
  middleware: 'admin',
})

const { createProduct } = useProduct()

const formProduct = reactive({
  name: '',
  description: '',
  price: 0,
  availabilityQuantity: 0,
  addedDate: new Date().toISOString().slice(0, 10), // just the date
  categoryId: 0,
  imageUrls: [''],
  productAttributes: [
    { name: '', value: '' },
  ],
})

const addAttribute = () => {
  formProduct.productAttributes.push({ name: '', value: '' })
}

const removeAttribute = (index: number) => {
  formProduct.productAttributes.splice(index, 1)
}

const addProduct = async () => {
  try {
    await createProduct(formProduct)
  } catch (err) {
    console.error(err)
  }
}
const value = ref(1500)

</script>

<template>
  <UInputNumber
      v-model="value"
      :format-options="{
      style: 'currency',
      currency: 'EUR',
      currencyDisplay: 'code',
      currencySign: 'accounting'
    }"
  />
  <div class="max-w-3xl mx-auto p-8">
    <h1 class="text-2xl font-semibold mb-6">Add a Product</h1>

    <UForm @submit="addProduct" class="space-y-6">

      <!-- Product Name -->
      <UFormField label="Product Name">
        <UInput v-model="formProduct.name" placeholder="Lemon Cheesecake" />
      </UFormField>

      <!-- Description -->
      <UFormField label="Description">
        <UTextarea v-model="formProduct.description" placeholder="Describe the product..." />
      </UFormField>

      <!-- Price & Quantity -->
      <div class="grid grid-cols-2 gap-6">
        <UFormField label="Price (LEI)">
          <UInput v-model="formProduct.price" type="number" placeholder="25" />
        </UFormField>

        <UFormField label="Available Qty">
          <UInput v-model="formProduct.availabilityQuantity" type="number" placeholder="200" />
        </UFormField>
      </div>

      <!-- Category & Added Date -->
      <div class="grid grid-cols-2 gap-6">
        <UFormField label="Category ID">
          <UInput v-model="formProduct.categoryId" type="number" placeholder="1" />
        </UFormField>

        <UFormField label="Added Date">
          <UInput v-model="formProduct.addedDate" type="date" />
        </UFormField>
      </div>

      <!-- Product Attributes -->
      <div>
        <label class="block font-medium mb-2">Product Attributes</label>
        <div
            v-for="(attr, index) in formProduct.productAttributes"
            :key="index"
            class="flex gap-4 mb-3 items-center"
        >
          <UInput v-model="attr.name" placeholder="Attribute name (e.g. Color)" />
          <UInput v-model="attr.value" placeholder="Attribute value (e.g. Red)" />
          <UButton color="red" variant="ghost" @click="removeAttribute(index)" size="sm">
            ✕
          </UButton>
        </div>
        <UButton color="gray" variant="soft" size="sm" @click="addAttribute">
          + Add Attribute
        </UButton>
      </div>

      <!-- Image URLs -->
      <UFormField label="Image URL">
        <UInput
            v-for="(url, index) in formProduct.imageUrls"
            :key="index"
            v-model="formProduct.imageUrls[index]"
            placeholder="https://example.com/image.jpg"
            class="mb-2"
        />
      </UFormField>

      <!-- Submit -->
      <div class="flex justify-end pt-4">
        <UButton type="submit" color="blue">Add Product</UButton>
      </div>
    </UForm>
  </div>
</template>
