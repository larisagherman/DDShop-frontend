<script setup lang="ts">
import { ref, onMounted } from 'vue'
const { userInfo,getUserInfo} = useUser()
const {userId}=useAuth()

onMounted(async() => {
  if(userId.value!==undefined &&userId.value!==null){
    await getUserInfo(userId.value)
    console.log(userInfo.value)
  }else{
    console.warn('userId undefined')
  }
})
</script>

<template>
  <div v-if="userInfo" class="h-screen flex justify-center items-center-safe">
    <div class="flex flex-col space-y-4 w-full max-w-3xl mx-auto bg-pink-50 shadow-md rounded-lg p-20 ">
      <!-- Basic Info -->
      <div class="flex items-center gap-6 mb-10">
        <UAvatar icon="i-lucide-image" size="3xl" class=""/>
        <div class="">
          <h2 class="text-3xl font-bold text-pink-600">{{ userInfo.firstName }} {{ userInfo.lastName }}</h2>
          <p class="text-gray-600">{{ userInfo.email }}</p>
          <p class="text-gray-600">{{ userInfo.phoneNumber }}</p>
        </div>
      </div>

      <div class="flex gap-50 ml-2">
        <div v-if="userInfo.deliveryAddress">
          <h4 class="font-bold mb-1 text-lg">Delivery Address</h4>
          <p>{{ userInfo.deliveryAddress.streetLine }}</p>
          <p>{{ userInfo.deliveryAddress.city }}, {{ userInfo.deliveryAddress.postalCode }}</p>
          <p>{{ userInfo.deliveryAddress.county }}, {{ userInfo.deliveryAddress.country }}</p>
        </div>

        <div v-if="userInfo.billingAddress">
          <h4 class="font-bold mb-1 text-lg">Billing Address</h4>
          <p>{{ userInfo.billingAddress.streetLine }}</p>
          <p>{{ userInfo.billingAddress.city }}, {{ userInfo.billingAddress.postalCode }}</p>
          <p>{{ userInfo.billingAddress.county }}, {{ userInfo.billingAddress.country }}</p>
        </div>
      </div>

      <div class="mt-10">
        <NuxtLink to="user/orderHistory">
          <p class="underline">See order history</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
