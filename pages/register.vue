<script setup lang="ts">
const value = ref('')
definePageMeta({
})
const show = ref(false)
const password = ref('')

</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="flex flex-col gap-4">
      <h2 class="text-center">Register</h2>
      <UInput v-model="value" placeholder="" :ui="{ base: 'peer' }">
        <label class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
          <span class="inline-flex bg-default px-1">First Name</span>
        </label>
      </UInput>
      <UInput v-model="value" placeholder="" :ui="{ base: 'peer' }">
        <label class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
          <span class="inline-flex bg-default px-1">Last Name</span>
        </label>
      </UInput>
      <UInput trailing-icon="i-lucide-at-sign" v-model="value" placeholder="" :ui="{ base: 'peer' }">
        <label
            class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
          <span class="inline-flex bg-default px-1">Email address</span>
        </label>
      </UInput>
      <UInput v-model="value" placeholder="" :ui="{ base: 'peer' }">
        <label class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
          <span class="inline-flex bg-default px-1">Phone Number</span>
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
      <UInput
          v-model="password"
          placeholder="Re-enter password"
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
      <UButton class="w-full justify-center">Submit</UButton>
    </div>
  </div>
</template>
<style>
/* Hide the password reveal button in Edge */
::-ms-reveal {
  display: none;
}
</style>