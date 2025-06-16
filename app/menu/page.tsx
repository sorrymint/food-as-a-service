'use client';
import { useEffect, useState } from 'react';
import { MenuItem } from '@radix-ui/react-menu';
interface MenuItem {
    id: number;
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
}

export default function MenuPage() {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/menu-items')
            .then(res => res.json())
            .then(data => {
                setMenuItems(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching menu:', err);
                setLoading(false);
            });
    }, []);

    return (
        <div className='p-8'>
            <h1 className='text-3xl font-bold text-center mb-6'>Menu</h1>

            {loading ? (
                <p className='text-center'>Loading...</p>
            ) : menuItems.length === 0 ? (
                <p className='text-center'>No menu items found.</p>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                    {menuItems.map(item => (
                        <div key={item.id} className='border rounded-lg p-4 shadow-md'>
                            {item.imageUrl && (
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className='w-full h-40 object-cover mb-4 rounded'
                                />
                            )}
                            <h2 className='text-xl font-semibold'>{item.name}</h2>
                            <p className='text-sm text-gray-600'>{item.description}</p>
                            <p className='mt-2 text-green-600 font-bold'>${item.price.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

