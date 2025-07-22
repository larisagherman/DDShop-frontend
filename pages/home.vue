<script setup lang="ts">

const {user,isAuthenticated,loading} = useAuth()

const firstName = computed(() => user.value?.firstName)
// console.log('home user id',userId)
</script>

<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <div v-if="isAuthenticated &&!loading">
      <h1 class="text-center">Welcome {{ firstName}}! Fancy a sweet treat?</h1>
    </div>
    <div v-else>
      <h1>Not logged in</h1>
    </div>
  </div>
</template>
