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
    <div class="flex flex-col space-y-4 max-w-md mx-auto bg-white shadow-md rounded-lg p-20 rounded-lg ">
      <!-- Basic Info -->
      <div class="flex gap-8 w-full">
        <div>
          <h2 class="text-xl font-semibold">{{ userInfo.firstName }} {{ userInfo.lastName }}</h2>
          <p class="text-gray-600">{{ userInfo.email }}</p>
          <p class="text-gray-600">{{ userInfo.phoneNumber }}</p>
        </div>
        <UAvatar icon="i-lucide-image" size="3xl"/>
      </div>

      <div class="grid grid-cols-2 gap-8">
        <div v-if="userInfo.deliveryAddress">
          <h4 class="font-semibold mb-1">Delivery Address</h4>
          <p>{{ userInfo.deliveryAddress.streetLine }}</p>
          <p>{{ userInfo.deliveryAddress.city }}, {{ userInfo.deliveryAddress.postalCode }}</p>
          <p>{{ userInfo.deliveryAddress.county }}, {{ userInfo.deliveryAddress.country }}</p>
        </div>

        <div v-if="userInfo.billingAddress">
          <h4 class="font-semibold mb-1">Billing Address</h4>
          <p>{{ userInfo.billingAddress.streetLine }}</p>
          <p>{{ userInfo.billingAddress.city }}, {{ userInfo.billingAddress.postalCode }}</p>
          <p>{{ userInfo.billingAddress.county }}, {{ userInfo.billingAddress.country }}</p>
        </div>
      </div>


    </div>
  </div>
</template>
