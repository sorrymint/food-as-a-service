'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';

interface ProductItem {
    id: number;
    name: string;
    status: 'available' | 'new' | 'unavailable';
    price: number;
    description: string;
    imageUrl?: string;
    category: string;
    rating: number;
}

export default function Product() {
    const [items, setItems] = useState<ProductItem[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState<ProductItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/menu-items')
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
                setFilteredItems(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to load items:', err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const query = searchQuery.toLowerCase();
        const results = items.filter(item => item.name.toLowerCase().includes(query));
        setFilteredItems(results);
    }, [searchQuery, items]);

    if (loading) return <p className="p-4 text-center text-gray-500">Loading products...</p>;

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-center">Product Page</h1>

            <Input
                type="text"
                placeholder="Search for menu item..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-6 w-full"
            />

            {filteredItems.length === 0 ? (
                <p className="text-red-500 text-center">Item not found or unavailable.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredItems.map(item => (
                        <div key={item.id} className="border p-4 rounded-xl shadow bg-white text-black relative">
                            <img src={item.imageUrl || '/placeholder.png'} alt={item.name} className="h-32 w-full object-cover rounded mb-2" />
                            <h2 className="font-bold text-lg">{item.name}</h2>
                            <p className="text-sm text-gray-600">{item.description}</p>
                            <p className="font-semibold mt-1">${item.price.toFixed(2)}</p>

                            {item.status === 'new' && (
                                <span className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 text-xs rounded">NEW</span>
                            )}
                            {item.status === 'unavailable' && (
                                <span className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded">UNAVAILABLE</span>
                            )}
                            {item.status === 'available' && (
                                <span className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 text-xs rounded">✔</span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
