<script setup lang="ts">

import {useRoute} from 'vue-router'
import type {NavigationMenuItem} from '@nuxt/ui'
import {useAuth} from "~/composables/useAuth";

const route = useRoute()
const hiddenNavbarRoutes = ['/register', '/login', '/checkout/shipping', '/checkout/billing', '/checkout/confirmation']
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
const items = ref<DropdownMenuItem[]>([
  {
    label: 'Profile',
    icon: 'i-lucide-user',
    to: '/user'
  },
  {
    label: 'Order History',
    icon: 'i-lucide-shopping-bag',
    to: '/user/orderHistory'
  },
  {
    label: 'Logout',
    icon: 'i-lucide-log-out',
  }
])

function handleItemClick(item: DropdownMenuItem) {
  if (item.label === 'Logout') {
    logout()
  } else if (item.to) {
    router.push(item.to)
  }
}
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
        <UNavigationMenu :items="middleItems"/>
      </div>

      <!-- Right Icons + Login/Logout -->

      <div v-if="!loading" class="flex items-center space-x-4 ml-auto">
        <NuxtLink to="/" class="p-1">
          <UIcon name="i-lucide-search" class="text-gray-500"/>
        </NuxtLink>
        <NuxtLink to="/cart" class="p-1">
          <UIcon name="i-lucide-shopping-cart" class="text-gray-500"/>
        </NuxtLink>
        <div v-if="isAuthenticated" class="ml-1">
          <UDropdownMenu
              :items="items"
              :ui="{ item: { base: 'cursor-pointer' } }"
          >
            <UButton icon="i-lucide-user" color="gray-500" class="w-4 h-4 text-gray-500 cursor-pointer" variant="ghost" size="xs"/>

            <!-- Custom item template for handling clicks -->
            <template #item="{ item }">
              <div
                  class="flex items-center px-3 py-2 space-x-2 hover:bg-gray-100 cursor-pointer"
                  @click="handleItemClick(item)"
              >
                <UIcon :name="item.icon" class="w-4 h-4 text-gray-500"/>
                <span class="text-sm text-gray-700">{{ item.label }}</span>
              </div>
            </template>
          </UDropdownMenu>
        </div>

        <div v-else>
          <UNavigationMenu class="space-x-0" :items="logIn"/>
        </div>
      </div>
    </header>
  </nav>
</template>
