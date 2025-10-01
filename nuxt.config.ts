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
    },
    server: {
        host: process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost',
        port: process.env.PORT || 10000
    },
    session: {
        password: process.env.NUXT_SESSION_PASSWORD || ''
    },
    runtimeConfig: {
        public: {
            apiBase: process.env.API_BASE_URL || 'http://localhost:8080' //|| 'https://ddshop-backend.onrender.com'
        }
    },

})