<script setup lang="ts">
import type {DropdownMenuItem, NavigationMenuItem} from '@nuxt/ui'
import {useAuth} from "~/composables/useAuth"
import {useRoute, useRouter} from 'vue-router'

const route = useRoute()
const hiddenNavbarRoutes = ['/auth/register', '/auth/reset-password', '/auth/login', '/auth/forgot-password', '/checkout/shipping', '/checkout/billing', '/checkout/confirmation']
const showNavbar = computed(() => !hiddenNavbarRoutes.includes(route.path))
const router = useRouter()

const {logout, isAuthenticated, loading, isAdmin} = useAuth()
const {totalItemsInCart} = useCart()

const handleLogout = async () => {
  await logout()
  await navigateTo('/auth/login')
}

const leftItems = [
  {label: 'Shop Desserts', to: '/products'},
  {label: 'Cookies', to: '/products?category=cookies'},
  {label: 'Cakes', to: '/products?category=cakes'},
]
const rightItems = [
  {label: 'About', to: '/about'},
  {label: 'Contact', to: '/contact'}
]

const adminItems = ref<DropdownMenuItem[][]>([
  [
    {
      label: 'Dashboard',
      icon: 'i-lucide-layout-dashboard',
      to: '/admin'
    },
    {
      label: 'Manage Products',
      icon: 'i-lucide-package',
      to: '/admin/products',
      children: [
        [
          {
            label: 'Add Product',
            icon: 'i-lucide-plus-circle',
            to: '/admin/products/add-product'
          },
          {
            label: 'Update Product',
            icon: 'i-lucide-pencil',
            to: '/admin/products/update-product/'
          }
        ]
      ]
    },
    {
      label: 'Manage Orders',
      icon: 'i-lucide-shopping-bag',
      children: [
        [
          {
            label: 'View Orders',
            icon: 'i-lucide-eye',
            to: '/admin/orders/view-orders'
          },
          {
            label: 'Update Orders',
            icon: 'i-lucide-plus',
            to: '/admin/orders/update-order'
          },
          {
            label: 'Delete Order',
            icon: 'i-lucide-trash',
            to: '/admin/orders/delete-order'
          },

        ]
      ]
    },
    {
      label: 'Manage Users',
      icon: 'i-lucide-user',
      children: [
        [
          {
            label: 'View Users',
            icon: 'i-lucide-eye',
            to: '/admin/users/view-users'
          },
          {
            label: 'Delete User',
            icon: 'i-lucide-trash',
            to: '/admin/users/delete-user'
          },

        ]
      ]
    }

  ],
  [
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
      kbds: ['shift', 'meta', 'q']
    }
  ]
])

const logIn = computed<NavigationMenuItem[]>(() => [
  {label: 'Login', icon: 'i-lucide-log-in', to: '/auth/login'}
])

const items = ref<DropdownMenuItem[]>([
  {label: 'Profile', icon: 'i-lucide-user', to: '/user'},
  {label: 'Order History', icon: 'i-lucide-shopping-bag', to: '/user/orderHistory'},
  {label: 'Logout', icon: 'i-lucide-log-out'}
])

const handleItemClick = async (item: DropdownMenuItem) => {
  if (item.label === 'Logout') await handleLogout()
  else if (item.to) await router.push(item.to)
}

// Mobile menu state
const mobileMenuOpen = ref(false)
</script>

