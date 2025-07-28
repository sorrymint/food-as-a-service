'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface Item {
    id: number;
    name: string;
    description: string;
}

export default function ItemPage() {
    const [item, setItem] = useState<Item | null>(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const router = useRouter();

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const res = await fetch(`/api/items/${id}`);
                if (!res.ok) {
                    throw new Error('Failed to fetch item');
                }
                const data = await res.json();
                setItem(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [id]);

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this item?')) return;

        try {
            const res = await fetch(`/api/items/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) {
                throw new Error('Delete failed');
            }

            router.push('/items'); // Go back to the items list
        } catch (err) {
            console.error(err);
            alert('Failed to delete item');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (!item) return <p>Item not found.</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-2">{item.name}</h1>
            <p className="mb-4">{item.description}</p>
            <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
                Delete
            </button>
        </div>
    );
}
