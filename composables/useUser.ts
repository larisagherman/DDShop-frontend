export const useUser = () => {
    const config = useRuntimeConfig()
    const BASE_URL = config.public.apiBase

    const userInfo=ref()
    const getUserInfo=async (userId:number)=>{
        try{
            console.log("Fetching user info by id:",userId)
            const response=await fetch(`${BASE_URL}/users/${userId}`,{
                method:"GET",
            })
            userInfo.value = await response.json()
            console.log("Fetched user info")
        }catch(err){
            console.log("Error fetching userInfo...")
        }
    }
    return {
        userInfo,
        getUserInfo
    }
}