<template>
  <nav class="navbar py-6">
    <header
        v-if="showNavbar"
        class="flex items-center justify-between w-full relative
             px-4 sm:px-6 md:px-12 lg:px-[100px]"
    >
      <!-- LEFT ITEMS (desktop only) -->
      <div class="hidden md:flex items-center space-x-6">
        <UNavigationMenu :items="leftItems"/>
      </div>

      <!-- LOGO -->
      <NuxtLink
          to="/"
          class="flex-shrink-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2"
      >
        <img src="/logo.png" alt="Logo" class="h-15 w-auto"/>
      </NuxtLink>

      <!-- RIGHT ITEMS & ICONS -->
      <!-- RIGHT ITEMS & ICONS -->
      <div class="flex items-center gap-6 ml-auto">
        <!-- Right navigation links -->
        <div class="hidden md:flex">
          <UNavigationMenu :items="rightItems"/>
        </div>

        <!-- Search icon -->
        <NuxtLink to="/" class="p-1 flex items-center justify-center">
          <UIcon name="i-lucide-search" class="text-pink-600 w-6 h-6"/>
        </NuxtLink>

        <!-- Cart icon -->
        <NuxtLink to="/cart" class="relative p-1 flex items-center justify-center">
          <UChip :text="totalItemsInCart" size="3xl">
            <UIcon name="i-lucide-shopping-cart" class="text-pink-600 w-6 h-6"/>
          </UChip>
        </NuxtLink>


        <div v-if="!isAdmin">
          <!-- User dropdown -->
          <div v-if="isAuthenticated" class="flex items-center justify-center">
            <UDropdownMenu :items="items" :ui="{ item: { base: 'cursor-pointer' } }">
              <UButton
                  icon="i-lucide-user"
                  color="gray-500"
                  variant="ghost"
                  size="xl"
                  class="text-pink-600"
              />
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

          <!-- Login menu (if not authenticated) -->
          <div v-else class="hidden md:block">
            <UNavigationMenu class="space-x-0" :items="logIn"/>
          </div>
        </div>


        <!-- Mobile menu toggle -->
        <button class="md:hidden p-2 flex items-center justify-center" @click="mobileMenuOpen = !mobileMenuOpen">
          <UIcon :name="mobileMenuOpen ? 'i-lucide-x' : 'i-lucide-menu'" class="w-6 h-6 text-pink-600"/>
        </button>

        <!-- Admin dropdown -->
        <div v-if="isAdmin" class="flex items-center justify-center">
          <UDropdownMenu :items="adminItems" :ui="{ item: { base: 'cursor-pointer' } }">
            <UButton
                label="Admin"
                icon="i-lucide-user-cog"
                color="gray-500"
                variant="ghost"
                size="xl"
                class="text-pink-600"
            />
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
      </div>


    </header>

    <!-- Mobile dropdown menu -->
    <transition name="fade">
      <div
          v-if="mobileMenuOpen"
          class="md:hidden bg-transparent border-t border-gray-200 px-4 py-4 space-y-4"
      >
        <!-- Pages -->
        <div>
          <p class="text-gray-500  uppercase text-xs font-bold mb-2 text-center ml-100">Menu</p>
          <!-- Stacked vertically -->
          <div class="flex flex-col space-y-3 items-end mr-8">
            <NuxtLink
                v-for="item in [...leftItems, ...rightItems]"
                :key="item.label"
                :to="item.to"
                class="text-gray-700 hover:text-gray-900"
            >
              {{ item.label }}
            </NuxtLink>
          </div>
        </div>

        <!-- Account -->
        <div v-if="!isAdmin">
          <p class="text-gray-500 uppercase text-xs font-bold mb-2 text-center ml-100">Account</p>
          <div v-if="isAuthenticated " class="flex flex-col space-y-3 items-end mr-8">
            <button
                v-for="item in items"
                :key="item.label"
                @click="handleItemClick(item)"
                class="flex items-center text-gray-700 hover:text-gray-900"
            >
              <UIcon :name="item.icon" class="w-4 h-4 mr-2"/>
              {{ item.label }}
            </button>
          </div>
          <div v-else class="flex flex-col space-y-3">
            <NuxtLink
                v-for="loginItem in logIn"
                :key="loginItem.label"
                :to="loginItem.to"
                class="text-gray-700 hover:text-gray-900"
            >
              {{ loginItem.label }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </transition>

  </nav>
</template>
