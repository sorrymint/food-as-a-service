import { db } from '@/lib/db/drizzle';
import { dishes } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const id = parseInt(params.id);

    try {
        const dish = await db.select().from(dishes).where(eq(dishes.id, id)).limit(1);

        if (dish.length === 0) {
            return NextResponse.json({ error: 'Dish not found' }, { status: 404 });
        }

        return NextResponse.json(dish[0]);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch dish' }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    const data = await req.json();

    try {
        const result = await db
            .update(dishes)
            .set({
                name: data.name,
                description: data.description,
                active: data.active,
                image: data.image,
                price: data.price,
                updatedAt: new Date(),
            })
            .where(eq(dishes.id, id));

        return NextResponse.json({ success: true, result });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to update dish' }, { status: 500 });
    }
}
