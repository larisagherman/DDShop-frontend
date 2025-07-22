<script setup lang="ts">
definePageMeta({
  layout: 'checkout'
})
import { vMaska } from 'maska/vue'

import {useCheckoutStore} from "~/stores/useCheckoutStore";

const checkoutStore = useCheckoutStore()

onMounted(() => {
  // If the delivery address was already filled in the shipping page,
  //  and the user checked "Same as delivery address", copy it over.
  if (checkoutStore.formState.useSameAddress) {
    checkoutStore.formState.billingAddress = { ...checkoutStore.formState.deliveryAddress }
  }
})
watch(() => checkoutStore.formState.useSameAddress, (value) => {
  if (value) {
    checkoutStore.formState.billingAddress = { ...checkoutStore.formState.deliveryAddress }
  }
}, { immediate: true })


</script>

<template>
  <h1 class="text-xl text-center mb-4">BILLING INFO</h1>

  <div class="flex items-center justify-center mb-4">
    <UForm :state="checkoutStore.formState" class="flex flex-col gap-6 w-full max-w-3xl">

      <!-- Payment method selection -->
      <div class="flex gap-4">
        <div
            class="cursor-pointer border rounded-xl p-4 w-full text-center hover:border-pink-300 transition-all"
            :class="{ 'border-pink-400': checkoutStore.formState.paymentType === 'cash_on_delivery' }"
            @click="checkoutStore.formState.paymentType = 'cash_on_delivery'"
        >
          <h3 class="font-semibold">Cash on Delivery</h3>
        </div>

        <div
            class="cursor-pointer border rounded-xl p-4 w-full text-center hover:border-pink-300 transition-all"
            :class="{ 'border-pink-400': checkoutStore.formState.paymentType === 'credit_card' }"
            @click="checkoutStore.formState.paymentType = 'credit_card'"
        >
          <h3 class="font-semibold">Credit Card</h3>
        </div>
      </div>
      <!-- Credit card form -->
      <div v-if="checkoutStore.formState.paymentType === 'credit_card'" class="w-full max-w-3xl flex flex-col gap-2">
        <h3 class="text-base font-medium mt-2">Credit Card Info</h3>
        <div class="flex flex-col gap-2">
          <!-- Card Number -->
          <UFormField>
            <UInput
                v-maska="'#### #### #### ####'"
                v-model="checkoutStore.formState.cardNumber"
                placeholder="4242 4242 4242 4242"
                icon="i-lucide-credit-card"
                class="w-full"
            />
          </UFormField>

          <!-- Expiry + CVC -->
          <div class="grid grid-cols-2 gap-4">
            <UFormField>
              <UInput
                  v-maska="'##/##'"
                  v-model="checkoutStore.formState.expiryDate"
                  placeholder="MM/YY"
                  icon="i-lucide-calendar"
                  class="w-full"
              />
            </UFormField>
            <UFormField>
              <UInput
                  v-maska="'###'"
                  v-model="checkoutStore.formState.cvv"
                  placeholder="CVC"
                  class="w-full"
              />
            </UFormField>
          </div>
        </div>

        <!-- Billing Address -->
        <div class="flex flex-col gap-2 mt-2">
          <div class="flex justify-between items-center">
            <h3 class="text-base font-medium">Billing Address</h3>
            <UCheckbox label="Same as Delivery Address" v-model="checkoutStore.formState.useSameAddress"/>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <UFormField>
              <UInput required v-model="checkoutStore.formState.billingAddress.streetLine" placeholder=""
                      class="w-full" :ui="{ base: 'peer' }" :disabled="checkoutStore.formState.useSameAddress"
              >
                <label
                    class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all
                         peer-focus:-top-2.5 peer-focus:text-highlighted peer-placeholder-shown:top-1.5 peer-placeholder-shown:text-sm
                         peer-placeholder-shown:text-dimmed peer-placeholder-shown:font-normal">
                  <span class="inline-flex bg-default px-1">Street Line</span>
                </label>
              </UInput>
            </UFormField>

            <UFormField>
              <UInput required v-model="checkoutStore.formState.billingAddress.postalCode" type="number" placeholder=""
                      class="w-full" :ui="{ base: 'peer' }" :disabled="checkoutStore.formState.useSameAddress"
              >
                <label
                    class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all
                         peer-focus:-top-2.5 peer-focus:text-highlighted peer-placeholder-shown:top-1.5 peer-placeholder-shown:text-sm
                         peer-placeholder-shown:text-dimmed peer-placeholder-shown:font-normal">
                  <span class="inline-flex bg-default px-1">Postal Code</span>
                </label>
              </UInput>
            </UFormField>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <UFormField>
              <UInput required v-model="checkoutStore.formState.billingAddress.city" placeholder=""
                      class="w-full" :ui="{ base: 'peer' }" :disabled="checkoutStore.formState.useSameAddress"
              >
                <label
                    class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all
                         peer-focus:-top-2.5 peer-focus:text-highlighted peer-placeholder-shown:top-1.5 peer-placeholder-shown:text-sm
                         peer-placeholder-shown:text-dimmed peer-placeholder-shown:font-normal">
                  <span class="inline-flex bg-default px-1">City</span>
                </label>
              </UInput>
            </UFormField>

            <UFormField>
              <UInput required v-model="checkoutStore.formState.billingAddress.county" placeholder=""
                      class="w-full" :ui="{ base: 'peer' }" :disabled="checkoutStore.formState.useSameAddress"
              >
                <label
                    class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all
                         peer-focus:-top-2.5 peer-focus:text-highlighted peer-placeholder-shown:top-1.5 peer-placeholder-shown:text-sm
                         peer-placeholder-shown:text-dimmed peer-placeholder-shown:font-normal">
                  <span class="inline-flex bg-default px-1">County</span>
                </label>
              </UInput>
            </UFormField>
          </div>

          <UFormField>
            <UInput required v-model="checkoutStore.formState.billingAddress.country" placeholder=""
                    class="w-full" :ui="{ base: 'peer' }" :disabled="checkoutStore.formState.useSameAddress"
            >
              <label
                  class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all
                       peer-focus:-top-2.5 peer-focus:text-highlighted peer-placeholder-shown:top-1.5 peer-placeholder-shown:text-sm
                       peer-placeholder-shown:text-dimmed peer-placeholder-shown:font-normal">
                <span class="inline-flex bg-default px-1">Country</span>
              </label>
            </UInput>
          </UFormField>
        </div>
      </div>
    </UForm>
  </div>
</template>
