"use client";

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const ShoppingCartIcon = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        async function fetchCartCount() {
            try {
                const res = await fetch('/api/cart');
                if (!res.ok) throw new Error('Failed to fetch cart count');
                const data = await res.json();
                const totalQuantity = data.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0);
                setCount(totalQuantity);
            } catch (error) {
                console.error(error);
            }
        }
        fetchCartCount();
    }, []);

    return (
        <Link href="/cart" className="relative inline-block">
            <ShoppingCart className="md:hover:bg-gray-200 md:rounded-full md:px-1.5 w-[35px] md:h-[35px]" />
            {count > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
          {count}
        </span>
            )}
        </Link>
    );
};

export default ShoppingCartIcon;
