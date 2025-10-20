<script setup lang="ts">
definePageMeta({
  middleware: 'admin',
})

const { userInfo,getUserInfo, updateUser } = useUser() // assuming you add updateUser in your composable
const route = useRoute()
const router = useRouter()

const toast = useToast()
const userId = Number(route.params.id)

const isLoading = ref(true)

const formUser = reactive({
  id: 0,
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: 0,
  deliveryAddress: {
    id: 0,
    streetLine: '',
    postalCode: 0,
    city: '',
    county: '',
    country: '',
  },
  billingAddress: {
    id: 0,
    streetLine: '',
    postalCode: 0,
    city: '',
    county: '',
    country: '',
  },
  isAdmin: false,
})

onMounted(async () => {
  try {
    await getUserInfo(userId) // fetch user data

    if (userInfo.value) {
      const u = userInfo.value

      // Top-level fields
      formUser.id = u.id
      formUser.firstName = u.firstName
      formUser.lastName = u.lastName
      formUser.email = u.email
      formUser.phoneNumber = u.phoneNumber
      formUser.isAdmin = u.isAdmin ?? false

      // Delivery Address
      formUser.deliveryAddress.id = u.deliveryAddress?.id ?? 0
      formUser.deliveryAddress.streetLine = u.deliveryAddress?.streetLine ?? ''
      formUser.deliveryAddress.postalCode = u.deliveryAddress?.postalCode ?? 0
      formUser.deliveryAddress.city = u.deliveryAddress?.city ?? ''
      formUser.deliveryAddress.county = u.deliveryAddress?.county ?? ''
      formUser.deliveryAddress.country = u.deliveryAddress?.country ?? ''

      // Billing Address
      formUser.billingAddress.id = u.billingAddress?.id ?? 0
      formUser.billingAddress.streetLine = u.billingAddress?.streetLine ?? ''
      formUser.billingAddress.postalCode = u.billingAddress?.postalCode ?? 0
      formUser.billingAddress.city = u.billingAddress?.city ?? ''
      formUser.billingAddress.county = u.billingAddress?.county ?? ''
      formUser.billingAddress.country = u.billingAddress?.country ?? ''
    }
  } catch (err) {
    toast.add({
      title: 'Error loading user',
      description: 'Could not fetch user data.',
      color: 'error',
      icon: 'i-heroicons-exclamation-triangle',
    })
  } finally {
    isLoading.value = false
  }
})


const saveUser = async () => {
  try {
  await updateUser(userId, formUser)

    toast.add({
      title: 'User updated successfully!',
      description: `${formUser.firstName} ${formUser.lastName} was updated.`,
      color: 'success',
      icon: 'i-heroicons-check-circle',
    })
    await router.push('/admin/users/view-users')

  } catch (err) {
    toast.add({
      title: 'Failed to update user',
      description: 'Please check your input and try again.',
      color: 'error',
      icon: 'i-heroicons-exclamation-triangle',
    })
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-8">
    <UCard class="p-8 bg-blue-50 shadow-lg rounded-2xl">
      <div class="flex items-center justify-center gap-2 mb-10">
        <h1 class="text-3xl font-bold text-blue-500 text-center">
          Update User:
        </h1>
        <h1 class="text-2xl font-extrabold text-center ">#{{formUser.id}}</h1>
      </div>


      <div v-if="isLoading" class="text-center text-gray-500 py-10">
        Loading user details...
      </div>

      <UForm v-else :state="formUser" @submit="saveUser" class="space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UFormField label="First Name">
            <UInput v-model="formUser.firstName" placeholder="First Name" />
          </UFormField>

          <UFormField label="Last Name">
            <UInput v-model="formUser.lastName" placeholder="Last Name" />
          </UFormField>

          <UFormField label="Email">
            <UInput v-model="formUser.email" type="email" placeholder="Email" />
          </UFormField>

          <UFormField label="Phone Number">
            <UInput v-model="formUser.phoneNumber" type="number" placeholder="Phone Number" />
          </UFormField>

          <UFormField label="Role">
            <USelect
                v-model="formUser.isAdmin"
                :items="[
                { label: 'Admin', value: true },
                { label: 'User', value: false },
              ]"
                placeholder="Select Role"
            />
          </UFormField>
        </div>

        <!-- 🚚 Delivery Address -->
        <div>
          <h2 class="text-xl font-semibold text-blue-400 mb-3">Delivery Address</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormField label="Street Line">
              <UInput v-model="formUser.deliveryAddress.streetLine" placeholder="123 Main St" />
            </UFormField>
            <UFormField label="Postal Code">
              <UInput v-model="formUser.deliveryAddress.postalCode" type="number" />
            </UFormField>
            <UFormField label="City">
              <UInput v-model="formUser.deliveryAddress.city" />
            </UFormField>
            <UFormField label="County">
              <UInput v-model="formUser.deliveryAddress.county" />
            </UFormField>
            <UFormField label="Country">
              <UInput v-model="formUser.deliveryAddress.country" />
            </UFormField>
          </div>
        </div>

        <!-- 🧾 Billing Address -->
        <div>
          <h2 class="text-xl font-semibold text-blue-400 mb-3">Billing Address</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormField label="Street Line">
              <UInput v-model="formUser.billingAddress.streetLine" placeholder="123 Main St" />
            </UFormField>
            <UFormField label="Postal Code">
              <UInput v-model="formUser.billingAddress.postalCode" type="number" />
            </UFormField>
            <UFormField label="City">
              <UInput v-model="formUser.billingAddress.city" />
            </UFormField>
            <UFormField label="County">
              <UInput v-model="formUser.billingAddress.county" />
            </UFormField>
            <UFormField label="Country">
              <UInput v-model="formUser.billingAddress.country" />
            </UFormField>
          </div>
        </div>

        <div class="flex justify-end p-2">
          <UButton type="submit" size="xl" class="text-lg">
            💾 Save Changes
          </UButton>
        </div>
      </UForm>
    </UCard>
  </div>
</template>
