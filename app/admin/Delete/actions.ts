"use server";

import { DishFormState } from "@/app/actions/DishHelpers";
import { convertZodErrors } from "@/app/actions/errors";
import { db } from "@/lib/db/drizzle";
import { dishes } from "@/lib/db/schema";
import { DishType } from "@/lib/zodSchema/zodSchemas";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

// Adjust import path as needed
export type DeleteDishState = {
  success?: boolean;
  error?: string;
  message?: string;
};
export const DeleteDishAction = async (
  dishId: number,
  prevState: DeleteDishState
): Promise<DeleteDishState> => {
  try {
    const initialId = dishId;

    await db
    .delete(dishes)
    .where(eq(dishes.id, initialId));

    console.log(`Deleted dish with ID: ${dishId}`);

    return {
      success: true,
      message: "Delete was Sucessfull"
    };
  } catch (error) {
    console.error("Delete failed:", error);

    return {
      error: 'Failed to delete dish', 
      message: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};
