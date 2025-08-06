import { z } from "zod";

export const dishFormSchema = z.object({
<<<<<<< HEAD
    id: z
    .number()
    .optional(),
=======
    id: z.number().optional(),
    businessId: z.number().min(1, "Id cant be less than 0"),
>>>>>>> ecc7f187123b8a3877d7336ce419e0080f4c2cee

    businessId: z
    .coerce
    .number()
    .positive({message: "Must be postive"}),

    name: z
    .string()
    .min(1, "Name field can't be empty"),

<<<<<<< HEAD
    isActive: z.coerce
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
=======
    active: z.boolean(),

    description: z.string().min(10, "description must be at least 10 characters")
    .max(500, "description must be at most 500 characters"), 
    tags: z.string().nullable(),

    //making this into a URl(add .url())
    image: z.string().nullable(),
    price: z.string().min(4, "Enter a valid Price ex: 3.00").nullable()
>>>>>>> ecc7f187123b8a3877d7336ce419e0080f4c2cee
})

export type DishType = z.infer<typeof dishFormSchema>;