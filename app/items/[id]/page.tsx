'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ItemPage({ params }: { params: { id: string } }) {
    const [item, setItem] = useState<any>(null);
    const router = useRouter();
    const id = params.id;

    useEffect(() => {
        const fetchItem = async () => {
            const res = await fetch(`/api/items/${id}`);
            const data = await res.json();
            setItem(data);
        };
        fetchItem();
    }, [id]);

    const handleDelete = async () => {
        const confirmed = confirm('Are you sure you want to delete this item?');
        if (!confirmed) return;

        const res = await fetch(`/api/items/${id}`, {
            method: 'DELETE',
        });

        if (res.ok) {
            alert('Item deleted!');
            router.push('/items'); 
        } else {
            alert('Failed to delete item.');
        }
    };

    if (!item) return <p>Loading...</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-2">{item.name}</h1>
            <p>{item.description}</p>
            <button
                onClick={handleDelete}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
                Delete
            </button>
        </div>
    );
}
