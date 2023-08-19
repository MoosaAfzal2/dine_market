import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers"
import { ConfirmedOrdersTable, db } from "@/app/lib/Drizzle";

export interface ConfirmedOrdersI {
    productId: string,
    quantity: number
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
});

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;

const webhookHandler = async (req: NextRequest) => {
    try {
        const buf = await req.text();
        const sig = headers().get("stripe-signature")!

        // const header = stripe.webhooks.generateTestHeaderString({
        //     payload: buf,
        //     secret: webhookSecret,
        // });

        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret);
            // console.log(event)
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Unknown error";
            // On error, log and return the error message.
            if (!(err instanceof Error)) console.log(err);
            console.log(`Error message: ${errorMessage}`);

            return NextResponse.json(
                {
                    error: {
                        message: `Webhook Error: ${errorMessage}`,
                    },
                },
                { status: 400 }
            );
        }

        if ("checkout.session.completed" === event.type) {
            // getting the session instance
            const session: any = event.data.object

            // extracting the required Data from session
            const userId: string = session.metadata.userId
            const ConfirmedOrdersData: ConfirmedOrdersI[] = JSON.parse(session.metadata.productData)

            try {
                // Try to insert data
                const data = await db.insert(ConfirmedOrdersTable).values(
                    ConfirmedOrdersData.map((items) => ({
                        userId: userId,
                        productId: items.productId,
                        quantity: items.quantity,
                    }))
                ).returning()

                if (data) {
                    return NextResponse.json({ success: true, message: "Orders Confirmed Successfully" });
                } else {
                    return NextResponse.json({ success: false, message: "An Error Occured" });
                }

            } catch (err) {
                return NextResponse.json({
                    success: false,
                    message: "An Error Occured",
                    rror: (err as string).toString()
                });
            }
        }

        // Return a response to acknowledge completion of Checkout
        return NextResponse.json({ received: true, message: "Checkout Success" });

    } catch {
        // If an error occurs
        return NextResponse.json(
            {
                error: {
                    message: `Method Not Allowed`,
                },
            },
            { status: 405 }
        ).headers.set("Allow", "POST");
    }
};

export { webhookHandler as POST };