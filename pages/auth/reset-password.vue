<script setup lang="ts">
definePageMeta({
  middleware: 'guest',
})
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const token = route.query.token as string || ''
const newPassword = ref('')
const confirmPassword = ref('')
const error = ref('')
const success = ref('')

const resetPassword = async () => {
  if (!newPassword.value || !confirmPassword.value) {
    error.value = 'All fields are required'
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
  }

  try {
    await $fetch('http://localhost:8099/api/reset-password', {
      method: 'POST',
      body: {
        token,
        newPassword: newPassword.value,
      },
    })
    success.value = 'Password successfully reset! Redirecting...'
    error.value = ''
    setTimeout(() => router.push('/auth/login'), 2000)
  } catch (err: any) {
    error.value = err?.data?.message || 'Something went wrong'
  }
}
</script>

<template>
  <div class="max-w-md mx-auto p-6">
    <h2 class="text-2xl font-semibold mb-4 text-center">Reset Password</h2>

    <UForm class="space-y-4">
      <UFormField label="New Password">
        <UInput v-model="newPassword" type="password" />
      </UFormField>

      <UFormField label="Confirm Password">
        <UInput v-model="confirmPassword" type="password" />
      </UFormField>

      <UButton class="w-full" @click="resetPassword">Reset Password</UButton>
    </UForm>

    <p v-if="error" class="text-red-500 mt-4 text-center text-sm">{{ error }}</p>
    <p v-if="success" class="text-green-500 mt-4 text-center text-sm">{{ success }}</p>
  </div>
</template>
