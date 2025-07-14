import { z } from "zod";

export const dishFormSchema = z.object({
    business_id: z.string().min(1, "Id cant be less than 0"),

    name: z.string()
    .min(1, "Name field can't be empty"),

    active: z.boolean().optional(),

    discription: z.string().min(10, "Discription must be at least 10 characters")
    .max(500, "Discription must be at most 500 characters"), 

    //making this into a URl(add .url())
    image: z.string().optional(),
    price: z.string().min(4, "Enter a valid Price ex: 3.00")
})

export type DishForm = z.infer<typeof dishFormSchema>;