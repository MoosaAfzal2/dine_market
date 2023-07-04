import { NextRequest, NextResponse } from "next/server";
import { db, OrdersTable, OrderType } from "@/app/lib/Drizzle";
import { and, eq } from "drizzle-orm";
import { getAuth } from "@clerk/nextjs/server";

// To Get a specific Product
export async function GET(request: NextRequest, { params }: { params: { product_id: string } }) {
    try {
        const { userId } = getAuth(request);
        const data: OrderType[] = await db.select().from(OrdersTable).where(and(
            eq(OrdersTable.user_id, userId as string),
            eq(OrdersTable.product_id, params.product_id)
        ))
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