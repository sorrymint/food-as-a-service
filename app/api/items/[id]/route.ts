import { NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { dishes } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const awaitedParams = await params;
    const id = Number(awaitedParams.id);

    if (isNaN(id)) {
        return NextResponse.json({ error: 'Invalid item ID' }, { status: 400 });
    }

    try {
        const [item] = await db.select().from(dishes).where(eq(dishes.id, id));
        if (!item) {
            return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        }
        return NextResponse.json(item);
    } catch (error) {
        console.error('GET item by id error:', error);
        return NextResponse.json({ error: 'Failed to fetch item' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const awaitedParams = await params;
    const id = Number(awaitedParams.id);

    if (isNaN(id)) {
        return NextResponse.json({ error: 'Invalid item ID' }, { status: 400 });
    }

    try {
        await db.delete(dishes).where(eq(dishes.id, id));
        return NextResponse.json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Delete failed:', error);
        return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
    }
}
