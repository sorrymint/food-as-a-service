"use client"

import { Rating, RatingButton } from '@/components/ui/rating';
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Star, ShoppingCart, ReceiptText } from "lucide-react"
import { orders } from "@/lib/orders"; 

export default function PastOrders() {
    return (
        <Card className="w-full max-w-6xl mx-auto mt-20">
            <CardHeader>
                <CardTitle className="text-3xl font-bold">Orders</CardTitle>
                <CardDescription>
                    {/* description */}
                </CardDescription>


            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                {orders.map((order, index) => {
                    const totalPrice = order.items.reduce((sum, item) => sum + item.price, 0);
                    return (
                        <div key={index} className="border rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="flex flex-col">
                                <p className="text-lg font-bold">{order.date}</p>
                                <p className="text-sm text-gray-500">
                                    ${totalPrice.toFixed(2)} · {order.items.length} items
                                </p>

                                <ul className="text-sm mt-1 list-disc list-inside">
                                    {order.items.map((item, i) => (
                                        <li key={i}>
                                            {item.name} — ${item.price.toFixed(2)}
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex items-center gap-2 mt-2">
                                    <Rating defaultValue={0}>
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <RatingButton key={index} />
                                        ))}
                                    </Rating>
                                    <p className="text-sm text-gray-500">Leave a review</p>
                                </div>
                            </div>

                            <div className="flex gap-2 w-full md:w-auto">
                                <Link href={`/orders/reorder/${order.id}`}>
                                    <Button>
                                        <ShoppingCart/>
                                        Reorder
                                    </Button>
                                </Link>
                                <Link href={`/orders/receipt/${order.id}`}>
                                    <Button>
                                        <ReceiptText/>
                                        View Receipt
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )
                })}            
            </CardContent>
            <CardFooter className="flex-col gap-2">
                {/* footer */}
            </CardFooter>
        </Card>
    )
}