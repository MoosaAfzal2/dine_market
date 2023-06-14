import { NextRequest, NextResponse } from "next/server";
import { db, OrdersTable, OrderType, NewOrderType } from "@/app/lib/Drizzle";
import { randomUUID } from "crypto";
import { cookies } from "next/dist/client/components/headers";
// import { eq, sql } from "drizzle-orm";
import { eq } from "drizzle-orm";
import { getAuth } from "@clerk/nextjs/server";
// import { sql } from "@vercel/postgres";

export async function GET(request: NextRequest) {
    try {
        // const user_id = request.nextUrl.searchParams.get("user_id")
        // const user_id = cookies().get("user_id")?.value
        const { userId } = getAuth(request);
        const data: OrderType[] = await db.select().from(OrdersTable).where(eq(OrdersTable.user_id, userId as string))
        return NextResponse.json(data, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        })
    }
    catch (error) {
        console.log((error as { message: string }).message);
        return NextResponse.json({ message: "Something Went Wrong!" })
    }
}


export async function POST(request: NextRequest) {
    const req = await request.json()
    const user_id = randomUUID()
    if (!cookies().get("user_id")?.value) {
        cookies().set("user_id", user_id)
    }

    try {
        // if (cookies().get("user_id")?.value) {
        if (req.user_id) {
            const data: NewOrderType[] = await db.insert(OrdersTable).values({
                product_id: req.product_id,
                // user_id: cookies().get("user_id")?.value as string,
                user_id: req.user_id,
                title: req.title,
                category: req.category,
                quantity: req.quantity,
                price: req.price,
                image_url: req.image_url
            }).returning()

            return NextResponse.json({ message: "Order Added Successfully!", data })
        }
        else {
            throw new Error("Orders field is Required")
        }
    }
    catch (error) {
        console.log((error as { message: string }).message);
    }
}


export async function DELETE(request: NextRequest) {
    const req = await request.json()
    try {
        // delete one product
        if (req.id) {
            const data = await db.delete(OrdersTable).where(eq(OrdersTable.id, req.id));
        }
        // Empty cart by deleting all products of user_id
        else if (req.user_id) {
            const data = await db.delete(OrdersTable).where(eq(OrdersTable.user_id, req.user_id));
        }
        return NextResponse.json({ message: "Order deleted Successfully!" })
    }
    catch (error) {
        console.log((error as { message: string }).message);
        return NextResponse.json({ message: "Something Went Wrong!" })
    }
}

export async function PATCH(request: NextRequest) {
    const {Data} = await request.json()
    try {
        if (Data) {
            for (const items of Data) {
                await db.update(OrdersTable)
                    .set({ quantity: items.quantity })
                    .where(eq(OrdersTable.id, items.id));
            }
        }
        return NextResponse.json({ message: "Orders Updated Successfully!" })
    }
    catch (error) {
        console.log((error as { message: string }).message);
        return NextResponse.json({ message: "Something Went Wrong!" })
    }
}