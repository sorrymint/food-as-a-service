'use server';
import { dishFormSchema, DishType } from "@/lib/zodSchema/zodSchemas";
import { db } from "@/lib/db/drizzle";
import { dishes } from "@/lib/db/schema";
import { redirect } from "next/navigation";
import { DishFormState, StringMap } from "@/app/actions/DishHelpers";
import { convertZodErrors } from "@/app/actions/errors";
import { unknown } from "zod";
import { boolean } from "drizzle-orm/gel-core";

export const createDishAction = async(
  prevState: DishFormState<DishType>,
  formData: FormData
): Promise<DishFormState<DishType>>  => {
  // Server-Side Validation
  console.log("Creating Dish Action Called");

  // Unvalidated Data
  const unvalidatedDish: StringMap = {
    businessId: formData.get("businessId") as string,
    name: formData.get("name") as string,
    isActive: formData.get("isActive") === null ? "false" : "true",
    description: formData.get("description") as string,
    image: formData.get("image") as string,
    price: formData.get("price") as string,
  };

  const validatedDish = dishFormSchema.safeParse(unvalidatedDish);

  // Checking for any errors
  if (!validatedDish.success) {
    // if so converts into more readable error of the field name and its message
    const errors = convertZodErrors(validatedDish.error);

    const dishData = {
      businessId: Number(formData.get("businessId")) || 1,
      name: formData.get("name") as string,
      active: formData.get("isActive") === null ? false : true,
      description: formData.get("description") as string,
      image: formData.get("image") as string,
      price: formData.get("price") as string,
    };
    return { errors, data: dishData };
  } else {
    return {
      successMsg: "Deal add successfully",
      errors: {},
      data: {
        businessId: 0,
        name: "",
        description: "",
        price: "",
        active: false,
        image: "",
      },
    };
  }

  // try {
  //   await db.insert(dishes).values({
  //     businessId: businessIdInt,
  //     name: results.data.name,
  //     active: true,
  //     description: results.data.description,
  //     image: results.data.image,
  //     price: results.data.price,
  //   });
  // } catch (err) {
  //   console.log(err);
  // }
  // redirect("/menu");
}

// export {CreateDish}
// results.error.issues.forEach((issue) => {
//   errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ". ";
// });

// console.log(results.error);

// return {
//   error: errorMessage,
// };
