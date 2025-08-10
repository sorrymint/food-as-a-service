"use server";

import { description } from "@/components/chart-area-interactive";
import { db } from "@/lib/db/drizzle";
import { dish_ingredients, dishes, ingredients } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function createDishForHandling(formData: FormData) {
  // Include form validation with zod
  try {
    await db.insert(dishes).values({
        businessId: formData.get('business_id') as unknown as number,
        name: formData.get('name') as string,
        isActive: formData.get('isActive') as unknown as boolean,
        description: formData.get('discription') as string,
        image: formData.get('image') as string,
        price: formData.get('price') as string,
    });
  } catch (err) {
    console.log(err);
  }
  redirect("/menu");
}

export async function GetAllDishes() {
    try{
        const res = await db
        .select()
        .from(dishes);
        // console.log(res);
        return res;
    } catch(err){
        console.log(err);
        throw err;
    } 
}

export async function GetDishById( id : number ) {
    try{
        const [res] = await db
        .select()
        .from(dishes)
        .where(eq(dishes.id, id));

        return res;

    } catch(err) {
        console.log(err);
        throw err;
    };
}

export type DeleteDishState = {
  success?: boolean;
  error?: string;
  message?: string;
};
export const DeleteDishAction = async (
  dishId: number,
  prevState: DeleteDishState
): Promise<DeleteDishState> => {
  try {
    const initialId = dishId;

    await db
    .delete(dishes)
    .where(eq(dishes.id, initialId));

    console.log(`Deleted dish with ID: ${dishId}`);

    return {
      success: true,
      message: "Delete was Sucessfull"
    };
  } catch (error) {
    console.error("Delete failed:", error);

    return {
      error: 'Failed to delete dish', 
      message: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

export async function GetAllIngredientsWithDishId(dishId: number) {
  try {
    const res = await db
      .select()
      .from(dish_ingredients)
      .where(eq(dish_ingredients.dishId, 1));

    console.log(res);

    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getAllIngredientsJoined(IntId: number) {
  try {
    const subResult = await db
      .select({
        name: dish_ingredients.ingredientName,
        IngredientId: dish_ingredients.ingredientId,
        quantity: dish_ingredients.quantity,
      })
      .from(dish_ingredients)
      .where(eq(dish_ingredients.dishId, IntId))
      .as("dish_details");

    const result = await db
      .select({
        id: ingredients.id,
        name: ingredients.name,
        othername: subResult.name,
        des: ingredients.description,
        quantity: subResult.quantity,
      })
      .from(ingredients)
      .innerJoin(subResult, eq(ingredients.id, subResult.IngredientId));

    return result;
  } catch (err) {
    throw err;
  }
}
