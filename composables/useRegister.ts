export const useRegister = () => {
    const router = useRouter()

    const register = async (formState: any) => {
        try {
            await $fetch('http://localhost:8099/api/register', {
                method: 'POST',
                body: formState,
                headers: { 'Content-Type': 'application/json' }
            })

            console.log('Registration successful!')
            await router.push('/login')
        } catch (err: any) {
            console.log('Sign up error:', err.data)

            throw err.data || 'Sign up failed.'
        }
    }

    return {
        register
    }
}
