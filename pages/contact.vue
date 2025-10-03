<script setup lang="ts">
import {ref} from 'vue'

const form = ref({name: '', email: '', message: ''})

function sendMessage() {
  console.log('Message sent:', form.value)
  alert('Thank you! Your message has been sent.')
  form.value = {name: '', email: '', message: ''}
}
</script>
<template>
  <div class="relative w-full sm:mb-4">
    <!-- 🌄 Banner Image -->
    <img
        src="/img/landscapeCakes.jpg"
        alt="Desserts"
        class="w-full h-full object-cover"
    />
    <!-- ✨ Overlay Title -->
    <div class="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/30">
      <h1 class="text-5xl md:text-6xl font-bold drop-shadow-lg">Contact Us</h1>
      <p class="mt-4 text-lg md:text-xl  drop-shadow-md">
        We're always here to sweeten your day — with the perfect dessert and a delicious solution to any craving.
      </p>
    </div>
  </div>

  <!-- 📬 Contact Card -->
  <div
      class="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl p-8 -mt-20 flex flex-col md:flex-row gap-8 relative z-10">
    <!-- Left: Contact Info -->
    <div class="md:w-1/2 space-y-5 p-8">
      <div class="text-center text-left ">
        <h2 class="text-3xl font-semibold">Get in Touch</h2>
        <p class="text-gray-600 mt-2">We’d love to hear from you!</p>
      </div>

      <div class="mt-6 space-y-3 text-gray-700 text-center md:text-left">
        <div class="flex items-center gap-4">
          <UAvatar icon="i-lucide-map-pin" size="xl" class="text-2xl"/>
          <div class="flex flex-col items-start">
            <h4 class="font-bold">Head Office</h4>
            <p> 123 Sweet Street, Dessert City</p>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <UAvatar icon="i-lucide-mail" size="xl" class="text-2xl"/>
          <div class="flex flex-col items-start">
            <h4 class="font-bold">Email Us</h4>
            <p>hello@dessertshop.com</p>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <UAvatar icon="i-lucide-phone" size="xl" class="text-2xl"/>
          <div class="flex flex-col items-start">
            <h4 class="font-bold">Call Us:</h4>
            <p>+40 123 456 789</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Right: Message Form -->
    <div class="md:w-1/2 bg-pink-50 p-8 rounded-2xl shadow-lg space-y-2">
      <!-- 🏷️ Better heading spacing -->
      <h2 class="text-3xl font-semibold text-center md:text-left text-pink-600 mb-4">
        Send Us a Message
      </h2>

      <!-- ✉️ Form -->
      <UForm class="space-y-2">
        <!-- 👤 Name fields side by side -->
        <div class="flex gap-2">
          <UFormField class="flex-1">
            <UInput placeholder="First Name" class="w-full rounded-lg py-1"/>
          </UFormField>
          <UFormField class="flex-1">
            <UInput placeholder="Last Name" class="w-full rounded-lg py-1"/>
          </UFormField>
        </div>

        <!-- 📧 Email -->
        <UFormField>
          <UInput placeholder="Email" class="w-full rounded-lg py-1" required/>
        </UFormField>

        <!-- 💬 Message -->
        <UFormField>
          <UTextarea placeholder="Your Message" required autoresize class="w-full py-1"/>
        </UFormField>
      </UForm>

      <!-- 📤 CTA Button -->
      <UButton type="submit" size="xl" class="hover:bg-pink-600 w-full py-1 text-md">Send Message</UButton>
    </div>
  </div>
  <div class="mt-8">
    <p class="text-center mb-2 font-semibold">Follow Our Social Media:</p>
    <div class="flex  items-center justify-center gap-2 ">
      <NuxtLink to="https://instagram.com" >
        <UAvatar icon="i-lucide-instagram" size="xl" class="text-2xl"/>
      </NuxtLink>
      <NuxtLink to="https://facebook.com">
        <UAvatar icon="i-lucide-facebook" size="xl" class="text-2xl"/>
      </NuxtLink>
      <NuxtLink to="https://twitter.com">
        <UAvatar icon="i-lucide-twitter" size="xl" class="text-2xl"/>
      </NuxtLink>
      <NuxtLink to="https://youtube.com">
        <UAvatar icon="i-lucide-youtube" size="xl" class="text-2xl"/>
      </NuxtLink>
    </div>
  </div>
</template>

