import { OrderType } from '@/app/lib/Drizzle';
import { NextApiRequest } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe'
import { getAuth } from "@clerk/nextjs/server";

// Creating new Stripe class instance 
const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY!}`, { apiVersion: '2022-11-15' })

export async function POST(request: NextRequest) {
    try {
        const { userId } = getAuth(request);
        // destructuring required data
        const { Products }: { Products: OrderType[] } = await request.json()
        if (Products.length === 0) {
            return NextResponse.json({ error: 'Bad Request!' })
        }

        // Creating metadata to be recieved by the webhook
        const metadata = Products.map((item) => ({
            productId: item.product_id,
            quantity: item.quantity
        }))

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ['card'],
            billing_address_collection: "auto",
            shipping_options: [
                { shipping_rate: "shr_1NK0UzJ4cO7SkcDjtE4yK5Q3" },
                { shipping_rate: "shr_1NK0WsJ4cO7SkcDjiBqAP4DF" }
            ],
            // Passing the data Here
            line_items: Products.map((item) => ({
                price_data: {
                    currency: 'usd',
                    unit_amount: item.price * 100, // Price in cents (e.g., $10.00)
                    product_data: {
                        name: item.title,
                        images: [item.image_url]
                    },
                },
                quantity: item.quantity,
            })),
            metadata: {
                userId: userId,
                productData: JSON.stringify(metadata)
            },
            success_url: `${request.headers.get("origin")}/checkout/success`,
            cancel_url: `${request.headers.get("origin")}/`,
        })


        return NextResponse.json({ sessionId: session.id });

        // If using HTML forms you can redirect here
        // return res.redirect(303, session.url)
    } catch (e: any) {
        console.log(e)
        return NextResponse.json({ message: e.message })
    }
}