"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Cart() {
    const [cartItems, setCartItems] = useState<any[]>([]);

    useEffect(() => {
        fetch("/api/cart")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setCartItems(data);
                } else {
                    console.error("Expected an array but got:", data);
                    setCartItems([]);
                }
            })
            .catch((err) => {
                console.error("Error fetching cart:", err);
                setCartItems([]);
            });
    }, []);

    return (
        <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

    {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
    ) : (
        <div className="space-y-4">
            {cartItems.map((item, index) => (
                    <div
                        key={item.customer_order?.id ?? index}
                className="flex gap-4 p-4 border rounded-lg bg-white shadow-sm"
                    >
                    {item.dishes?.image && (
                            <Image
                                src={item.dishes.image}
                        alt={item.dishes.name}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                            />
    )}
        <div>
            <p className="text-lg font-semibold">{item.dishes?.name}</p>
            <p className="text-gray-600">{item.dishes?.description}</p>
        <p className="mt-1 font-medium">${item.dishes?.price}</p>
    </div>
    </div>
    ))}
        </div>
    )}
    </div>
);
}
