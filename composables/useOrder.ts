export const userOrder=()=>{
    const orders=ref([])
    const getOrdersByUserId=async(userId)=>{
        try{
            const response=await $fetch(`http://localhost:8099/orders/user/${userId}`,{
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