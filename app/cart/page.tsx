'use client';

import { useEffect, useState } from 'react';

interface CartItem {
    id: number;
    name: string;
    price: number | null;
}

export default function Cart() {
    const [items, setItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCart() {
            try {
                const res = await fetch('/api/cart');
                if (!res.ok) throw new Error('Failed to fetch cart');
                const data = await res.json();
                setItems(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchCart();
    }, []);

    if (loading) return <p>Loading cart...</p>;
    if (items.length === 0) return <p>Your cart is empty.</p>;

    return (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
                <div key={item.id} className="border rounded p-4 shadow">
                    <h2 className="text-lg font-bold">{item.name}</h2>
                    <p>Quantity: 1</p> 
                    <p>Price: ${item.price !== null ? item.price.toFixed(2) : 'N/A'}</p>
                </div>
            ))}
        </div>
    );
}
