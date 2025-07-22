<script setup lang="ts">
import CheckoutStepper from "~/components/cart/CheckoutStepper.vue";
</script>
<template>
  <div class="min-h-screen bg-white p-6 transition-all duration-300">
    <CheckoutStepper>
      <NuxtPage/>
    </CheckoutStepper>
  </div>
</template>

