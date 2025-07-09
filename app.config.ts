// app.config.ts
export default defineAppConfig({
    ui: {
        // 👇 default props for all UButton components
        defaults: {
            UButton: {
                color: 'primary',
                variant: 'solid',
                size: 'md',
                ui: {
                    base: 'w-full justify-center',
                },
            },
        },
    },
})
