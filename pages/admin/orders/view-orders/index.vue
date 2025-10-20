<script setup lang="ts">
definePageMeta({
  middleware: 'admin',
})

const route = useRoute()
const router = useRouter()

const { allOrders, getAllOrders,deleteOrder } = userOrder()

onMounted(() => {
  getAllOrders()
})
const handleDelete=async()=>{
  try{
    await deleteOrder()
    alert('Order was deleted!')
    await getAllOrders()
  }
  catch (error){
    alert(error)
  }
}

</script>

<template>
  <div class="p-6 bg-pink-50 min-h-screen">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">🧁 All Orders</h1>

    <div v-if="!allOrders.length" class="text-gray-500 text-center py-10">
      No orders yet 🍪
    </div>

    <div
        v-else
        class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <UCard
          v-for="order in allOrders"
          :key="order.id"
          class="rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 bg-white"
      >
        <div class="flex flex-col justify-between h-full">
          <!-- Header -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <h2 class="text-lg font-semibold text-pink-600">
                Order #YUM{{ order.id }}
              </h2>
              <UBadge
                  variant="soft"
                  class="uppercase text-xs tracking-wider px-2 py-1 font-medium rounded-md"
                  :class="{
    'bg-yellow-100 text-yellow-800 border border-yellow-300': order.status?.toLowerCase() === 'pending',
    'bg-green-100 text-green-800 border border-green-300': order.status?.toLowerCase() === 'completed',
    'bg-red-100 text-red-800 border border-red-300': order.status?.toLowerCase() === 'cancelled',
    'bg-gray-100 text-gray-800 border border-gray-300': !order.status
  }"
              >
                {{ order.status || 'Pending' }}
              </UBadge>

            </div>

            <p class="text-sm text-gray-600">
              <span class="font-medium">User ID:</span> {{ order.userId }}
            </p>
            <p class="text-sm text-gray-600">
              <span class="font-medium">Date:</span>
              {{ new Date(order.orderDate).toLocaleDateString() }}
            </p>
            <p class="text-sm text-gray-600">
              <span class="font-medium">Total:</span> {{ order.totalPrice }} LEI
            </p>
          </div>

          <!-- Footer -->
          <div class="flex justify-between mt-4">
            <UButton
                @click="router.push(`/admin/orders/update-order/${order.id}`)"
                color="red"
                variant="soft"
                size="sm"
                icon="i-lucide-pencil"
                class="hover:bg-blue-600 hover:text-white transition"
            >
              Update
            </UButton>
            <UButton
                @click="handleDelete"
                color="red"
                variant="soft"
                size="sm"
                icon="i-lucide-trash"
                class="hover:bg-red-600 hover:text-white transition"
            >
              Delete
            </UButton>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
