"use server"

import { db } from "@/lib/db/drizzle";
import { dishes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function UpdateDish(dish: unknown) {
  return (
    console.log("Updating item, ")


  )
}

export async function getDishes(dishId: number) {
  try {
    await db.select()
    .from(dishes)
    .where(eq(dishes.id, dishId))
  } catch (err) {
    console.log(err);
  }
  redirect("/menu");
}