<script setup lang="ts">
definePageMeta({
  middleware: 'authenticated',
})
import {useRoute} from 'vue-router'
import type {NavigationMenuItem} from '@nuxt/ui'
import {useAuth} from "~/composables/useAuth";

const route = useRoute()
const hiddenNavbarRoutes = ['/register','/login']
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

const {logout, isAuthenticated,loading} = useAuth()
const middleItems = [
  {
    label: 'Home',
    to: '/'
  },
  {
    label: 'Products',
    to: '/'
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
  <UApp>
    <div>
      <NuxtLayout>
        <div v-if="showNavbar" class="relative flex justify-between items-center px-2 py-2  text-black">
          <UNavigationMenu :items="middleItems" class="absolute left-1/2 transform -translate-x-1/2"/>
          <div v-if="!loading" class="ml-auto flex items-center space-x-0">
            <div class="flex items-center space-x-0">
              <NuxtLink to="/search" class="p-2">
                <UIcon name="i-lucide-search" class="text-gray-500"/>
              </NuxtLink>
              <NuxtLink to="/user" class="p-2">
                <UIcon name="i-lucide-user" class="text-gray-500"/>
              </NuxtLink>
              <NuxtLink to="/cart" class="p-2">
                <UIcon name="i-lucide-shopping-cart"  class="text-gray-500"/>
              </NuxtLink>
            </div>
            <div v-if="isAuthenticated">
              <UButton @click="handleLogout">Logout</UButton>
            </div>
            <div v-else>
              <UNavigationMenu class="space-x-0" :items="logIn" />
            </div>
          </div>
        </div>

        <NuxtPage/>
      </NuxtLayout>
    </div>
    <Footer/>
  </UApp>

</template>
