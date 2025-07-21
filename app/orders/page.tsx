"use client"

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

export default function PastOrders() {

    const orders = [
        {
            date: "March 12, 2025",
            price: 16.34,
            items: "Cheese Burger · Small Fries · Large Drink",
            totalItems: 3,
        },
        {
            date: "December 8, 2024",
            price: 38.58,
            items: "2x Cheese Burger · 2x Medium Medium Fries · 2x Medium Drink",
            totalItems: 6,
        },
        {
            date: "October 3, 2024",
            price: 25.74,
            items: "Steak · Mashed Potatoes · Steak Sauce · Small Drink",
            totalItems: 4,
        },
    ]

    return (
        <Card className="w-full max-w-6xl mx-auto mt-20">
            <CardHeader>
                <CardTitle className="text-3xl font-bold">Orders</CardTitle>
                <CardDescription>
                    {/* description */}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                {orders.map((order, index) => 
                    <div key={index} className="border rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex flex-col">
                            <p className="text-lg font-bold">{order.date}</p>
                            <p className="text-sm text-gray-500">${order.price} · {order.totalItems} items</p>
                            <p className="text-sm mt-1">{order.items}</p>

                            <div className="flex items-center gap-2 mt-2">
                                <Star/> <Star/> <Star/> <Star/> <Star/>
                                <p className="text-sm text-gray-500">Leave a review</p>
                            </div>
                        </div>

                        <div className="flex gap-2 w-full md:w-auto">
                            <Link href="/orders/reorder">
                                <Button>
                                    <ShoppingCart/>
                                    Reorder
                                </Button>
                            </Link>
                            <Link href="/orders/receipt">
                                <Button>
                                    <ReceiptText/>
                                    View Receipt
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}            
            </CardContent>
            <CardFooter className="flex-col gap-2">
                {/* footer */}
            </CardFooter>
        </Card>
    )
}