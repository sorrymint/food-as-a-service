export default function Cart() {
  return (
    <div className='flex justify-center items-center'>
        <h1>Cart Page</h1>
    </div>
  )
}

// import { db } from '@/lib/db/drizzle';
// import { cartItems, dishes, orders} from '@/lib/db/schema';
// import { eq } from 'drizzle-orm';
// import Stripe from 'stripe';
// // import { CheckoutForm } from '@/purchase/_components/CheckoutForm';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

// export default async function CartPage() {

//     type CartItemWithPrice = {
//         price: string;   
//         quantity: number;  
//     };

//     const cartItemsData: CartItemWithPrice[] = await db
//     .select({
//         price: dishes.price,
//         quantity: cartItems.quantity,
//     })
//     .from(cartItems)
//     .innerJoin(dishes, eq(dishes.id, cartItems.menuItem))
//     .where(eq(cartItems.orderId, orders.id));

//     const totalAmount = cartItemsData.reduce((acc, item) => {
//     const price = parseFloat(item.price); // convert string to number
//     return acc + price * item.quantity;
//     }, 0);

//     // const cartItemsData = await db
//     // .select({
//     //     price: dishes.price,
//     //     quantity: cartItems.quantity,
//     // })
//     // .from(cartItems)
//     // .innerJoin(dishes, eq(dishes.id, cartItems.menuItem))
//     // .where(eq(cartItems.orderId, orders.id));

//     // const totalAmount = cartItemsData.reduce((acc, item) => acc + item.price * item.quantity, 0);

//     const paymentIntent = await stripe.paymentIntents.create({
//         amount: totalAmount * 100,
//         currency: 'usd',
//         metadata: { orderId: orders.id.toString() },
//     });

//     if (paymentIntent.client_secret == null) {
//         throw Error ("Stripe failed to create a payment intent")
//     }

//     // await stripe.paymentIntents.update(paymentIntentId, {
//     //  amount: updatedTotalAmount * 100,
//     // });

//     return (
//     <div className='flex justify-center items-center'>
//         <h1>Cart Page</h1>
//         {/* <CheckoutForm dishes={dishes} clientSecret={paymentIntent.client_secret}/> */}
//     </div>
//     )        
// }
