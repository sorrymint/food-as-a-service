"use server";

import { eq } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import { dishes, dishStatusValues } from "@/lib/db/schema";
import { redirect } from "next/navigation";


export async function createDishForHandling(formData: FormData){
    // Include form validation with zod
    try{
     await db
     .insert(dishes)
     .values({
        businessId: formData.get('business_id') as unknown as number,
        name: formData.get('name') as string,
        active: formData.get('isActive') as ,
        description: formData.get('description') as string,
        imageUrl: formData.get('image') as string,
        price: formData.get('price') as string
    });
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