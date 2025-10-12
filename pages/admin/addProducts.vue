<script setup lang="ts">
definePageMeta(({
  middleware: 'admin',
}))
const {createProduct} = useProduct()
const {categories, getCategories} = useCategory()

onMounted(async () => {
  try{
    await getCategories()
  }catch(error){
    console.log(error)
  }
})

const formProduct = reactive({
  name: '',
  description: '',
  price: 0,
  availabilityQuantity: 0,
  addedDate: new Date().toISOString().slice(0,10),
  categoryId: 0,
  imageUrls: [{
    imageUrl:''
  }],
  productAttributes: [{
    name: '',
    value: ''
  }],
})
const addAttribute=()=>{
  formProduct.productAttributes.push({name:'',value: ''})
}
const removeAttribute=(index:number)=>{
  formProduct.productAttributes.splice(index,1)
}

const addImage=()=>{
  formProduct.imageUrls.push({imageUrl:''})
}
const removeImage=(index:number)=>{
  formProduct.imageUrls.splice(index,1)
}
const successMessage = ref('')
const errorMessage = ref('')

const addProduct = async () => {
  try {
    await createProduct(formProduct)
    successMessage.value = 'Product created successfully!'
    errorMessage.value = ''

    formProduct.name = ''
    formProduct.description = ''
    formProduct.price = 0
    formProduct.availabilityQuantity = 0
    formProduct.addedDate = new Date().toISOString().slice(0,10)
    formProduct.categoryId = 0
    formProduct.imageUrls = [{ imageUrl: '' }]
    formProduct.productAttributes = [{ name: '', value: '' }]

    if (successMessage.value) {
      setTimeout(() => {
        successMessage.value = ''
      }, 5000) // hides after 5 seconds
    }


  } catch (err) {
    errorMessage.value = 'Failed to create product. Please try again.'
    successMessage.value = ''  }
}
</script>

<template>
  <div class="mb-4 w-full max-w-3xl mx-auto">
    <p v-if="successMessage" class="text-green-600 font-medium">{{ successMessage }}</p>
    <p v-if="errorMessage" class="text-red-600 font-medium">{{ errorMessage }}</p>
  </div>
  <div class="max-w-3xl mx-auto p-8 flex flex-col items-center justify-center">
    <UForm :state=formProduct @submit="addProduct" class="space-y-6 bg-pink-50 pl-20 pr-20 pt-15 pb-20 rounded-2xl shadow">
      <h1 class="text-center text-2xl font-semibold mb-6 text-pink-500">Add Product:</h1>

      <UFormField label="Name of Product" >
        <UInput v-model="formProduct.name" placeholder="Lemon Cheesecake" class="w-full"/>
      </UFormField>

      <UFormField label="Description of Product">
        <UTextarea v-model="formProduct.description" placeholder="Description of Product" class="w-full"/>
      </UFormField>

      <div>
        <UFormField label="Product Attributes">
          <div
              v-for="(attr, index) in formProduct.productAttributes"
              :key="index"
              class="flex gap-4 mb-3 items-center"
          >
            <UInput v-model="attr.name" placeholder="Attribute name (e.g. Weight)" class="w-full"/>
            <UInput v-model="attr.value" placeholder="Attribute value (e.g. 5kg)" class="w-full"/>
            <UButton  variant="ghost" @click="removeAttribute(index)" size="sm" class="text-pink-500">
              ✕
            </UButton>
          </div>
          <UButton color="gray" variant="soft" size="sm" @click="addAttribute">
            + Add Attribute
          </UButton>
        </UFormField>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <UFormField label="Price">
          <UInputNumber v-model="formProduct.price" class="w-full"
                        :format-options="{style: 'currency',
                                          currency:'LEI',
                                          currencyDisplay: 'code',
                                          currencySign: 'accounting'}"
                        orientation="vertical"/>
        </UFormField>

        <UFormField label="Availability Quantity">
          <UInputNumber v-model="formProduct.availabilityQuantity" class="w-full"/>
        </UFormField>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <UFormField label="Category ID">
          <USelect
              v-model="formProduct.categoryId"
              :items="categories.map(cat => ({ label: cat.name, value: cat.id }))"
              class="w-full"
              placeholder="Select category"
          />
        </UFormField>


        <UFormField label="Added Date">
          <UInput v-model="formProduct.addedDate" type="date" placeholder="Added Date" class="w-full"/>
        </UFormField>
      </div>

      <div>
        <UFormField label="Image URL">
          <div v-for="(url,index) in formProduct.imageUrls" :key="index" class="flex gap-4 mb-3 items-center">
            <UInput v-model="url.imageUrl" placeholder="https://example.com/image.jpg" class="w-full"/>
            <UButton color="pink" variant="ghost" @click="removeImage(index)" size="sm" class="text-pink-500">
              ✕
            </UButton>
          </div>
          <UButton color="gray" variant="soft" size="sm" @click="addImage" class="text-end">
            + Add Image
          </UButton>
        </UFormField>
      </div>
      <div class="flex justify-end">
        <UButton type="submit" class="text-md" size="lg"> Create Product</UButton>
      </div>
    </UForm>
  </div>

</template>