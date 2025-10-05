<script setup lang="ts">
// definePageMeta({
//   middleware: 'order-success'
// })
import {useCheckoutStore} from "~/stores/useCheckoutStore";

const checkoutStore = useCheckoutStore()
onMounted(() => {
  console.log(  checkoutStore.formState.billingAddress.city)
})
</script>
<template>
  <div class="h-screen p-20">
    <div class="flex flex-col justify-center items-center gap-2">
      <h1 class="text-4xl ">Thank you!</h1>
      <p class="text-2xl mb-2">Your treats are in the oven.</p>
      <img src="public/img/bakingSoon.png" alt="bakingSoon" class="rounded-lg w-[700px] h-[700px]" />
    </div>
  </div>
</template>