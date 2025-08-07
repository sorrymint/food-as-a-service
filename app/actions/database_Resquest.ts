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
      businessId: formData.get("business_id") as unknown as number,
      name: formData.get("name") as string,
      active: formData.get("isActive") as unknown as boolean,
      description: formData.get("discription") as string,
      image: formData.get("image") as string,
      price: formData.get("price") as string,
    });
  } catch (err) {
    console.log(err);
  }
  redirect("/menu");
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
