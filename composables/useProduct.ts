export const useProduct = () => {
    const products = ref([])
    const product = ref()
    const productAttributes = ref([]);
    const getProducts = async () => {
        try {
            console.log("Fetching products")
            const response = await $fetch("http://localhost:8099/products", {
                method: 'GET',
            })
            products.value = response
            console.log('Products fetched: ')
        } catch (error) {
            console.log("Error fetching products: ", error.data)
            throw error.data || 'Fetching products failed'
        }
    }
    const getProductById = async (id: int) => {
        try {
            console.log("Fetching product with id: " + id)
            const response = await $fetch(`http://localhost:8099/products/${id}`, {
                method: 'GET',
            })
            product.value = response
            console.log('Product by id fetched')
        } catch (error) {
            console.log("Error fetching product by id: ", error.data)
            throw error.data || 'Fetching product by id failed'
        }

    }
    const getProductAttributesById = async (id: int) => {
        try {
            console.log("Fetching attributes with id: " + id)
            const response = await $fetch(`http://localhost:8099/products/${id}`, {
                method:'GET',
            })
            productAttributes.value = response
            console.log('Product attributes fetched: ')
        }catch(error) {
            console.log("Error fetching attributes failed: ", error.data)
            throw error.data || 'Fetching attributes failed'
        }
    }

    return {
        products,
        getProducts,
        getProductById,
        getProductAttributesById,
        productAttributes,
        product
    }
}