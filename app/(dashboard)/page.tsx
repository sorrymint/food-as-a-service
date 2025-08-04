'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Link from 'next/link';

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

export default function HomePage() {
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

            <section className="flex flex-col md:flex-row-reverse items-center gap-6 lg:gap-15 lg:justify-center mb-10">
                <Image
                    src="/shrimpdish.jpg"
                    alt="Dish"
                    width={400}
                    height={200}
                    className="w-full md:w-[50%] lg:w-[30%] rounded"
                />
                <div className="text-center md:text-left">
                    <h2 className="text-5xl font-bold mb-6">Hope you're Hungry!!</h2>
                    <div className="flex flex-col gap-4 lg:flex-row">
                        <Link href={"../menu"} >
                            <Button className="w-48 lg:w-32 bg-[#181818] text-white border  ">Order</Button>
                        </Link>
                        <Link href={"../menu"} >
                            <Button className="w-48 lg:w-32 bg-white text-black border hover: bg-white">Menu</Button>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="items-center text-center">
                <h2 className="text-4xl font-bold mb-8">Hot Picks</h2>
                <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center gap-6 px-6">
                    {filteredItems.length === 0 && <p>No results found.</p>}
                    {filteredItems.map((item) => (
                        <div key={item.id} className="flex bg-gray-200 px-4 py-4 gap-6 rounded-xl w-fit">
                            <Image
                                src={item.image || "/image.png"}
                                alt={item.name}
                                width={100}
                                height={100}
                                className="rounded-xl"
                            />
                            <div>
                                <p className="text-xl font-bold">{item.name}</p>

                                {/* Tags display */}
                                {item.tags && (
                                    <p className="text-sm text-gray-700 italic mb-2">
                                        {item.tags.split(',').map(tag => tag.trim()).map((tag, i) => (
                                            <span key={i} className="mr-2 px-2 py-1 rounded bg-yellow-200 text-yellow-900 text-xs font-semibold">{tag}
                                            </span>
                                        ))}
                                    </p>
                                )}

                                <div className="flex gap-10 items-center mt-2">
                                    <p className="font-semibold">${item.price.toFixed(2)}</p>
                                    <Button
                                        className="w-8 h-8 rounded-full"
                                        onClick={() =>
                                            toast.success(`${item.name} added to cart!`, {
                                                description: "Check your cart to review your item.",
                                            })
                                        }
                                    >
                                        +
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
