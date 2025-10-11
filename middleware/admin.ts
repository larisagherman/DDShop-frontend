export default defineNuxtRouteMiddleware(()=>{
    const {isAdmin}=useAuth()
    if(!isAdmin){
        return navigateTo('/')
    }

})