import { pgTable, serial, varchar } from "drizzle-orm/pg-core"
import { InferModel } from "drizzle-orm"
import { drizzle } from "drizzle-orm/vercel-postgres"
import { sql } from "@vercel/postgres"

export const TodoTable = pgTable("todos", {
    id: serial("id").primaryKey(),
    Task: varchar("task", { length: 255 }).notNull()
})


export type TodoType = InferModel<typeof TodoTable>
export type NewTodoType = InferModel<typeof TodoTable, "insert">

export const db = drizzle(sql)
// db.insert(TodoTable).values