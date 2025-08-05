'use server';
import { dishFormSchema, DishType } from "@/lib/zodSchema/zodSchemas";
import { db } from "@/lib/db/drizzle";
import { dishes } from "@/lib/db/schema";
import { redirect } from "next/navigation";
import { DishFormState, StringMap } from "@/app/actions/DishHelpers";
import { convertZodErrors } from "@/app/actions/errors";
import { toast } from "sonner";

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

  console.log("Unvalidated Data: ", unvalidatedDish.isActive);
  const validatedDish = dishFormSchema.safeParse(unvalidatedDish);

  // Checking for any errors
  if (!validatedDish.success) {
    // if so converts into more readable error of the field name and its message
    const errors = convertZodErrors(validatedDish.error);


    const dishData = {
      businessId: Number(formData.get("businessId")) || 1,
      name: formData.get("name") as string,
      isActive: formData.get("isActive") === null ? false : true,
      description: formData.get("description") as string,
      image: formData.get("image") as string,
      price: formData.get("price") as string,
    };
    return { errors, data: dishData };
  } else {
    console.log(validatedDish.data.name, "Has been Added!!");

    // For testing returns to nowhere.
    // return {
    //   successMsg: "Deal add successfully",
    //   errors: {},
    //   data: {
    //     businessId: 0,
    //     name: "",
    //     description: "",
    //     price: "",
    //     isActive: false,
    //     image: "",
    //   },
    // };
    console.log("validated data: ", validatedDish.data.isActive, "and the type", typeof validatedDish.data.isActive);

    // For Database
    try {
      await db.insert(dishes).values({
        businessId: validatedDish.data.businessId,
        name: validatedDish.data.name,
        isActive: validatedDish.data.isActive,
        description: validatedDish.data.description,
        image: validatedDish.data.image,
        price: validatedDish.data.price,
      });
    } catch (err) {
      console.log(err);
    }
    redirect("/menu");
  }


}
