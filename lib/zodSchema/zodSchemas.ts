import { z } from "zod";

export const dishFormSchema = z.object({
    id: z.number().optional(),
    businessId: z.number().min(1, "Id cant be less than 0"),

    name: z.string()
    .min(1, "Name field can't be empty"),

    active: z.boolean(),

    description: z.string().min(10, "description must be at least 10 characters")
    .max(500, "description must be at most 500 characters"), 
    tags: z.string().nullable(),

    //making this into a URl(add .url())
    image: z.string().nullable(),
    price: z.string().min(4, "Enter a valid Price ex: 3.00").nullable()
})

export type DishType = z.infer<typeof dishFormSchema>;