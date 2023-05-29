import { NextRequest, NextResponse } from "next/server";
import { db, OrdersTable, OrderType, NewOrderType } from "@/app/lib/Drizzle";
import { randomUUID } from "crypto";
import { cookies } from "next/dist/client/components/headers";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
    try {
        const data: OrderType[] = await db.select().from(OrdersTable).where(eq(OrdersTable.user_id, cookies().get("user_id")?.value as string))
        return NextResponse.json({ data })
    }
    catch (error) {
        console.log((error as { message: string }).message);
        return NextResponse.json({ message: "Something Went Wrong!" })
    }
}


export async function POST(request: NextRequest) {
    const req = await request.json()
    console.log(req);
    const user_id = randomUUID()
    if (!cookies().get("user_id")?.value) {
        cookies().set("user_id", user_id)
    }

    try {
        if (cookies().get("user_id")?.value) {
            const data: NewOrderType[] = await db.insert(OrdersTable).values({
                product_id: req.product_id,
                user_id: cookies().get("user_id")?.value as string,
                quantity: req.quantity,
            }).returning()

            return NextResponse.json({ message: "Task Added Successfully!", data })
        }
        else {
            throw new Error("Orders field is Required")
        }
    }
    catch (error) {
        console.log((error as { message: string }).message);
    }
}