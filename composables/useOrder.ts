export const userOrder=()=>{
    const config = useRuntimeConfig()
    const BASE_URL = config.public.apiBase

    const orders=ref([])//by userID
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
    const allOrders=ref([])
    const getAllOrders=async()=>{
        try{
            const response=await $fetch(`${BASE_URL}/orders`,{
                method:'GET'
            })
            allOrders.value=response
            console.log('Got all orders')
        }catch (error){
            console.error('Error getting all orders')
        }
    }
    const deleteOrder=async(orderId)=>{
        try{
            await $fetch(`${BASE_URL}/orders/${orderId}`,{
                method:'DELETE',
                body:orderId
            })
            console.log("Deleted order")
        }catch(err){
            console.error('Error deleting order')
        }
    }
    const updateOrder=async(orderId,orderForm)=>{
        try{
            console.log("Updating order")
            await $fetch(`${BASE_URL}/orders/${orderId}`,{
                method:'PUT',
                body:orderForm
            })
            console.log("Updated order")
        }catch(err){
            console.error('Error updating order')
        }
    }
    const getOrderById=async(orderId)=>{
        try{
            console.log("Getting order by id",orderId)
            const response=await $fetch(`${BASE_URL}/orders/${orderId}`,{
                method:'GET'
            })
            console.log("Got order by id",orderId)
            return response
        }catch(err){
            console.error('Error getting order by id',orderId)
        }
    }

    return{
        orders,
        getOrdersByUserId,
        getAllOrders,
        allOrders,
        deleteOrder,
        updateOrder,
        getOrderById,
    }
}