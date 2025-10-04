export const useMessage = ()=>{
    const config = useRuntimeConfig()
    const BASE_URL = config.public.apiBase

    const sendMessage = async(formState) => {
        try {
            await $fetch(`${BASE_URL}/contact`,{
                method:'POST',
                body:formState
            })
            console.log('Message sent')
        }catch(err){
            console.error("Sending message error",err)
            throw err.data
        }
    }
    return{
        sendMessage
    }
}