'use server';
import { dishFormSchema, DishType, dishStatusSchema } from "@/lib/zodSchema/zodSchemas";
import { db } from "@/lib/db/drizzle";
import { dishes, dishStatus, dishStatusValues } from "@/lib/db/schema";
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
    // active: formData.get("active"),
    description: formData.get("description") as string,
    image: formData.get("image") as string,
    price: formData.get("price") as string,
  };

  const validatedDish = dishFormSchema.safeParse(unvalidatedDish);
  try {
    const validatedStatus = dishStatusSchema.parse(dishStatusValues);
    console.log('Validated Dish Status:', validatedStatus);
  } catch (error) {
    console.error('Validation Error:', error);
  }

  
  const activeRaw = formData.get('active');
  const activeString = typeof activeRaw === 'string' ? activeRaw : ''; // Handle null/File by defaulting to empty string or other suitable value

  let active: "Active - In Stock" | "Discontinued" | "Out of Stock";

  switch (activeString) {
    case "Active - In Stock":
      active = "Active - In Stock";
      break;
    case "Discontinued":
      active = "Discontinued";
      break;
    case "Out of Stock":
      active = "Out of Stock";
      break;
    default:
      active = "Out of Stock"; // Default value for unexpected inputs
  }


  // Checking for any errors
  if (!validatedDish.success) {
    // if so converts into more readable error of the field name and its message
    const errors = convertZodErrors(validatedDish.error);


    const dishData = {
      businessId: Number(formData.get("businessId")) || 1,
      name: formData.get("name") as string,
      active: active,
      description: formData.get("description") as string,
      imageName: formData.get("imageName") as string,
      imageUrl: formData.get("imageUrl") as string,
      price: formData.get("price") as string,
    };
    return { errors, data: dishData }
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
    // console.log("validated data: ", validatedDish.data.active, "and the type", typeof validatedDish.data.active);

    // For Database
    try {
      await db.insert(dishes).values({
        businessId: validatedDish.data.businessId,
        name: validatedDish.data.name,
        active: validatedDish.data.active,
        description: validatedDish.data.description,
        imageName: validatedDish.data.imageName,
        imageUrl: validatedDish.data.imageUrl,
        price: validatedDish.data.price,
      });
    } catch (err) {
      console.log(err);
    }
    redirect("/menu");
  }

}






// "use server";
// import { dishFormSchema, dishStatusSchema } from "@/lib/zodSchema/zodSchemas";
// import { db } from "@/lib/db/drizzle";
// import { dishes, dishStatusValues } from "@/lib/db/schema";
// import { redirect } from "next/navigation";

// export async function createDish(newDish: unknown) {
//   // Server-Side Validation
//   console.log("Creating Dish Action Called");

//   const results = dishFormSchema.safeParse(newDish);
//   const businessIdInt: number = Number(results.data?.businessId);
//   // document.getElementById("activeStatus")!.addEventListener("submit", (e) => {
//   // e.preventDefault();

//   // const form = e.target as HTMLFormElement;
//   // Checking for any errors
//   if (!results.success) {
//     // console.log(results.error.issues)
//     let errorMessage = "";

//     // If we werer to add toast goo way to incoparte error Message.
//     results.error.issues.forEach((issue) => {
//       errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ". ";
//     });

//     console.log(results.error);

//     return {
//       error: errorMessage,
//     };
//   }

//   try {
//     const validatedStatus = dishStatusSchema.parse(dishStatusValues);
//     console.log('Validated Dish Status:', validatedStatus);
//   } catch (error) {
//     console.error('Validation Error:', error);
//   }

//   try {
//     await db.insert(dishes).values({
//       businessId: businessIdInt,
//       name: results.data.name,
//       active: results.data.active,
//       description: results.data.description,
//       imageName: results.data.imageName,
//       imageUrl: results.data.imageUrl,
//       price: results.data.price,
//     });
//   } catch (err) {
//     console.log(err);
//   }
//   redirect("/menu");
// };



