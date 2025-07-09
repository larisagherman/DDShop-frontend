<template>
  <UApp>
    <div>
      <NuxtLayout>
        <NuxtPage/>
        <header>
          <ul>
            <li>
              <NuxtLink to="/">back</NuxtLink>
              <NuxtLink to="/home">Home</NuxtLink>
              <NuxtLink to="/login">Login</NuxtLink>
              <NuxtLink to="/custom">Custom</NuxtLink>
            </li>
          </ul>
        </header>
      </NuxtLayout>
    </div>
    <Footer/>
  </UApp>

</template>
<script setup lang="ts">
import Footer from "~/components/Footer.vue";
</script>