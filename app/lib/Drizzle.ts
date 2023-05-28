import { integer, pgTable, varchar } from "drizzle-orm/pg-core"
import { InferModel } from "drizzle-orm"
import { drizzle } from "drizzle-orm/vercel-postgres"
import { sql } from "@vercel/postgres"

export const OrdersTable = pgTable("orders", {
    id: varchar("id", { length: 255 }).primaryKey().notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    quantity: integer("quantity").notNull(),
    sub_total: integer("sub_total").notNull()
})


export type OrderType = InferModel<typeof OrdersTable>
export type NewOrderType = InferModel<typeof OrdersTable, "insert">

export const db = drizzle(sql)