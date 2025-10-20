<script setup lang="ts">
definePageMeta({
  middleware: 'admin',
})

const { getOrderById, updateOrder} = userOrder()

const route = useRoute()
const router = useRouter()

const toast = useToast()

// 🧾 Reactive form model
const formOrder = reactive({
  orderId: 0,
  userId: 0,
  cartId: 0,
  paymentType: '',
  deliveryAddress: {
    streetLine: '',
    postalCode: 0,
    city: '',
    county: '',
    country: '',
  },
  invoiceAddress: {
    streetLine: '',
    postalCode: 0,
    city: '',
    county: '',
    country: '',
  },
  totalPrice: 0,
  orderDate: '',
  status: '',
})

const isLoading = ref(true)

onMounted(async () => {
  isLoading.value = true
  try {
    const orderId = route.params.id
    const order = await getOrderById(orderId)
    if (order) {
      // Top-level
      formOrder.orderId = order.id
      formOrder.userId = order.userId ?? 0
      formOrder.cartId = order.cartId ?? 0
      formOrder.paymentType = order.paymentType ?? ''
      formOrder.totalPrice = order.totalPrice ?? 0
      formOrder.orderDate = order.orderDate?.slice(0, 10) ?? ''
      formOrder.status = order.status ?? ''

      // Delivery Address
      const d = order.deliveryAddress ?? {}
      formOrder.deliveryAddress.streetLine = d.streetLine ?? ''
      formOrder.deliveryAddress.postalCode = d.postalCode ?? 0
      formOrder.deliveryAddress.city = d.city ?? ''
      formOrder.deliveryAddress.county = d.county ?? ''
      formOrder.deliveryAddress.country = d.country ?? ''

      // Invoice Address
      const i = order.invoiceAddress ?? {}
      formOrder.invoiceAddress.streetLine = i.streetLine ?? ''
      formOrder.invoiceAddress.postalCode = i.postalCode ?? 0
      formOrder.invoiceAddress.city = i.city ?? ''
      formOrder.invoiceAddress.county = i.county ?? ''
      formOrder.invoiceAddress.country = i.country ?? ''
    }
  } catch (err) {
    toast.add({
      title: 'Error loading order',
      description: 'Could not fetch order data.',
      color: 'error',
      icon: 'i-heroicons-exclamation-triangle',
    })
  } finally {
    isLoading.value = false
  }
})


// ✅ Update order
const saveOrder = async () => {
  try {
    const orderId = route.params.id
    await updateOrder(orderId, formOrder)

    toast.add({
      title: 'Order updated successfully!',
      description: `Order #${orderId} has been updated.`,
      color: 'success',
      icon: 'i-heroicons-check-circle',
    })
    await router.push('/admin/orders/view-orders')

  } catch (err) {
    toast.add({
      title: 'Failed to update order',
      description: 'Please check your input and try again.',
      color: 'error',
      icon: 'i-heroicons-exclamation-triangle',
    })
  }
}
</script>
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-8">
    <UCard class="p-8 bg-pink-50 shadow-lg rounded-2xl w-full max-w-3xl">
      <div class="flex items-center justify-center gap-2 mb-2">
        <h1 class="text-center text-2xl font-bold  text-pink-500">
          Update Order:
        </h1>
        <h2 class="text-2xl font-extrabold text-center ">YUM{{ formOrder.orderId }}</h2>
      </div>
      <div v-if="isLoading" class="text-center text-gray-500 py-10">
        Loading order details...
      </div>

      <UForm v-else :state="formOrder" @submit="saveOrder" class="space-y-8 mx-auto max-w-xl">
        <div class="text-center">
          <h1 class="text-xl font-bold text-center text-gray-600">User ID: #{{ formOrder.userId }}</h1>
        </div>

        <div class="grid grid-cols-2 gap-6">

          <UFormField label="Payment Type">
            <USelect
                v-model="formOrder.paymentType"
                :items="[
                { label: 'Credit Card', value: 'credit_card' },
                { label: 'Cash on Delivery', value: 'cash_on_delivery' },
                { label: 'PayPal', value: 'paypal' }
              ]"
                placeholder="Select Payment Type"
            />
          </UFormField>

          <UFormField label="Status">
            <USelect
                v-model="formOrder.status"
                :items="[
                { label: 'Pending', value: 'pending' },
                { label: 'Shipped', value: 'shipped' },
                { label: 'Delivered', value: 'delivered' },
                { label: 'Cancelled', value: 'cancelled' }
              ]"
                placeholder="Select Order Status"
            />
          </UFormField>

          <UFormField label="Total Price">
            <UInputNumber
                v-model="formOrder.totalPrice"
                :min="0"
                :format-options="{ style: 'currency', currency: 'LEI' }"
            />
          </UFormField>

          <UFormField label="Order Date">
            <UInput v-model="formOrder.orderDate" type="date"/>
          </UFormField>
        </div>

        <!-- 🚚 Delivery & Invoice Address -->
        <div class="grid grid-cols-2 gap-6">
          <div class="grid grid-cols-1 gap-4">
            <h2 class="text-xl font-bold text-pink-400 mb-3 text-start">Delivery Address</h2>
            <UFormField label="Street Line">
              <UInput v-model="formOrder.deliveryAddress.streetLine"/>
            </UFormField>
            <UFormField label="Postal Code">
              <UInput v-model="formOrder.deliveryAddress.postalCode" type="number"/>
            </UFormField>
            <UFormField label="City">
              <UInput v-model="formOrder.deliveryAddress.city"/>
            </UFormField>
            <UFormField label="County">
              <UInput v-model="formOrder.deliveryAddress.county"/>
            </UFormField>
            <UFormField label="Country">
              <UInput v-model="formOrder.deliveryAddress.country"/>
            </UFormField>
          </div>

          <div class="grid grid-cols-1 gap-4">
            <h2 class="text-xl font-bold text-pink-400  ">Invoice Address</h2>

            <UFormField label="Street Line">
              <UInput v-model="formOrder.invoiceAddress.streetLine"/>
            </UFormField>
            <UFormField label="Postal Code">
              <UInput v-model="formOrder.invoiceAddress.postalCode" type="number"/>
            </UFormField>
            <UFormField label="City">
              <UInput v-model="formOrder.invoiceAddress.city"/>
            </UFormField>
            <UFormField label="County">
              <UInput v-model="formOrder.invoiceAddress.county"/>
            </UFormField>
            <UFormField label="Country">
              <UInput v-model="formOrder.invoiceAddress.country"/>
            </UFormField>
          </div>
        </div>

        <div class="flex justify-center">
          <UButton type="submit" size="xl" class="text-lg">
            💾 Save Changes
          </UButton>
        </div>
      </UForm>
    </UCard>
  </div>
</template>
