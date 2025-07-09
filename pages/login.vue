<script setup lang="ts">

definePageMeta({
  middleware: 'auth',
})
const show = ref(false)
const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const { loggedIn, user, fetch: refreshSession } = useUserSession()

const login = async () => {
  try {
    const response = await $fetch('http://localhost:8090/api/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value
      }
    })

    console.log('Login success', response)
    await router.push('/home') // or home page
  } catch (err: any) {
    console.error(err)
    error.value = err.data || 'Login failed'
  }
}

</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="flex flex-col gap-4 max-w-sm ">
      <h2 class="text-center">Login</h2>

      <UInput trailing-icon="i-lucide-at-sign" v-model="email" placeholder="" :ui="{ base: 'peer' }">
        <label
            class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
          <span class="inline-flex bg-default px-1">Email address</span>
        </label>
      </UInput>
      <UInput
          v-model="password"
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
      <UButton class="w-full justify-center" @click="login">Submit</UButton>
      <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>

    </div>
  </div>
</template>
<style>
/* Hide the password reveal button in Edge */
::-ms-reveal {
  display: none;
}
</style>