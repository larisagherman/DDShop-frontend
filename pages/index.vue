<script setup lang="ts">

const {user,isAuthenticated,loading} = useAuth()
const {getAllProductsFirstImages}=useImage()
const firstName = computed(() => user.value?.firstName)
// console.log('home user id',userId)
const loading2=ref(true)
const items=ref<string[]>([])
onMounted(async() => {
  items.value = await getAllProductsFirstImages()
  loading2.value = false
})
</script>

<template>
  <div class="bg-pink-50 md:h-[900px]  h-[600px] ">
    <div class="flex justify-center relative">
      <img src="public/img/cake.PNG" alt="cake" class="w-[350px] h-[400px] md:w-[600px] md:h-[700px] mt-30  ">
      <div class="absolute inset-0 flex flex-col items-center justify-center gap-8 ">
          <div v-if="isAuthenticated &&!loading">
            <h1 class="text-center text-3xl md:text-5xl font-bold text-white drop-shadow-md md:mt-60 ">Welcome {{ firstName}}! <br>Fancy a sweet treat?</h1>
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
    <div v-if="loading2" class="rounded-lg">
        <UCarousel arrows class=" w-full max-w-xs mx-auto mb-20 animate-pulse w-[400px] h-[400px] bg-pink-50 "></UCarousel>
    </div>
    <div v-else>
      <UCarousel v-slot="{item}" v-if="items.length" arrows :items="items" class="w-full max-w-xs mx-auto mb-20">
        <img :src="item"  class="rounded-lg w-[400px] h-[400px]" >
      </UCarousel>
    </div>

  </div>
  <div class="bg-pink-50 flex flex-col justify-center items-center gap-2 ">
    <h3 class="text-4xl mt-20 font-serif">100% natural</h3>
    <p class="text-xl font-serif">made with love!</p>
  </div>
</template>
