<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})
import { ref } from 'vue'

let count =0

console.log(count.value) // 0

count.value++            // increment the value

console.log(count.value) // 1

</script>
<template>
<h1> some page</h1>


</template>