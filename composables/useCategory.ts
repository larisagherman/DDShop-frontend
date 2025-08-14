export const useCategory = () => {
    const config = useRuntimeConfig()
    const BASE_URL = config.public.apiBase

    const categories = ref([])
    const getCategories = async () => {
        try {
            const response = await $fetch(`${BASE_URL}/category`, {
                method: 'GET',
            })
            categories.value=response
            console.log('Got categories')
        }catch(err) {
            console.error('Error fetching categories',err.data)
        }
    }
    return{
        categories,
        getCategories,
    }
}