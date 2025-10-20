<script setup lang="ts">
definePageMeta({
  middleware: 'guest',//only guests are allowed to access this page
})
const {login} = useAuth()

const formState = reactive({
  email: '',
  password: '',
})
const error = ref('')
const show = ref(false)

const doLogin = async () => {
  try {
    await login(formState.email, formState.password)
  } catch (err) {
    error.value = err
  }
}
</script>


<template>
  <div class="flex items-center justify-center ">
    <div class="flex flex-col items-center gap-2">
      <NuxtLink to="/">
        <img src="/logo.png" alt="Logo" class="h-30 w-auto mb-2 "/>
      </NuxtLink>
      <p class="text-center text-lg text-gray-700 italic">Life’s too short to skip dessert <br> explore your favorites and treat yourself anytime.</p>
      <UForm :state="formState" class="flex flex-col gap-4 max-w-lg ">
        <h2 class="text-center text-3xl p-4">LOGIN</h2>
        <UFormField name="email" size="xl" >
          <UInput trailing-icon="i-lucide-at-sign" v-model="formState.email" placeholder="" :ui="{ base: 'peer' }">
            <label
                class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
              <span class="inline-flex bg-default px-1">Email address</span>
            </label>
          </UInput>
        </UFormField>
        <UFormField name="password">
          <UInput
              size="xl"
              v-model="formState.password"
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
        </UFormField>
        <div class="flex items-center justify-center text-sm">
          <NuxtLink to="/auth/forgot-password" class="underline font-bold" > Forgot password?</NuxtLink>
        </div>
        <UButton @click="doLogin" size="xl" class="text-center text-lg font-bold cursor-pointer">LOG IN</UButton>
        <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>
        <div class="text-sm inline-flex flex items-center justify-center">
          <p> Don't have an account?</p>
          <NuxtLink to="/auth/register" class="underline font-bold ml-2">Sign up</NuxtLink>
        </div>


      </UForm>
    </div>

  </div>
</template>
<style>
/* Hide the password reveal button in Edge */
::-ms-reveal {
  display: none;
}
</style>