<script setup lang="ts">

import {useRoute} from 'vue-router'
import type {NavigationMenuItem} from '@nuxt/ui'
import {useAuth} from "~/composables/useAuth";

const route = useRoute()
const hiddenNavbarRoutes = ['/register', '/login','/checkout/details']
const showNavbar = computed(() => !hiddenNavbarRoutes.includes(route.path))

const handleLogout = async () => {
  try {
    console.log('logged out')
    await logout()
    await navigateTo('/login')
  } catch (err) {
    console.error('Logout failed:', err)
  }
}

const {logout, isAuthenticated, loading} = useAuth()
const middleItems = [
  {
    label: 'Home',
    to: '/home'
  },
  {
    label: 'Products',
    to: '/products'
  },
  {
    label: 'Contact',
    to: '/'
  }
]
const logIn = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Login',
    icon: 'i-lucide-log-in',
    to: '/login'
  }
])
</script>
<template>
  <nav class="navbar bg-white  py-4 px-6">
    <header v-if="showNavbar" class="flex items-center justify-between w-full relative">

      <!-- Logo -->
      <NuxtLink to="/home" class="flex-shrink-0">
        <img src="/logo.png" alt="Logo" class="h-10 w-auto"/>
      </NuxtLink>

      <!-- Middle Navigation (absolute center) -->
      <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <UNavigationMenu :items="middleItems" />
      </div>

      <!-- Right Icons + Login/Logout -->
      <div v-if="!loading" class="flex items-center space-x-4 ml-auto">
        <NuxtLink to="/" class="p-2">
          <UIcon name="i-lucide-search" class="text-gray-500"/>
        </NuxtLink>
        <NuxtLink to="/" class="p-2">
          <UIcon name="i-lucide-user" class="text-gray-500"/>
        </NuxtLink>
        <NuxtLink to="/cart" class="p-2">
          <UIcon name="i-lucide-shopping-cart" class="text-gray-500"/>
        </NuxtLink>

        <div v-if="isAuthenticated">
          <UButton @click="handleLogout">Logout</UButton>
        </div>
        <div v-else>
          <UNavigationMenu class="space-x-0" :items="logIn" />
        </div>
      </div>
    </header>
  </nav>
</template>
