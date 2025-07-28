"use server"

import { db } from "@/lib/db/drizzle";
import { dishes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { error } from "node:console";

export async function UpdateDish(dish: unknown) {
  return (
    console.log("Updating item, ")


  )
}

export async function getDishes(dishId: number) {
  try {
    const res = await db.select()
    .from(dishes)
    .where(eq(dishes.id, dishId));
    
    console.log(res);

    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
}