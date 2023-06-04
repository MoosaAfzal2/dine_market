import { lineitemsType } from '@/app/lib/checkout';
import { NextApiRequest } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe'

// Creating new Stripe class instance 
const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY!}`, { apiVersion: '2022-11-15' })

export async function POST(request: NextRequest,res: NextApiRequest) {
    try {
        // destructuring required data
        const { lineItems }: { lineItems: lineitemsType[] } = await request.json()
        if (lineItems.length === 0) {
            return NextResponse.json({ error: 'Bad Request!' })
        }

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ['card'],
            billing_address_collection: "auto",
            // Passing the data Here
            line_items: lineItems,
            success_url: `https://dine-market-bay.vercel.app/checkout/success`,
            cancel_url: `https://dine-market-bay.vercel.app/`,
        })

        return NextResponse.json({ sessionId: session.id });

        // If using HTML forms you can redirect here
        // return res.redirect(303, session.url)
    } catch (e: any) {
        return NextResponse.json({ message: e.message })
    }
}