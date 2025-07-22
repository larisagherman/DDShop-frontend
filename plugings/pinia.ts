// plugins/pinia-plugin-persistedstate.ts
import persist from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.$pinia.use(persist)
})
