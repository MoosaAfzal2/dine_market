import { NextRequest, NextResponse } from "next/server";
// import { db } from "@vercel/postgres";
import { db, OrdersTable, OrderType, NewOrderType } from "@/app/lib/Drizzle";
import { sql } from "@vercel/postgres"

export async function GET(request: NextRequest) {
    // const client = await db.connect()
    try {
        // const data = await sql`SELECT * from orders`;
        // await sql`TRUNCATE orders`
        const data: OrderType[] = await db.select().from(OrdersTable)
        console.log(data);

        return NextResponse.json({ data })
    }
    catch (error) {
        console.log((error as { message: string }).message);
        return NextResponse.json({ message: "Something Went Wrong!" })
    }
}


export async function POST(request: NextRequest) {
    // const client = await db.connect()
    const req = await request.json()
    try {
        if (req.id) {
            // await sql`INSERT INTO Todos (Task) VALUES(${req.Task})`
            const data: NewOrderType[] = await db.insert(OrdersTable).values({
                id: "123",
                title: "Brushed Raglan Sweatshirt",
                quantity: 1,
                sub_total: 195
            }).returning()

            return NextResponse.json({ message: "Task Added Successfully!", data })
        }
        else {
            throw new Error("Task field is Required")
        }
    }
    catch (error) {
        console.log((error as { message: string }).message);
    }
}