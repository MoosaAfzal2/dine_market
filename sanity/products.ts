export const products = {
    name: "products",
    type: "document",
    title: "Products",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "category",
            title: "Category",
            type: "string",
            options: {
                list: [
                    { title: 'Sweater', value: 'Sweater' },
                    { title: 'Dress', value: 'Dress' },
                    { title: 'Pants', value: 'Pants' },
                    { title: 'Jackets', value: 'Jackets' },
                    { title: 'T Shirts', value: 'T Shirts' },
                ],
            },
        },
        {
            name: "gender",
            title: "For Gender",
            type: "string",
            options: {
                list: [
                    { title: 'Male', value: 'Male' },
                    { title: 'Female', value: 'Female' },
                ],
            },
        },
        {
            name: "price",
            title: "Price",
            type: "number",
        },
        {
            name: "details",
            title: "Product Details",
            type: 'array',
            of: [{ type: 'block' }]
        },
        {
            name: "product_care",
            title: "Product Care",
            type: "array",
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'Hand wash using cold water.', value: 'Hand wash using cold water.' },
                    { title: 'Do not using bleach.', value: 'Do not using bleach.' },
                    { title: 'Hang it to dry.', value: 'Hang it to dry.' },
                    { title: 'Iron on low temperature.', value: 'Iron on low temperature.' }
                ]
            }
        },
        {
            name: "image",
            title: "Image",
            type: "array",
            of: [{ type: 'image' }],
        },
    ]
}