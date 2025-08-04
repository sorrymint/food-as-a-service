"use server";

import { db } from "@/lib/db/drizzle";
import { dish_ingredients, dishes } from "@/lib/db/schema";
import { eq } from 'drizzle-orm';
import { redirect } from "next/navigation";

export async function createDishForHandling(formData: FormData){
    // Include form validation with zod
    try{
    await db.insert(dishes).values({
        businessId: formData.get('business_id') as unknown as number,
        name: formData.get('name') as string,
        active: formData.get('isActive') as unknown as boolean,
        description: formData.get('discription') as string,
        image: formData.get('image') as string,
        price: formData.get('price') as string,
    });
    }
    catch (err) {
        console.log(err);
    };
    redirect("/menu");
}

export async function GetAllIngredientsWithDishId(dishId: number) {

    try{
        const res = await db
        .select()
        .from(dish_ingredients)
        .where(eq(dish_ingredients.dishId, dishId))

        // console.log(res);

        return res;

    }catch(err){
        console.error(err);
        throw err;
    }
}