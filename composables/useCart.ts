export const useCart = () => {
    const cart = useState('cart', () => null)
    const userId = useState('userId', () => null)

    const getCartByUserId = async (id: number) => {
        try {
            userId.value = id
            console.log("Getting cart for userId:", id)
            const response = await $fetch(`http://localhost:8099/carts/user/${id}`, {
                method: 'GET',
                credentials: 'include',
            })
            cart.value = response
            console.log('Got cart.')

        } catch (error) {
            console.log("Error fetching cart: ", error.data)
            throw error.data || 'Fetching cart failed'
        }

    }
    const updateCartTotalPrice = async (cartId: number, newTotalPrice: number) => {
        try {
            console.log('cart id', cart.value.id)
            await $fetch(`http://localhost:8099/carts/${cartId}`, {
                method: 'PUT',
                body: {totalPrice: newTotalPrice},
            })
            console.log('Cart TotalPrice updated successfully')
        } catch (error) {
            console.log('Error updating cart totalPrice:', error)
        }
    }
    const addToCart = async (productId: number,
                             productName: string,
                             quantity: number,
                             pricePerPiece: number,
                             totalPricePerEntry: number) => {
        if (!cart.value?.id) {
            console.error('Cart not loaded yet.')
            return
        }

        //find existing cart-entry
        const existingCartEntry = cart.value.cartEntries.find(entry => entry.productId === productId)
        if (existingCartEntry) {
            const updatedQuantity = existingCartEntry.quantity + quantity
            const updateEntry = {
                quantity: updatedQuantity,
                totalPricePerEntry: updatedQuantity * pricePerPiece,
            }
            try {
                await $fetch(`http://localhost:8099/cart-entries/${existingCartEntry.id}`, {
                    method: 'PUT',
                    body: updateEntry,
                    credentials: 'include'
                })
                await getCartByUserId(userId.value)
                console.log('Cart-entry updated successfully.')
            } catch (error) {
                console.log("Error updating cart-entry: ", error)
            }
        } else {
            const newCartEntry = {
                productId,
                productName,
                quantity,
                pricePerPiece,
                totalPricePerEntry,
                cartId: cart.value.id,

            }
            try {
                const response = await $fetch(`http://localhost:8099/cart-entries`, {
                    method: 'POST',
                    body: newCartEntry,
                    credentials: 'include'
                })
                await getCartByUserId(userId.value)
                console.log('Added to cart')
            } catch (error) {
                console.log('Error adding to cart.')
            }
        }
        await getCartByUserId(userId.value)

        const newTotalPrice = cart.value.cartEntries.reduce(
            (acc, entry) => acc + entry.totalPricePerEntry,
            0
        )
        await updateCartTotalPrice(cart.value.id, newTotalPrice)
        await getCartByUserId(userId.value)
        console.log('Cart total price updated.')
    }
    const updateCartEntryQuantity = async (entryId: number, newQuantity: number) => {
        const entry = cart.value.cartEntries.find(entry => entry.id === entryId)
        if (!entry) {
            console.error('Cart entry not found.')
            return
        }
        const updateTotalPricePerEntry = newQuantity * entry.pricePerPiece
        try {
            await $fetch(`http://localhost:8099/cart-entries/${entry.id}`, {
                method: 'PUT',
                credentials: 'include',
                body: {
                    quantity: newQuantity,
                    totalPricePerEntry: updateTotalPricePerEntry
                }
            })
            console.log('Cart-entry updated successfully.')
            await getCartByUserId(userId.value)

            const newTotalPrice = cart.value.cartEntries.reduce(
                (acc, entry) => acc + entry.totalPricePerEntry,
                0
            )

            await updateCartTotalPrice(cart.value.id, newTotalPrice)
            await getCartByUserId(userId.value)
            console.log('Cart total price updated.')
        } catch (error) {
            console.error("Error updating entry quantity:", error)
        }
    }
    const deleteCartEntry = async (entryId) => {
        try {
            await $fetch(`http://localhost:8099/cart-entries/${entryId}`, {
                method: 'DELETE',
                credentials: 'include'
            })
            console.log('Deleted cart entry:', entryId)
            await getCartByUserId(userId.value)

        } catch (error) {
            console.error('Failed to delete cart entry:', error)
        }

    }
    const checkout=async(orderForm)=>{
        try{
            await $fetch(`http://localhost:8099/orders`,{
                method:'POST',
                body:orderForm
            })
            console.log('Order created')
        }catch(error){
            console.error('Error order creation:', error)
        }
    }
    const disableCart=async(cartId)=>{
        try{
            await $fetch(`http://localhost:8099/carts/disabled/${cartId}`, {
                method:'PUT'
            })
            console.log('Order disabled')
        }catch (error){
            console.error('Error disable cart:', error)
        }
    }
    const createCart=async(userId)=>{
        try{
            await $fetch(`http://localhost:8099/carts`, {
                method:'POST',
                body:{userId:userId,totalPrice:0}
            })
            console.log('New Cart created created')
        }catch(error){
            console.error('Error creating new cart:', error)
        }
    }
    const disabledCarts=ref([])
    const getAllDisabledCartsByUserId=async(userId)=>{
        try{
            const response=await $fetch(`http://localhost:8099/carts/disabled-carts/user/${userId}`, {
                method:'GET'
            })
            disabledCarts.value=response
            console.log('Got all disabled carts.')
        }catch(error){
            console.error('Error getting disabled carts.')
        }
    }
    const totalItemsInCart = computed(() => {
        if (!cart.value || !cart.value.cartEntries) return 0
        return cart.value.cartEntries.reduce((sum, entry) => sum + entry.quantity, 0)
    })

    return {
        cart,
        getCartByUserId,
        addToCart,
        updateCartEntryQuantity,
        deleteCartEntry,
        checkout,
        disableCart,
        createCart,
        getAllDisabledCartsByUserId,
        disabledCarts,
        totalItemsInCart,
    }
}