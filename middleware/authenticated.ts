export default defineNuxtRouteMiddleware((to,from)=>{
    const { isAuthenticated } = useUserSession()
    if(!isAuthenticated){
        return navigateTo('/login')
    }
});