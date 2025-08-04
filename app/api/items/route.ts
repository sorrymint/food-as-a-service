import { NextResponse } from 'next/server'
import { db } from "@/lib/db/drizzle";
import { dishes } from "@/uml_designs/schema";

export async function GET() {
  try {
    const menuItems = await db.select().from(dishes);
    return NextResponse.json(menuItems)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 })
  }
}