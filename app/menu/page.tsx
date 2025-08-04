'use client'
import Link from "next/link";
import Menulist from "@/components/menulist";
import { useState } from 'react';

type Item = {
    id: number;
    name: string;
    price: number;
    rating: number;
    category: string;
    deal: boolean;
    image?: string;
    tags?: string;
};

const allItems: Item[] = [
    { id: 1, name: 'Spicy Chicken', price: 7.98, rating: 4.5, category: 'normal', deal: true, image: '/image.png', tags: 'spicy, popular' },
    { id: 2, name: 'Vegan Salad', price: 5.99, rating: 5, category: 'vegan', deal: false, image: '/image.png', tags: 'vegan, healthy' },
    { id: 3, name: 'Grilled Salmon', price: 12.5, rating: 4, category: 'normal', deal: true, image: '/image.png', tags: 'seafood, fresh' },
    { id: 4, name: 'Veggie Burger', price: 8.25, rating: 3.5, category: 'vegan', deal: true, image: '/image.png', tags: 'vegan, popular' },
];


export default function menu() {
    const [filters, setFilters] = useState({ category: '', rating: '', deals: '' });

    const filteredItems = allItems.filter((item) => {
        if (filters.category && item.category !== filters.category) return false;
        if (filters.rating && item.rating < Number(filters.rating)) return false;
        if (filters.deals === 'deal' && !item.deal) return false;
        if (filters.deals === 'normal' && item.deal) return false;
        return true;
    });

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <main className="flex flex-col">
            <section className="mb-6">
                <form className="flex gap-4">
                    <select name="category" value={filters.category} onChange={handleFilterChange} className="border rounded p-2">
                        <option value="">All Categories</option>
                        <option value="normal">Normal</option>
                        <option value="vegan">Vegan</option>
                    </select>

                    <select name="rating" value={filters.rating} onChange={handleFilterChange} className="border rounded p-2">
                        <option value="">Any Rating</option>
                        <option value="1">1 star & up</option>
                        <option value="2">2 stars & up</option>
                        <option value="3">3 stars & up</option>
                        <option value="4">4 stars & up</option>
                        <option value="5">5 stars</option>
                    </select>

                    <select name="deals" value={filters.deals} onChange={handleFilterChange} className="border rounded p-2">
                        <option value="">All Prices</option>
                        <option value="normal">Normal Priced</option>
                        <option value="deal">Deal / Sale Price</option>
                    </select>
                </form>
            </section>

            <div className="space-y-8">
                <div className="space-y-6 flex flex-wrap gap-2">
                    <Menulist />
                </div>
            </div>
        </main>

  );
}

