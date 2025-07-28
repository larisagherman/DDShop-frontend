export const useCategory = () => {
    const categories = ref([])
    const getCategories = async () => {
        try {
            const response = await $fetch(`http://localhost:8099/category`, {
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