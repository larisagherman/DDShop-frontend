<script setup lang="ts">
definePageMeta({
  // middleware: 'authenticated',
})

// const {loggedIn,clear:clearSession} = useUserSession()
// async function logout() {
//   await clearSession()
//   await navigateTo('/login')
// }
</script>

<template>
  <div v-if="loggedIn">
    <h1>Welcome {{ user.name }}!</h1>

    <button @click="logout">Logout</button>
  </div>
  <div v-else>
    <h1>Not logged in</h1>

  </div>
</template>
