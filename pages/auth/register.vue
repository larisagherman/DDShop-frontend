<script setup lang="ts">
definePageMeta({
  middleware: 'guest',
})

const {register} = useRegister()
const show = ref(false)
const error = ref('')

const formState = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
  deliveryAddress: {
    streetLine: '',
    postalCode: '',
    city: '',
    county: '',
    country: ''
  },
  billingAddress: {
    streetLine: '',
    postalCode: '',
    city: '',
    county: '',
    country: ''
  }

})
const submitRegister = async () => {
  try {
    await register(formState)
  } catch (err) {
    error.value = err
  }
}


const useSameAddress = ref(false)

watch(useSameAddress, (newVal) => {
  if (newVal) {
    formState.billingAddress = {...formState.deliveryAddress}
  }
})


</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <UForm :state="formState" class="flex flex-col gap-4" @submit.prevent="submitRegister">
      <h2 class="text-center text-2xl p-4">REGISTER</h2>
      <div class="inline-flex items-center justify-center gap-x-2 ">
        <UFormField class="flex-1">
          <UInput required class="w-full" v-model="formState.firstName" placeholder="" :ui="{ base: 'peer' }">
            <label
                class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
              <span class="inline-flex bg-default px-1">First Name</span>
            </label>
          </UInput>
        </UFormField>
        <UFormField class="flex-1">
          <UInput required class="w-full" v-model="formState.lastName" placeholder="" :ui="{ base: 'peer' }">
            <label
                class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
              <span class="inline-flex bg-default px-1">Last Name</span>
            </label>
          </UInput>
        </UFormField>
      </div>
      <div class="inline-flex items-center justify-center gap-x-2">
        <UFormField class="flex-1">
          <UInput required trailing-icon="i-lucide-at-sign" v-model="formState.email" placeholder=""
                  :ui="{ base: 'peer' }">
            <label
                class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
              <span class="inline-flex bg-default px-1">Email address</span>
            </label>
          </UInput>
        </UFormField>
        <UFormField class="flex-1">
          <UInput required class="w-full" v-model="formState.phoneNumber" placeholder="" :ui="{ base: 'peer' }"
                  type="number">
            <label
                class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
              <span class="inline-flex bg-default px-1">Phone Number</span>
            </label>
          </UInput>
        </UFormField>
      </div>
      <div class="inline-flex items-center justify-center gap-x-2">
        <UFormField class="flex-1">
          <UInput
              required
              class="w-full"
              v-model="formState.password"
              placeholder="Password"
              :type="show ? 'text' : 'password'"
              :ui="{ trailing: 'pe-1' }"
          >
            <template #trailing>
              <UButton
                  color="neutral"
                  variant="link"
                  size="sm"
                  :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  :aria-label="show ? 'Hide password' : 'Show password'"
                  :aria-pressed="show"
                  aria-controls="password"
                  @click="show = !show"
              />
            </template>
          </UInput>
        </UFormField>
        <UFormField class="flex-1">
          <UInput
              required
              v-model="formState.confirmPassword"
              placeholder="Re-enter password"
              :type="show ? 'text' : 'password'"
              :ui="{ trailing: 'pe-1' }"
          >
            <template #trailing>
              <UButton
                  color="neutral"
                  variant="link"
                  size="sm"
                  :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  :aria-label="show ? 'Hide password' : 'Show password'"
                  :aria-pressed="show"
                  aria-controls="password"
                  @click="show = !show"
              />
            </template>
          </UInput>
        </UFormField>
      </div>
      <div class="flex-1 flex flex-col gap-2">
        <h3>Delivery Address</h3>
        <div class="grid grid-cols-2 gap-2">
          <UFormField>
            <UInput class="w-full" required v-model="formState.deliveryAddress.streetLine" placeholder=""
                    :ui="{ base: 'peer'}">
              <label
                  class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
                <span class="inline-flex bg-default px-1">Street Line</span>
              </label>
            </UInput>
          </UFormField>
          <UFormField>
            <UInput class="w-full" required v-model="formState.deliveryAddress.postalCode" placeholder=""
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
            <UInput class="w-full" required v-model="formState.deliveryAddress.city" placeholder=""
                    :ui="{ base: 'peer' }">
              <label
                  class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
                <span class="inline-flex bg-default px-1">City</span>
              </label>
            </UInput>
          </UFormField>
          <UFormField>
            <UInput class="w-full" required v-model="formState.deliveryAddress.county" placeholder=""
                    :ui="{ base: 'peer' }">
              <label
                  class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
                <span class="inline-flex bg-default px-1">County</span>
              </label>
            </UInput>
          </UFormField>
        </div>
        <UFormField>
          <UInput class="w-full" required v-model="formState.deliveryAddress.country" placeholder=""
                  :ui="{ base: 'peer' }">
            <label
                class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
              <span class="inline-flex bg-default px-1">Country</span>
            </label>
          </UInput>
        </UFormField>

        <div class="flex-1 flex flex-col gap-2">
          <div>
            <UCheckbox label="Same as Delivery Address" v-model="useSameAddress"/>
          </div>
          <h3>Billing Address</h3>
          <div class="grid grid-cols-2 gap-2">

            <UFormField>
              <UInput class="w-full" required v-model="formState.billingAddress.streetLine" placeholder=""
                      :ui="{ base: 'peer' }">
                <label
                    class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
                  <span class="inline-flex bg-default px-1">Street Line</span>
                </label>
              </UInput>
            </UFormField>
            <UFormField>
              <UInput class="w-full" required v-model="formState.billingAddress.postalCode" placeholder=""
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
              <UInput class="w-full" required v-model="formState.billingAddress.city" placeholder=""
                      :ui="{ base: 'peer' }">
                <label
                    class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
                  <span class="inline-flex bg-default px-1">City</span>
                </label>
              </UInput>
            </UFormField>
            <UFormField>
              <UInput class="w-full" required v-model="formState.billingAddress.county" placeholder=""
                      :ui="{ base: 'peer' }">
                <label
                    class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
                  <span class="inline-flex bg-default px-1">County</span>
                </label>
              </UInput>
            </UFormField>
          </div>
          <UFormField>
            <UInput class="w-full" required v-model="formState.billingAddress.country" placeholder=""
                    :ui="{ base: 'peer' }">
              <label
                  class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
                <span class="inline-flex bg-default px-1">Country </span>
              </label>
            </UInput>
          </UFormField>
        </div>
      </div>
      <UButton type="submit">SIGN UP</UButton>
      <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>
      <div class="text-sm inline-flex flex items-center justify-center">
        <p> Already have an account? </p>
        <NuxtLink to="/auth/login" class="underline font-bold ml-2">Log in</NuxtLink>
      </div>
    </UForm>
  </div>
</template>
<style>
/* Hide the password reveal button in Edge */
::-ms-reveal {
  display: none;
}
</style>