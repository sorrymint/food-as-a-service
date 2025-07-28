"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { getOrderById } from "@/lib/orders";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function Receipt() {
    const { orderId } = useParams();
    const order = getOrderById(orderId as string);

    if (!order) return notFound();

    const totalPrice = order.items.reduce((sum, item) => sum + item.price, 0);

    return (
        <Card className="w-full max-w-3xl mx-auto mt-20">
            <CardHeader>
                <CardTitle className="text-3xl font-bold">
                    Receipt for Order #{order.id}
                </CardTitle>
                <CardDescription>
                    <div className="flex flex-col">
                        <p className="text-md font-bold">{order.date}</p>
                    </div>
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex flex-col w-full">
                        <ul className="mb-4 space-y-1 list-disc list-inside">
                            {order.items.map((item, i) => (
                                <li key={i}>
                                    {item.name} — ${item.price.toFixed(2)}
                                </li>
                            ))}
                        </ul>
                        <hr className="w-full border-gray-300 mt-3"/>
                        <p className="text-md mt-3 text-gray-500">${totalPrice.toFixed(2)} · {order.items.length} items</p>
                    </div>
                </div>        
            </CardContent>
            <CardFooter className="flex-col gap-2">
                {/* footer */}
            </CardFooter>
        </Card>
    )
}