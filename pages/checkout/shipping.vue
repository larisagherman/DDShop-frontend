<script setup lang="ts">
import CheckoutStepper from "~/components/cart/CheckoutStepper.vue";
</script>

<template>
  <h1>Select Address</h1>
  <CheckoutStepper/>
  <UCard>
    <UForm>
      <UFormField class="flex-1">
        <UInput required class="w-full"  placeholder="" :ui="{ base: 'peer' }">
          <label
              class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
            <span class="inline-flex bg-default px-1">Address</span>
          </label>
        </UInput>
      </UFormField>
    </UForm>
  </UCard>
</template>
