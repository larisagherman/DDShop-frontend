export const useImage=()=>{
    const config = useRuntimeConfig()
    const BASE_URL = config.public.apiBase

    const getAllProductsFirstImages=async()=>{
        try{
            const response=await $fetch(`${BASE_URL}/product-image`,{
                method:'GET'
            })
            return response.sort(()=>Math.random() - 0.5)
        }catch(error){
            console.error("Error getting products first",error)
        }
    }
    return{
        getAllProductsFirstImages
    }
}