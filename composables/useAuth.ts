import {useCookie} from '#app'


export const useAuth = () => {
    const router = useRouter()
    const tokenKey = 'token'
    const userKey = 'user'

    const isAuthenticated = computed(() => !!user.value)
    const loading = ref(true)  // NEW: loading flag, true until user is checked
    const userData = ref(null as any) // store user object locally

    // Load user data from localStorage on client mount
    onMounted(() => {
        if (process.client) {
            const storedUser = localStorage.getItem(userKey)
            userData.value = storedUser ? JSON.parse(storedUser) : null
        }
        loading.value = false
    })

    const login = async (email: string, password: string) => {
        try {
            console.log("Logging in user:")
            const response = await $fetch<{ user: any, token: string }>('http://localhost:8090/api/login', {
                method: 'POST',
                body: {email, password},
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const tokenCookie = useCookie(tokenKey)
            tokenCookie.value = response.token

            if (process.client) {
                localStorage.setItem(userKey, JSON.stringify(response.user)) // store user info
            }
            console.log(response.user)
            await router.push('/home')
        } catch (err: any) {
            console.log('Login error:', err)

            throw err.data || 'Login failed.'
        }
    }

    const logout = () => {
        console.log('Logging out.')
        if (process.client) {
            localStorage.removeItem(userKey)       // clear user info
            localStorage.removeItem(tokenKey)      // clear token from localStorage (if used anywhere)
            const tokenCookie = useCookie(tokenKey)
            tokenCookie.value = null                // clear token cookie
        }
        router.push('/login')
    }


    const getToken = () => {
        if (process.client) {
            return localStorage.getItem(tokenKey)
        }
        return null
    }
    const user = computed(() => {
        if (process.client) {
            const data = localStorage.getItem(userKey)
            return data ? JSON.parse(data) : null
        }
        return null
    })

    return {
        login,
        logout,
        isAuthenticated,
        getToken,
        user:userData,
        loading,
    }
}
