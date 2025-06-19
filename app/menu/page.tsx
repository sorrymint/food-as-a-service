'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface MenuItem {
    id: number;
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
}

export default function ProductDetailPage() {
    const { item } = useParams();
    const [menuItem, setMenuItem] = useState<MenuItem | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!item) return;

        fetch(`/api/menu-items/${item}`)
            .then(res => res.json())
            .then(data => {
                setMenuItem(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error loading item:', err);
                setLoading(false);
            });
    }, [item]);

    if (loading) return <p className="text-center p-4">Loading...</p>;

    if (!menuItem) return <p className="text-center p-4">Item not found.</p>;

    return (
        <div className="p-8 max-w-xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{menuItem.name}</h1>
            {menuItem.imageUrl && (
                <img
                    src={menuItem.imageUrl}
                    alt={menuItem.name}
                    className="w-full h-64 object-cover rounded mb-4"
                />
            )}
            <p className="text-lg mb-2 text-gray-700">{menuItem.description}</p>
            <p className="text-xl font-bold text-green-600">${menuItem.price.toFixed(2)}</p>
        </div>
    );
}
