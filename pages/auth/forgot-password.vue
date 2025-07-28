<script setup lang="ts">
definePageMeta({
  middleware: 'guest',
})
const {sendResetLink} = useAuth()
const form = reactive({
  email: '',
})
const success = ref(false)
const error = ref('')


</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <UForm :state="form" class="flex flex-col gap-4 max-w-sm" @submit.prevent="sendResetLink(form.email)">
      <h2 class="text-center text-2xl p-4">Forgot Password</h2>

      <UFormField name="email">
        <UInput v-model="form.email" placeholder="Enter your email" class="w-full"/>
      </UFormField>

      <UButton type="submit">Send Reset Link</UButton>

      <p v-if="success" class="text-green-500 text-sm">Check your email for reset instructions.</p>
      <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
    </UForm>
  </div>
</template>
