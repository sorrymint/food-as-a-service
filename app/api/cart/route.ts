import { NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { customer_order, dishes } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
    try {
        const items = await db
            .select({
                id: customer_order.id,
                name: customer_order.name,
                price: dishes.price,
            })
            .from(customer_order)
            .leftJoin(dishes, (tableAliases) =>
                eq(dishes.id, customer_order.menuItem)
            );

        return NextResponse.json(items);
    } catch (error) {
        console.error('Failed to fetch cart items', error);
        return NextResponse.json({ error: 'Failed to fetch cart items' }, { status: 500 });
    }
}