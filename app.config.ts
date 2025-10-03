export default defineAppConfig({
    ui: {
        colors:{
            primary: 'pink'
        },
        button: {
            defaultVariant:{
                color: 'primary',
            },
            base: ' font-bold rounded-full  justify-center text-base cursor-pointer hover:bg-pink-600',
            color: {
                primary: 'bg-pink-500 text-white hover:bg-pink-600'
            },
        },
        navigationMenu: {
            slots: {
                // Add gap between navigation items
                list: 'isolate min-w-0 flex gap-15', // Increased gap here (default might be smaller)
                item: 'min-w-0',
            },
            defaultVariants: {
                color: 'primary',
                highlightColor: 'primary',
                variant: 'pill'
            }
        }
    }
})