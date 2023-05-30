import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core"
import { InferModel } from "drizzle-orm"
import { drizzle } from "drizzle-orm/vercel-postgres"
import { sql } from "@vercel/postgres"

export const OrdersTable = pgTable("orders", {
    id: serial("id").primaryKey().notNull(),
    product_id: varchar("product_id", { length: 255 }).notNull(),
    user_id: varchar("user_id", { length: 255 }).notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    category: varchar("category", { length: 255 }).notNull(),
    quantity: integer("quantity").notNull(),
    price: integer("price").notNull(),
    image_url: varchar("image_url", { length: 255 }).notNull(),
})


export type OrderType = InferModel<typeof OrdersTable>
export type NewOrderType = InferModel<typeof OrdersTable, "insert">

export const db = drizzle(sql)