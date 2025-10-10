import {useCookie} from '#app'


export const useAuth = () => {
    const config = useRuntimeConfig()
    const BASE_URL = config.public.apiBase

    const router = useRouter()
    const tokenKey = 'token'
    const userKey = 'user'

    const user = useState('auth-user', () => null)
    const token = useCookie(tokenKey)

    const isAuthenticated = computed(() => !!user.value)
    const loading = ref(true)

    // Load user data from localStorage on client mount
    onMounted(() => {
        if (process.client&& !user.value) {
            const storedUser = localStorage.getItem(userKey)
            user.value = storedUser ? JSON.parse(storedUser) : null
        }
        loading.value = false
    })

    const login = async (email: string, password: string) => {
        try {
            console.log("Logging in user:")
            const response = await $fetch<{ user: any, token: string }>(`${BASE_URL}/api/login`, {
                method: 'POST',
                body: {email, password},
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            token.value=response.token
            user.value=response.user
            localStorage.setItem(userKey, JSON.stringify(response.user))
            await router.push('/')
        } catch (err: any) {
            console.log('Login error:', err)
            throw err.data || 'Login failed.'
        }
    }
    const isAdmin=computed(() => user.value?.isAdmin==true)
    const logout = () => {
        console.log('Logging out.')
        token.value=null
        user.value=null
        if(process.client){
            localStorage.removeItem(userKey)
        }
        router.push('/auth/login')
    }


    const getToken = () => token.value
    const userId = computed(() => user.value?.id)

    const success = ref(false)
    const error = ref('')
    const sendResetLink = async (email:string) => {
        try {
            await $fetch(`${BASE_URL}/api/forgot-password`, {
                method: 'POST',
                body: { email }
            })
            success.value = true
            error.value = ''
        } catch (err: any) {
            error.value = err.data?.message || 'Something went wrong'
            success.value = false
        }
    }

    return {
        login,
        isAdmin,
        logout,
        isAuthenticated,
        getToken,
        user,
        loading,
        userId,
        sendResetLink,
    }
}
