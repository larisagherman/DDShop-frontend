<script setup lang="ts">
definePageMeta({
  middleware: 'order-success'
})
import {useCheckoutStore} from "~/stores/useCheckoutStore";

const checkoutStore = useCheckoutStore()
onMounted(() => {
  console.log(  checkoutStore.formState.billingAddress.city)
})
</script>
<template>
<h1>Order Successfully!</h1>
</template>