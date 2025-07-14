"use server"
import { dishFormSchema, DishForm } from "@/lib/zodSchema/zodSchemas"


export async function createDish(state: any, formData: FormData) {
  console.log("Creating Dish Action Called")
const validatedFields = dishFormSchema.safeParse({
    business_id: formData.get("business_id"),
    name: formData.get("name"),
    isActive: formData.get("isActive") === 'on',
    discription: formData.get("discription"),
    image: formData.get("image"),
    price: formData.get("price")
})


if(!validatedFields.success){
    return{
        erorrs: validatedFields.error.flatten().fieldErrors,
    }
}
console.log(validatedFields.data)

}

// export {CreateDish}