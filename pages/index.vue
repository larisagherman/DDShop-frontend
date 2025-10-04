<script setup lang="ts">

import router from "#app/plugins/router";

const {user,isAuthenticated,loading} = useAuth()

const firstName = computed(() => user.value?.firstName)
// console.log('home user id',userId)
const items = [
  'https://picsum.photos/640/640?random=1',
  'https://picsum.photos/640/640?random=2',
  'https://picsum.photos/640/640?random=3',
  'https://picsum.photos/640/640?random=4',
  'https://picsum.photos/640/640?random=5',
  'https://picsum.photos/640/640?random=6'
]
</script>

<template>
  <div class="bg-pink-50 md:h-[900px]  h-[600px] ">
    <div class="flex justify-center">
      <img src="public/img/cake.PNG" alt="cake" class="w-[350px] h-[400px] md:w-[600px] md:h-[700px] mt-30  ">
      <div class="absolute inset-0 flex flex-col items-center justify-center gap-8 ">
          <div v-if="isAuthenticated &&!loading">
            <h1 class="text-center text-3xl md:text-5xl font-bold text-white drop-shadow-md md:mt-90">Welcome {{ firstName}}! <br>Fancy a sweet treat?</h1>
          </div>
          <div v-else>
            <h1 class="text-center  font-bold text-5xl text-white drop-shadow-lg">Fancy a sweet treat?</h1>
          </div>
        <NuxtLink to="/products">
          <UButton  class="text-sm md:text-lg px-4 py-2 md:px-8 md:py-4 cursor-pointer bg-blue-100 text-black font-extralight shadow-2xl relative z-10 hover:bg-blue-200">SHOP NOW</UButton>
        </NuxtLink>
      </div>
    </div>
  </div>
  <div class="flex flex-col justify-center items-center mt-20 gap-20">
    <h2 class="text-3xl drop-shadow-md font-medium ">Discover Our Latest Goodies</h2>
    <UCarousel v-slot="{ item }" arrows :items="items" class="w-full max-w-xs mx-auto mb-20">
      <img :src="item" width="400" height="400" class="rounded-lg">
    </UCarousel>
  </div>
  <div class="bg-pink-50 flex flex-col justify-center items-center gap-2 ">
    <h3 class="text-4xl mt-20 font-serif">100% natural</h3>
    <p class="text-xl font-serif">made with love!</p>
  </div>
</template>
