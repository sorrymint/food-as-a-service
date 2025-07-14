'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// Define your Dish type properly for better typing
interface Dish {
    name: string;
    description: string;
    price: number;
    image: string;
    active: boolean;
}

export default function EditDishClient({ dish, id }: { dish: Dish; id: string }) {
    const [formState, setFormState] = useState<Dish>(dish);
    const router = useRouter();

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            // Cast e.target to HTMLInputElement for checkbox to get .checked
            const target = e.target as HTMLInputElement;
            setFormState((prev: Dish) => ({
                ...prev,
                [name]: target.checked,
            }));
        } else if (name === 'price') {
            // Convert price string to number
            setFormState((prev: Dish) => ({
                ...prev,
                [name]: parseFloat(value),
            }));
        } else {
            setFormState((prev: Dish) => ({
                ...prev,
                [name]: value,
            }));
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const res = await fetch(`/api/dishes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formState),
        });

        if (res.ok) {
            router.push('/dishes');
        } else {
            alert('Failed to update dish');
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-xl">
            <input
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
            />
            <textarea
                name="description"
                value={formState.description}
                onChange={handleChange}
            />
            <input
                name="price"
                type="number"
                value={formState.price}
                step="0.01"
                onChange={handleChange}
            />
            <input
                name="image"
                value={formState.image}
                onChange={handleChange}
            />
            <label>
                <input
                    name="active"
                    type="checkbox"
                    checked={formState.active}
                    onChange={handleChange}
                />
                Active
            </label>
            <button type="submit">Save</button>
        </form>
    );
}
