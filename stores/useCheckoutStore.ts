import { defineStore } from 'pinia'

export const useCheckoutStore = defineStore('checkout', {
    state: () => ({
        formState: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            paymentType: '',
            cardNumber: '',
            expiryDate: '',
            cvv: '',
            useSameAddress: false,
            deliveryAddress: {
                streetLine: '',
                postalCode: '',
                city: '',
                county: '',
                country: ''
            },
            billingAddress: {
                streetLine: '',
                postalCode: '',
                city: '',
                county: '',
                country: ''
            }
        }
    }),

    // ✅ This is all you need for auto-persist
    persist: true
})
