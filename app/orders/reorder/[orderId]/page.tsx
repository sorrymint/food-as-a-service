"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { ShoppingCart, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation";
import Link from "next/link"
import { getOrderById } from "@/lib/orders";
import { toast } from 'sonner';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function Reorder() {
    const { orderId } = useParams();

    const order = getOrderById(orderId as string);

    if (!order) return notFound();

    const [items, setItems] = useState([...order.items]);

    const handleRemove = (index: number) => {
        setItems((prev) => prev.filter((_, i) => i !== index));
    };

    const handleAdd = (item: { name: string; price: number }) => {
        setItems((prev) => [...prev, item]);
    };

    const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

    return (
        <Card className="w-full max-w-3xl mx-auto mt-20">
            <CardHeader>
                <CardTitle className="text-3xl font-bold">
                    Reorder Order #{order.id}
                </CardTitle>
                <CardDescription>
                    <div className="flex flex-col">
                        <p className="text-md font-bold">{order.date}</p>
                    </div>
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className="p-4 flex flex-col justify-between gap-4">
                    <ul className="mb-4 space-y-1">
                        {items.map((item, i) => (
                            <li
                                key={i}
                                className="flex justify-between items-center border p-2 rounded-xl"
                            >
                                <div>
                                    <p className="font-medium">• {item.name}</p>
                                    <p className="text-sm text-gray-500 ml-2">
                                        ${item.price.toFixed(2)}
                                    </p>
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleAdd(item)}
                                    >
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleRemove(i)}
                                    >
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <hr className="w-full border-gray-300 mt-3"/>
                    <p className="text-md mt-3 text-gray-500">
                    ${totalPrice.toFixed(2)} · {items.length} items
                    </p>

                    <Link href="#">
                        <Button 
                            onClick={() =>
                                toast.success(`Your order has been added to the cart!`, {
                                    description: "Check your cart to review your item.",
                                })
                            }
                        >
                            <ShoppingCart/>
                            Add to Cart
                        </Button>
                    </Link>
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                {/* footer */}
            </CardFooter>
        </Card>
    );
}