"use server"
import { dishFormSchema, DishForm } from "@/lib/zodSchema/zodSchemas"


export async function createDish(newDish: unknown) {
    // Server-Side Validation
  console.log("Creating Dish Action Called")

  const results = dishFormSchema.safeParse(newDish);

// Checking for any errors
if (!results.success) {
    // console.log(results.error.issues)
    let errorMessage = "";

    // If we werer to add toast goo way to incoparte error Message.
    results.error.issues.forEach((issue) => {
        errorMessage =
            errorMessage + issue.path[0] + ": " + issue.message + ". ";
    });

    console.log(results.error);

    return{
        error: errorMessage,
    };
}

}

// export {CreateDish}