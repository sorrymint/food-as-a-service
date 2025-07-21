import { db } from '@/lib/db/drizzle';
import { cartItems, dishes} from '@/lib/db/schema';
import { eq, and, sum } from 'drizzle-orm';

const cartItemsData = await db.select({
        price: cartItems.price,
        quantity: cartItems.quantity,
    }).from(cartItems).where(eq(cartItems.orderId, orderId));

    const totalAmount = cartItemsData.reduce((acc, item) => acc + item.price * item.quantity, 0);


async function addItemToCart(orderId: number, menuItem: number, quantity: number, price: number) {
    await db.insert(cartItems).values({
        orderId,
        menuItem,
        quantity,
        priceAtAddition: price.toString(),
    });
}

async function updateItemInCart(orderId: number, menuItem: number, quantity: number, price: number) {
    await db
    .update(cartItems)
    .set({ quantity })
    .where(and(eq(cartItems.orderId, orderId), eq(cartItems.menuItem, menuItem)));
}


export default function Cart() {
    

  return (
    
  )
}

