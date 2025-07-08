'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

type Item = {
    id: number;
    name: string;
    price: number;
    rating: number;
    category: string;
    deal: boolean;
    image?: string;
};

const allItems: Item[] = [
    { id: 1, name: 'Spicy Chicken', price: 7.98, rating: 4.5, category: 'normal', deal: true, image: '/image.png' },
    { id: 2, name: 'Vegan Salad', price: 5.99, rating: 5, category: 'vegan', deal: false, image: '/image.png' },
    { id: 3, name: 'Grilled Salmon', price: 12.5, rating: 4, category: 'normal', deal: true, image: '/image.png' },
    { id: 4, name: 'Veggie Burger', price: 8.25, rating: 3.5, category: 'vegan', deal: true, image: '/image.png' },
];

export default function AdminPage() {
    const [filters, setFilters] = useState({ category: '', rating: '', deals: '' });
    
    const [title, setTitle] = useState("Hope you're Hungry!!");
    const [editingTitle, setEditingTitle] = useState(false);

    const [imageUrl, setImageUrl] = useState('/shrimpdish.jpg');
    const [imageInput, setImageInput] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('/api/homepage');
                if (res.ok) {
                    const data = await res.json();
                    if (data?.title) setTitle(data.title);
                    if (data?.imageUrl) setImageUrl(data.imageUrl);
                }
            } catch (err) {
                console.error('Failed to fetch homepage data', err);
            }
        }
        fetchData();
    }, []);
    
    const handleTitleSave = async () => {
        setEditingTitle(false);
        try {
            await fetch('/api/homepage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title }),
            });
            toast.success('Title updated!');
        } catch {
            toast.error('Failed to update title');
        }
    };
    
    const handleImageSave = async () => {
        try {
            await fetch('/api/homepage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageUrl: imageInput }),
            });
            setImageUrl(imageInput);
            setImageInput('');
            toast.success('Image updated!');
        } catch {
            toast.error('Failed to update image');
        }
    };

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
        <main className="flex flex-col p-6">
            {/* Filters */}
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

            {/* Editable Title and Image Section */}
            <section className="flex flex-col md:flex-row-reverse items-center gap-6 lg:gap-15 lg:justify-center mb-10">
                <div className="w-full md:w-[50%] lg:w-[30%]">
                    <img src={imageUrl} alt="Homepage" className="w-full rounded" />
                    <div className="mt-4 flex gap-2">
                        <Input
                            type="text"
                            placeholder="Enter image URL"
                            value={imageInput}
                            onChange={(e) => setImageInput(e.target.value)}
                            className="flex-1"
                        />
                        <Button onClick={handleImageSave}>Update Image</Button>
                    </div>
                </div>

                <div className="text-center md:text-left w-full md:w-[50%]">
                    {editingTitle ? (
                        <div className="mb-4 flex gap-2 justify-center md:justify-start">
                            <Input value={title} onChange={(e) => setTitle(e.target.value)} className="text-5xl font-bold" />
                            <Button onClick={handleTitleSave}>Save</Button>
                        </div>
                    ) : (
                        <h2 className="text-5xl font-bold mb-6">{title}</h2>
                    )}
                    {!editingTitle && (
                        <Button onClick={() => setEditingTitle(true)}>Edit Title</Button>
                    )}
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
