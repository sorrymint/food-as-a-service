import { db } from '@/lib/db/drizzle';
import { customer_order, orders } from '@/lib/db/schema';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { dishId, name, price, quantity } = body;

    // Example static businessId — replace with logic if needed
    const businessId = 1;

    const [newOrder] = await db.insert(orders).values({
      businessId,
      customerId: Number(session.user.id),
      quantity,
      deliveryStatus: 'pending',
      specialInstructions: '',
      createdAt: new Date(),
    }).returning();

    await db.insert(customer_order).values({
      ordersId: newOrder.id,
      name,
      customerId: Number(session.user.id),
      menuItem: dishId,
      quantity,
      deliveryStatus: 1, // TEMP: replace with actual delivery ID logic
    });
    console.log("inserted customer order")

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Order error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}