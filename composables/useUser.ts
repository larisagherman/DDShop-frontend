export const useUser = () => {
    const config = useRuntimeConfig()
    const BASE_URL = config.public.apiBase

    const userInfo=ref()

    const getUserInfo=async (userId:number)=>{
        try{
            console.log("Fetching user info by id:",userId)
            const response=await $fetch(`${BASE_URL}/users/${userId}`,{
                method:"GET",
            })
            userInfo.value = response
            console.log("Fetched user info:",userInfo.value)
        }catch(err){
            console.log("Error fetching userInfo...")
        }
    }
    const allUsers=ref([])
    const getAllUserInfo=async ()=>{
        try{
            console.log("Fetching all users with their info")
            const response=await $fetch(`${BASE_URL}/users`,{
                method:"GET",
            })
            allUsers.value=response
            console.log("Fetched all users with their info")
        }catch(err){
            console.log("Error fetching users with their info",err)
        }
    }
    const deleteUser=async (userId:number)=>{
        try{
            console.log("Deleting user with id: ",userId)
            await $fetch(`${BASE_URL}/users/${userId}`,{
                method:"DELETE",
            })
            console.log("Deleted user with id: ",userId)
        }
        catch(err){
            console.log("Error deleting user with id: ",userId,err)
        }

    }
    const updateUser=async (userId:number,userForm)=>{
        try{
            console.log("Updating user with id: ",userId)
            const response=await $fetch(`${BASE_URL}/users/${userId}`,{
                method:'PUT',
                body:userForm
            })
            console.log("Updated user with id: ",userId)
        }catch(err){
            console.log("Error updating user with id: ",userId,err)
        }
    }
    return {
        userInfo,
        getUserInfo,
        allUsers,
        getAllUserInfo,
        deleteUser,
        updateUser,
    }
}