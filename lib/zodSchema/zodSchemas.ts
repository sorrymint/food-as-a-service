import { z } from "zod";

export const dishFormSchema = z.object({
    id: z
    .number()
    .optional(),

    businessId: z
    .number()
    .positive({message: "Must be postive"}),

    name: z
    .string()
    .min(1, "Name field can't be empty"),

    active: z.coerce
    .boolean()
    .nullable(),

    description: z
    .string()
    .min(10, "description must be at least 10 characters")
    .max(500, "description must be at most 500 characters"), 

    //making this into a URl(add .url())
    image: z
    .string()
    .nullable(),

    price: z.coerce
    .string({message: "Price is required"})
    .min(4, "Enter a valid Price ex: 3.00")
})

export type DishType = z.infer<typeof dishFormSchema>;