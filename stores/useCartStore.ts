//function provided by the Pinia library
import {defineStore} from 'pinia'

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [] as Array<{
            productId: number; name: string; price: number; quantity: number
        }>
    }),
    getters: {
        total: (state) => state.items.reduce((acc, item) => acc + item.price * item.quantity, 0),
        itemCount: (state) => state.items.reduce((acc, item) => acc + item.quantity, 0),
    },
    actions: {
        addToCart(product: { id: number; name: string; price: number }) {
            const existing = this.items.find((item: any) => item.productId === product.id)
            if (existing) {
                existing.quantity++
            } else {
                this.items.push({
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                })
            }
        },
        removeFromCart(productId: number) {
            this.items = this.items.filter((item: any) => item.productId !== productId)
        },
        clearCart() {
            this.items = []
        },
        persist:true,
    }
})