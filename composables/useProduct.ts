export const useProduct = () => {
    const config = useRuntimeConfig()
    const BASE_URL = config.public.apiBase

    const products = ref([])
    const product = ref()
    const productAttributes = ref([]);
    const totalPages=ref(1)
    const totalItems=ref(0)
    const getProducts = async () => {
        try {
            console.log("Fetching products")
            const response = await $fetch(`${BASE_URL}/products`, {
                method: 'GET',
            })
            products.value = response
            console.log('Products fetched')
        } catch (error) {
            console.log("Error fetching products: ", error.data)
            throw error.data || 'Fetching products failed'
        }
    }
    const getProductsByPage=async(page:number=1,filters?:{category?:string;ingredients?:string[];flavours?:string[];sortField:string;sortDir:string})=>{
        try{
            const pageIndex=page-1
            const params:Record<string, any> = {
                page:pageIndex,
                size:12
            };
            if(filters?.category!=null)params.category=filters.category
            if(filters?.ingredients && filters?.ingredients.length>0){
                params.ingredients=filters.ingredients.join(',')
            }
            if(filters?.flavours && filters?.flavours.length>0){
                params.flavours=filters.flavours.join(',')
            }
            if(filters?.sortField) params.sortField=filters.sortField
            if(filters?.sortDir) params.sortDir=filters.sortDir

            console.log('Params object:', params)

            const queryString = new URLSearchParams(params).toString();

            const response = await $fetch(`${BASE_URL}/products?${queryString}`, {
              method:'GET'
            })
            products.value = response.content
            totalPages.value = response.totalPages
            totalItems.value=response.totalElements
            console.log(totalItems.value)
        }catch(error){
            console.log("Error fetching products: ", error)
        }
    }
    const getProductById = async (id: int) => {
        try {
            console.log("Fetching product with id: " + id)
            const response = await $fetch(`${BASE_URL}/products/${id}`, {
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
            const response = await $fetch(`${BASE_URL}/products/${id}`, {
                method:'GET',
            })
            productAttributes.value = response
            console.log('Product attributes fetched: ')
        }catch(error) {
            console.log("Error fetching attributes failed: ", error.data)
            throw error.data || 'Fetching attributes failed'
        }
    }
    const allOfTheProductAttributes = ref([])
    const getAllProductAttributes = async () => {
        try{
            console.log("Fetching all attributes")
            const response = await $fetch(`${BASE_URL}/product-attribute`, {
                method:'GET'
            })
            allOfTheProductAttributes.value = response

        }catch(error) {
            console.log("Error fetching all attributes failed: ", error.data)
        }
    }


    return {
        products,
        getProducts,
        getProductById,
        getProductAttributesById,
        productAttributes,
        product,
        getProductsByPage,
        totalPages,totalItems,
        getAllProductAttributes,
        allOfTheProductAttributes,
    }
}