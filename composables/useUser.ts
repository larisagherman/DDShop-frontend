export const useUser = () => {
    const userInfo=ref()
    const getUserInfo=async (userId:number)=>{
        try{
            console.log("Fetching user info by id:",userId)
            const response=await fetch(`http://localhost:8099/users/${userId}`,{
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