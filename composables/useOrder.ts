export const userOrder=()=>{
    const config = useRuntimeConfig()
    const BASE_URL = config.public.apiBase

    const orders=ref([])
    const getOrdersByUserId=async(userId)=>{
        try{
            const response=await $fetch(`${BASE_URL}/orders/user/${userId}`,{
                method:'GET'
            })
            orders.value=response
            console.log('Got all orders ')
        }catch(err){
            console.error('Error getting all orders')
        }
    }
    return{
        orders,
        getOrdersByUserId,
    }
}