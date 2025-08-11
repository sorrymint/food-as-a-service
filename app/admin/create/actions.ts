"use server";
import { dishFormSchema, dishStatusSchema } from "@/lib/zodSchema/zodSchemas";
import { db } from "@/lib/db/drizzle";
import { dishes, dishStatusValues } from "@/lib/db/schema";
import { redirect } from "next/navigation";

export async function createDish(newDish: unknown) {
  // Server-Side Validation
  console.log("Creating Dish Action Called");

  const results = dishFormSchema.safeParse(newDish);
  const businessIdInt: number = Number(results.data?.businessId);
  // document.getElementById("activeStatus")!.addEventListener("submit", (e) => {
  // e.preventDefault();

  // const form = e.target as HTMLFormElement;
  // Checking for any errors
  if (!results.success) {
    // console.log(results.error.issues)
    let errorMessage = "";

    // If we werer to add toast goo way to incoparte error Message.
    results.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ". ";
    });

    console.log(results.error);

    return {
      error: errorMessage,
    };
  }

  try {
    const validatedStatus = dishStatusSchema.parse(dishStatusValues);
    console.log('Validated Dish Status:', validatedStatus);
  } catch (error) {
    console.error('Validation Error:', error);
  }

  try {
    await db.insert(dishes).values({
      businessId: businessIdInt,
      name: results.data.name,
      active: results.data.active,
      description: results.data.description,
      imageName: results.data.imageName,
      imageUrl: results.data.imageUrl,
      price: results.data.price,
    });
  } catch (err) {
    console.log(err);
  }
  redirect("/menu");
};

