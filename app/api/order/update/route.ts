import { NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { customer_order } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateFields } = body;

    console.log('Incoming update fields:', updateFields);

    const allowedFields = ['name', 'quantity', 'ordersId', 'menuItemId', 'customerId', 'deliveryId'];

    const filteredFields = Object.fromEntries(
      Object.entries(updateFields).filter(([key]) => allowedFields.includes(key))
    );

    if (Object.keys(filteredFields).length === 0) {
      console.warn('No valid fields passed to update');
      return NextResponse.json({ error: 'No valid fields provided to update' }, { status: 400 });
    }

    const [updatedOrder] = await db.update(customer_order)
      .set(filteredFields)
      .where(eq(customer_order.id, id))
      .returning();

    if (!updatedOrder) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error('Failed to update order:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}