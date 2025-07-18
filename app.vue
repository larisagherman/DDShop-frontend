<script setup lang="ts">
import Navbar from "~/components/Navbar.vue";
import {useRoute} from "vue-router";

const route = useRoute()
const hiddenNavbarRoutes = ['/register', '/login','/checkout/details']
const showNavbar = computed(() => !hiddenNavbarRoutes.includes(route.path))

</script>
<template>
  <UApp>
    <Navbar/>
    <NuxtLayout>
      <NuxtPage/>
      <footer v-if="showNavbar">
        <Footer/>
      </footer>
    </NuxtLayout>
  </UApp>

</template>
