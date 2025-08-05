"use server";

import { DishFormState, StringMap } from "@/app/actions/DishHelpers";
import { convertZodErrors } from "@/app/actions/errors";
import { db } from "@/lib/db/drizzle";
import { dishes } from "@/lib/db/schema";
import { dishFormSchema, DishType } from "@/lib/zodSchema/zodSchemas";
import { eq } from "drizzle-orm";

export const  UpdateDish = async(prevState: DishFormState<DishType>,
  formData: FormData ): Promise<DishFormState<DishType>> => {
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
      isActive: formData.get("isActive") === null ? false : true,
      description: formData.get("description") as string,
      image: formData.get("image") as string,
      price: formData.get("price") as string,
    };
    return { errors, data: dishData };
  } else {

    // For Database
    try {
      await db
        .update(dishes)
        .set({
          businessId: validatedDish.data.businessId,
          name: validatedDish.data.name,
          isActive: validatedDish.data.isActive,
          image: validatedDish.data.image,
          price: validatedDish.data.price,
          updatedAt: new Date()
        })
        .where(eq(dishes.id, validatedDish.data.id as number))
        .returning();
    } catch (err) {
      throw err;
    }

    console.log('Update Complete')
    
    // For testing returns to nowhere.
    return {
      successMsg: "Update was successfull",
      errors: {},
      data: {
        businessId: 0,
        name: "",
        description: "",
        price: "",
        isActive: false,
        image: "",
      },
    };
  }
}

export async function getDishes(dishId: number) {
  try {
    const res = await db.select().from(dishes).where(eq(dishes.id, dishId));

    console.log(res);

    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
}


// 5	1	"Grilled Salmon Teriyaki"	"Succulent Fresh Atlantic salmon, expertly glazed with a rich homemade teriyaki sauce that boasts a perfect balance of sweet and savory, is beautifully plated alongside fluffy jasmine rice. Accompanying this delightful dish are vibrant, stir-fried seasonal vegetables, lightly sautéed to retain their crispness and color, creating a harmonious and visually appealing meal."	true	"/Placeholder.png"	22.50		"2025-08-05 14:45:16.524115"	"2025-08-05 14:45:16.524115"
// 6	1	"Mediterranean Veggie Platter"	"Savor the vibrant medley of grilled eggplant, zucchini, and sweet bell peppers, perfectly charred to bring out their natural flavors. Accompanied by thick slices of rich, slightly tangy halloumi cheese, this dish is served alongside a creamy hummus and refreshing tzatziki, both bursting with fresh herbs and spices. All of this is complemented by warm, fluffy pita bread, ideal for scooping up the delicious offerings."	true	"/Placeholder.png"	16.99		"2025-08-05 14:51:27.942854"	"2025-08-05 14:51:27.942854"
// 7	1	"Lemon Basil Chicken Pasta"	"Indulge in perfectly cooked al dente fettuccine, elegantly tossed with tender, grilled chicken pieces. This dish comes alive with vibrant sun-dried tomatoes that add a burst of sweetness, while fresh basil leaves contribute a fragrant herbal note. All of this is enveloped in a delicate, light lemon cream sauce that offers a bright and zesty finish, creating a truly delightful culinary experience."	true	"/Placeholder.png"	19.25		"2025-08-05 14:53:23.594954"	"2025-08-05 14:53:23.594954"