<script setup lang="ts">
import { useCheckoutStore } from '~/stores/useCheckoutStore'

definePageMeta({
  layout: 'checkout',
  middleware: '',
})

const {user,userId}=useAuth()
const checkoutStore=useCheckoutStore()
onMounted(async () => {
  console.log('User delivery address:', user.value?.deliveryAddress)

  if(user.value){
    checkoutStore.formState.firstName = user.value.firstName || ''
    checkoutStore.formState.lastName = user.value.lastName || ''
    checkoutStore.formState.email = user.value.email || ''
    checkoutStore.formState.phoneNumber = user.value.phoneNumber || ''

    // If your user object has an address, prefill delivery address
    if (user.value.deliveryAddress) {
      checkoutStore.formState.deliveryAddress ={...user.value.deliveryAddress}
      }
  }
  console.log('User delivery address store:', checkoutStore.formState.deliveryAddress)
  console.log('User delivery address store:', checkoutStore.formState.useSameAddress)

})
</script>


<template>
  <h1 class="text-xl text-center">SHIPPING INFO</h1>
  <div class="flex items-center justify-center mb-4">
    <UForm :state="checkoutStore.formState" class="flex flex-col gap-2 ">
      <h3 class="mt-4 font-medium">Personal Details</h3>
      <div class="inline-flex items-center justify-center gap-x-2 ">
        <UFormField class="flex-1">
          <UInput required class="w-full" v-model="checkoutStore.formState.firstName" placeholder="" :ui="{ base: 'peer' }">
            <label
                class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
              <span class="inline-flex bg-default px-1">First Name</span>
            </label>
          </UInput>
        </UFormField>
        <UFormField class="flex-1">
          <UInput required class="w-full" v-model="checkoutStore.formState.lastName" placeholder="" :ui="{ base: 'peer' }">
            <label
                class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
              <span class="inline-flex bg-default px-1">Last Name</span>
            </label>
          </UInput>
        </UFormField>
      </div>
      <div class="inline-flex items-center justify-center gap-x-2">
        <UFormField class="flex-1">
          <UInput required class="w-full" v-model="checkoutStore.formState.phoneNumber" placeholder="" :ui="{ base: 'peer' }"
                  type="number">
            <label
                class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
              <span class="inline-flex bg-default px-1">Phone Number</span>
            </label>
          </UInput>
        </UFormField>
      </div>
      <div class="flex-1 flex flex-col gap-2 mt-2">
        <h3 class="font-medium">Delivery Address</h3>
        <div class="grid grid-cols-2 gap-2">
          <UFormField>
            <UInput class="w-full" required v-model="checkoutStore.formState.deliveryAddress.streetLine" placeholder=""
                    :ui="{ base: 'peer'}">
              <label
                  class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
                <span class="inline-flex bg-default px-1">Street Line</span>
              </label>
            </UInput>
          </UFormField>
          <UFormField>
            <UInput class="w-full" required v-model="checkoutStore.formState.deliveryAddress.postalCode" placeholder=""
                    :ui="{ base: 'peer' }"
                    type="number">
              <label
                  class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
                <span class="inline-flex bg-default px-1">Postal Code</span>
              </label>
            </UInput>
          </UFormField>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <UFormField>
            <UInput class="w-full" required v-model="checkoutStore.formState.deliveryAddress.city" placeholder=""
                    :ui="{ base: 'peer' }">
              <label
                  class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
                <span class="inline-flex bg-default px-1">City</span>
              </label>
            </UInput>
          </UFormField>
          <UFormField>
            <UInput class="w-full" required v-model="checkoutStore.formState.deliveryAddress.county" placeholder=""
                    :ui="{ base: 'peer' }">
              <label
                  class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
                <span class="inline-flex bg-default px-1">County</span>
              </label>
            </UInput>
          </UFormField>
        </div>
        <UFormField>
          <UInput class="w-full" required v-model="checkoutStore.formState.deliveryAddress.country" placeholder=""
                  :ui="{ base: 'peer' }">
            <label
                class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
              <span class="inline-flex bg-default px-1">Country</span>
            </label>
          </UInput>
        </UFormField>


      </div>
    </UForm>
  </div>
</template>
