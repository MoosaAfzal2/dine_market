import { defineType } from "sanity";

export const category = defineType({
    name: "category",
    type: "document",
    title: "Category",
    fields: [
        {
            name: "name",
            type: "string",
            title: "Category Name"
        }
    ]
})