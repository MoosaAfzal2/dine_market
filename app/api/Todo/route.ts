// import { NextRequest, NextResponse } from "next/server";
// // import { db } from "@vercel/postgres";
// import { db, TodoTable, TodoType, NewTodoType } from "@/app/lib/Drizzle";
// import { sql } from "@vercel/postgres"

// export async function GET(request: NextRequest) {
//     // const client = await db.connect()
//     try {
//         await sql`CREATE TABLE IF NOT EXISTS Todos(id serial, Task varchar(255))`

//         const res: TodoType[] = await db.select().from(TodoTable)
//         return NextResponse.json({ data: res })
//     }
//     catch (error) {
//         console.log((error as { message: string }).message);
//         return NextResponse.json({ message: "Something Went Wrong!" })
//     }
// }


// export async function POST(request: NextRequest) {
//     // const client = await db.connect()
//     const req = await request.json()
//     try {
//         if (req.Task) {
//             // await sql`INSERT INTO Todos (Task) VALUES(${req.Task})`
//             const res = await db.insert(TodoTable).values({
//                 Task: req.Task
//             }).returning()

//             return NextResponse.json({ message: "Task Added Successfully!" , data : res})
//         }
//         else {
//             throw new Error("Task field is Required")
//         }
//     }
//     catch (error) {
//         console.log((error as { message: string }).message);
//     }
// }