"use server";

import { eq } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import { dishes, DishEnum, dishStatusValues } from "@/lib/db/schema";
import { redirect } from "next/navigation";

export async function createDishForHandling(formData: FormData){

    // Include form validation with zod
    try{
        await db
        .insert(dishes)
        .values({
            businessId: formData.get('business_id') as unknown as number,
            name: formData.get('name') as string,
            description: formData.get('description') as string,
            imageUrl: formData.get('image') as string,
            price: formData.get('price') as string
        });

        const dishStatus = formData.get("active")?.toString();
        if (!Object.values(dishStatusValues).includes(dishStatus as DishEnum)) {
            console.error(`Invalid status: ${dishStatus}`);
            return null;
        }
        return {
            active: dishStatus as DishEnum,
        };
    }
    catch (err) {
        console.log(err);
    };
    redirect("/menu");
    
}

export async function GetAllDishes() {
    try{
        const res = await db
        .select()
        .from(dishes);
        // console.log(res);
        return res;
    } catch(err){
        console.log(err);
        throw err;
    } 
}

export async function GetDishById( id : number ) {
    try{
        const [res] = await db
        .select()
        .from(dishes)
        .where(eq(dishes.id, id));

        return res;

    } catch(err) {
        console.log(err);
        throw err;
    };
}

// "use server";

// import { eq } from "drizzle-orm";
// import { db } from "@/lib/db/drizzle";
// import { dishes, DishEnum, dishStatusValues } from "@/lib/db/schema";
// import { redirect } from "next/navigation";

// export async function createDishForHandling(formData: FormData){

//     // Include form validation with zod
//     try{
//         await db
//         .insert(dishes)
//         .values({
//             businessId: formData.get('business_id') as unknown as number,
//             name: formData.get('name') as string,
//             description: formData.get('description') as string,
//             imageUrl: formData.get('image') as string,
//             price: formData.get('price') as string
//         });

//         const dishStatus = formData.get("active")?.toString();
//         if (!Object.values(dishStatusValues).includes(dishStatus as DishEnum)) {
//             console.error(`Invalid status: ${dishStatus}`);
//             return null;
//         }
//         return {
//             active: dishStatus as DishEnum,
//         };
//     }
//     catch (err) {
//         console.log(err);
//     };
//     redirect("/menu");
    
// }

// export async function GetAllDishes() {
//     try{
//         const res = await db
//         .select()
//         .from(dishes);
//         // console.log(res);
//         return res;
//     } catch(err){
//         console.log(err);
//         throw err;
//     } 
// }

// export async function GetDishById( id : number ) {
//     try{
//         const [res] = await db
//         .select()
//         .from(dishes)
//         .where(eq(dishes.id, id));

//         return res;

//     } catch(err) {
//         console.log(err);
//         throw err;
//     };
// }

// export type DeleteDishState = {
//   success?: boolean;
//   error?: string;
//   message?: string;
// };
// export const DeleteDishAction = async (
//   dishId: number,
//   prevState: DeleteDishState
// ): Promise<DeleteDishState> => {
//   try {
//     const initialId = dishId;

//     await db
//     .delete(dishes)
//     .where(eq(dishes.id, initialId));

//     console.log(`Deleted dish with ID: ${dishId}`);

//     return {
//       success: true,
//       message: "Delete was Sucessfull"
//     };
//   } catch (error) {
//     console.error("Delete failed:", error);

//     return {
//       error: 'Failed to delete dish', 
//       message: error instanceof Error ? error.message : 'Unknown error' 
//     };
//   }
// }