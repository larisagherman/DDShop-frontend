// https://nuxt.com/docs/api/configuration/nuxt-config
import {resolve} from "path"
import "tailwindcss";
import "@nuxt/ui";

export default defineNuxtConfig({
    compatibilityDate: '2025-05-15',
    devtools: {enabled: false},
    alias: {
        '@': resolve(__dirname, '/'),
    },
    css: [
        "~/assets/css/main.css",
    ],
    modules: ['@nuxt/ui', '@vueuse/nuxt', 'nuxt-auth-utils','@pinia/nuxt',  '@pinia/nuxt'],
    ui: {
        colorMode: false
    }

})