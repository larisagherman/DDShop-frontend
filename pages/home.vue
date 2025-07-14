<script setup lang="ts">

definePageMeta({
  // middleware: 'auth',
})
const {user,isAuthenticated} = useAuth()
const firstName = computed(() => user.value?.firstName)

</script>

<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <div v-if="isAuthenticated">
      <h1 class="text-center">Welcome {{ firstName}}! Fancy a sweet treat?</h1>
    </div>
    <div v-else>
      <h1>Not logged in</h1>
    </div>
  </div>
</template>
