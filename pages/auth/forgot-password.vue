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
  <div class="flex justify-center items-center">
    <UForm :state="form"  class="flex flex-col gap-6 px-6" @submit.prevent="sendResetLink(form.email)">
      <h2 class="text-center text-3xl p-4">Forgott Password</h2>

      <UFormField name="email">
        <UInput size="xl" v-model="form.email" placeholder="Enter your email" class="w-full"/>
      </UFormField>

      <UButton type="submit" class="text-center text-lg font-bold p-2">Send Reset Link</UButton>

      <p v-if="success" class="text-green-500 text-sm">Check your email for reset instructions.</p>
      <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
    </UForm>
  </div>
</template>
