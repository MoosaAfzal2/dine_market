import { loadStripe } from '@stripe/stripe-js'
import { OrderType } from './Drizzle'


const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!}`)

export const checkout = async (Products: OrderType[]) => {
    try {

        // Creat Stripe Checkout Page by calling the Api
        const { sessionId } = await fetch('/api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Products }),

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