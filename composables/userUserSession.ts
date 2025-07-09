export const useUserSession = () => {
    const user = useState('user', () => null)  // globally accessible state

    const setUserSession = (userData: any) => {
        user.value = userData
    }

    const clearSession = () => {
        user.value = null
    }

    const loggedIn = computed(() => !!user.value)

    return { user, setUserSession, clearSession, loggedIn }
}
