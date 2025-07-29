"use server";
import { dishFormSchema } from "@/lib/zodSchema/zodSchemas";
import { db } from "@/lib/db/drizzle";
import { dishes } from "@/lib/db/schema";
import { redirect } from "next/navigation";

export async function createDish(newDish: unknown) {
  // Server-Side Validation
  console.log("Creating Dish Action Called");

  const results = dishFormSchema.safeParse(newDish);
  const businessIdInt: number = Number(results.data?.business_id);
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
    await db.insert(dishes).values({
      businessId: businessIdInt,
      name: results.data.name,
      active: true,
      description: results.data.discription,
      image: results.data.image,
      price: results.data.price,
    });
  } catch (err) {
    console.log(err);
  }
  redirect("/menu");
}

// export {CreateDish}
