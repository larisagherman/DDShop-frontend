export default defineNuxtPlugin((nuxtApp) => {
    const token = localStorage.getItem('token')
    if (token) {
        nuxtApp.$fetch = $fetch.create({
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
})
