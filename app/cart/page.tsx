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
                    const withQuantity = data.map((item) => ({
                        ...item,
                        quantity: 1,
                    }));
                    setCartItems(withQuantity);
                } else {
                    console.error("Cart is not array", data);
                }
            });
    }, []);

    const increment = (index: number) => {
        setCartItems((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decrement = (index: number) => {
        setCartItems((prev) =>
            prev.map((item, i) =>
                i === index && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

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
                            className="flex gap-4 p-4 border rounded-lg bg-white shadow-sm items-center"
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
                            <div className="flex-1">
                                <p className="text-lg font-semibold">{item.dishes?.name}</p>
                                <p className="text-gray-600">{item.dishes?.description}</p>
                                <p className="mt-1 font-medium">${item.dishes?.price}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    className="px-2 py-1 text-xl bg-gray-200 rounded"
                                    onClick={() => decrement(index)}
                                >
                                    −
                                </button>
                                <span className="px-2">{item.quantity}</span>
                                <button
                                    className="px-2 py-1 text-xl bg-gray-200 rounded"
                                    onClick={() => increment(index)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
