"use server";

import { db } from "@/lib/db/drizzle";
import { dishes } from "@/lib/db/schema";
import { redirect } from "next/navigation";

export async function createDishForHandling(formData: FormData){
    // Include form validation with zod
    try{
    await db.insert(dishes).values({
        businessId: formData.get('business_id') as unknown as number,
        name: formData.get('name') as string,
        active: formData.get('isActive') as unknown as boolean,
        description: formData.get('discription') as string,
        image: formData.get('image') as string,
        price: formData.get('price') as string,
    });
    }
    catch (err) {
        console.log(err);
    };
    redirect("/menu");
}