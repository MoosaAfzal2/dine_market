import { loadStripe } from '@stripe/stripe-js'
import { OrderType } from './Drizzle'

export interface lineitemsType {
    price_data: {
        currency: 'usd',
        unit_amount: number,
        product_data: {
            name: string,
            images: string[],
        },
    },
    quantity: number
}

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!}`)

export const checkout = async (Products: OrderType[]) => {
    try {
        // Mapping and getting the required stripe data
        const lineItems: lineitemsType[] = Products.map(item => ({
            price_data: {
                currency: 'usd',
                unit_amount: item.price * 100, // Price in cents (e.g., $10.00)
                product_data: {
                    name: item.title,
                    images: [item.image_url],
                },
            },
            quantity: item.quantity
        }))

        // Creat Stripe Checkout Page by calling the Api
        const { sessionId } = await fetch('/api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ lineItems }),

        }).then(res => res.json())

        // EMPTY CART
        if (sessionId) {
            try {
                const res = await fetch("/api/Orders", {
                    method: "DELETE",
                    body: JSON.stringify({
                        user_id: Products[0].user_id
                    })
                })
            } catch (err) {
                console.log(err);
            }
        }


        const stripe = await stripePromise
        // Redirect to Stripe Checkout Page
        const { error } = await stripe!.redirectToCheckout({ sessionId: sessionId })

        if (error) {
            if (error instanceof Error) throw new Error(error.message)
        } else {
            console.log(error)
        }

    } catch (error) {
        console.log(error)
    }
}