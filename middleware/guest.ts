export default defineNuxtRouteMiddleware(()=>{
    const token= useCookie('token')
    //If the user is logged in
    if (token.value) {
        return navigateTo('/home')
    }
})