<script setup lang="ts">
definePageMeta({
  middleware: 'admin',
})
const route = useRoute()
const router = useRouter()

const {allUsers, getAllUserInfo, deleteUser} = useUser()
onMounted(() => {
  getAllUserInfo()
})


const handleDelete = async (id: number) => {
  try {
    await deleteUser(id)
    alert('User was deleted!')
    await getAllUserInfo()
  } catch (error) {
    alert(error)
  }
}
</script>

<template>
  <div class="p-6 bg-blue-50 min-h-screen">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">👥 All Users</h1>

    <div v-if="!allUsers.length" class="text-gray-500 text-center py-10 ">
      No users found 🧑‍🍳
    </div>

    <div
        v-else
        class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <UCard
          v-for="user in allUsers"
          :key="user.id"
          class="rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 bg-white"
      >
        <div class="flex flex-col justify-between h-full p-2">
          <!-- Header -->
          <div class="mb-4">
            <div class="flex items-center justify-between mb-8">
              <div>
                <h2 class="text-2xl font-bold text-blue-600">
                  {{ user.firstName }} {{ user.lastName }}
                  <span class="ml-2 text-sm text-gray-400 font-normal">#{{ user.id }}</span>
                </h2>
                <p class="text-sm text-blue-400">{{ user.email }}</p>
              </div>
              <UBadge
                  variant="soft"
                  :class="user.isAdmin === true
    ? 'bg-green-100 text-green-800 border border-green-300'
    : user.isAdmin === false
      ? 'bg-gray-100 text-gray-800 border border-gray-300'
      : 'bg-yellow-100 text-yellow-800 border border-yellow-300'"
              >
                {{ user.isAdmin === true ? 'Admin' : user.isAdmin === false ? 'User' : 'Unknown' }}
              </UBadge>

            </div>

            <p class="text-sm text-gray-600">
              <span class="font-bold">Phone:</span> {{ user.phoneNumber }}
            </p>

            <!-- Addresses -->
            <div class="mt-3">
              <p class="font-bold text-sm text-gray-700">Delivery Address:</p>
              <p class="text-sm text-gray-600">
                {{ user.deliveryAddress.streetLine }}, {{ user.deliveryAddress.city }},
                {{ user.deliveryAddress.country }}
              </p>
            </div>

            <div class="mt-3">
              <p class="font-bold text-sm text-gray-700">Billing Address:</p>
              <p class="text-sm text-gray-600">
                {{ user.billingAddress.streetLine }}, {{ user.billingAddress.city }},
                {{ user.billingAddress.country }}
              </p>
            </div>
          </div>

          <!-- Footer Buttons -->
          <div class="flex justify-between mt-4">
            <UButton
                @click="router.push(`/admin/users/update-user/${user.id}`)"
                color="blue"
                variant="soft"
                size="sm"
                icon="i-lucide-pencil"
                class="hover:bg-blue-600 hover:text-white transition"
            >
              Update
            </UButton>
            <UButton
                @click="handleDelete(user.id)"
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
