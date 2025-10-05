export default defineNuxtRouteMiddleware(() => {
    if (process.client) {
        const successFlag = sessionStorage.getItem('orderSuccess')

        if (successFlag !== 'true') {
            // ⛔️ If the flag isn't set, block access
            return navigateTo('/cart')
        }

        // ✅ Clear the flag after it's used
        sessionStorage.removeItem('orderSuccess')
    }
})
