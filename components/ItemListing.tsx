'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Dish = {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    tags?: string;
};

export default function ItemListing() {
    const [items, setItems] = useState<Dish[]>([]);
    const [statusMessage, setStatusMessage] = useState('');

    useEffect(() => {
        const fetchItems = async () => {
            const res = await fetch('/api/items');
            const data = await res.json();
            setItems(data);
        };
        fetchItems();
    }, []);

    const handleDelete = async (id: number) => {
        const confirmDelete = confirm('Are you sure you want to delete this item?');
        if (!confirmDelete) return;

        try {
            const res = await fetch(`/api/items/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setItems(prev => prev.filter(item => item.id !== id));
                setStatusMessage('Item deleted successfully.');
            } else {
                const error = await res.json();
                setStatusMessage(`Error: ${error.message || 'Failed to delete item.'}`);
            }
        } catch (error) {
            console.error(error);
            setStatusMessage('An error occurred while deleting the item.');
        }
    };

    return (
        <div className="space-y-4">
            {statusMessage && (
                <p className="text-sm text-center text-red-500 font-semibold">{statusMessage}</p>
            )}
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {items.map(item => (
                    <li key={item.id} className="border rounded-2xl h-[25rem] max-w-[20rem] mx-auto shadow-lg">
                        <Image
                            src={item.image}
                            alt={item.name}
                            width={320}
                            height={200}
                            className="rounded-t-2xl object-cover"
                        />
                        <div className="p-4 space-y-4 flex flex-col justify-between h-[10rem]">
                            <Link
                                href={`/menu/${item.id}`}
                                className="text-xl hover:text-blue-500 font-bold"
                            >
                                {item.name}
                            </Link>
                            <p className="text-sm text-gray-600">
                                {item.description.substring(0, 100)}...
                            </p>
                            {item.tags && (
                                <p className="text-xs text-gray-500 italic">
                                    Tags: {item.tags.split(',').map(tag => tag.trim()).join(', ')}
                                </p>
                            )}
                            <div className="flex justify-between items-center">
                                <p className="text-2xl font-bold">${item.price}</p>
                                <div className="flex gap-2">
                                    <button className="bg-amber-400 px-3 py-1 text-sm font-bold hover:bg-amber-300 rounded">
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="bg-red-500 px-3 py-1 text-sm text-white font-bold hover:bg-red-600 rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
