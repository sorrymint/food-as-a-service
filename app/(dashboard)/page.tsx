'use client'; 

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useEffect } from 'react';

// For testing the error page
function CrashComponent() {
    useEffect(() => {
        throw new Error("Client-side error to trigger error.tsx");
    }, []);
    return null;
}


export default function HomePage({ searchParams }) {
    const category = searchParams?.category || '';
    const rating = searchParams?.rating || '';
    const deals = searchParams?.deals || '';

    const filteredItems = fetchFilteredMenu({ category, rating, deals });

    return (
        <main className='flex flex-col'>

            <section>
                <FilterForm selected={{ category, rating, deals }} />
            </section>
            <BodyAndAvatar />
            <PopularPickSection items={filteredItems} />
        </main>
    );
}

function FilterForm({ selected }) {
    return (
        <form method="GET" className="flex gap-4 mb-6">
            <select name="category" defaultValue={selected.category} className="border rounded p-2">
                <option value="">All Categories</option>
                <option value="normal">Normal</option>
                <option value="vegan">Vegan</option>
            </select>

            <select name="rating" defaultValue={selected.rating} className="border rounded p-2">
                <option value="">Any Rating</option>
                <option value="1">1 star & up</option>
                <option value="2">2 stars & up</option>
                <option value="3">3 stars & up</option>
                <option value="4">4 stars & up</option>
                <option value="5">5 stars</option>
            </select>

            <select name="deals" defaultValue={selected.deals} className="border rounded p-2">
                <option value="">All Prices</option>
                <option value="normal">Normal Priced</option>
                <option value="deal">Deal / Sale Price</option>
            </select>

            <Button type="submit" className="px-6">
                Filter
            </Button>
        </form>
    );
}

function BodyAndAvatar() {
    return (
        <section>
            <div className='w-full flex flex-col gap-[2rem] items-center md:flex-row-reverse lg:gap-15 lg:justify-center'>
                <Image
                    src={'/shrimpdish.jpg'}
                    alt='A picture of a delicious burger'
                    width={400}
                    height={200}
                    className='w-[100%] md:w-[50%] lg:w-[30%]'
                />
                <div className='md:flex md:flex-col md:gap-20 md:-mt-30 lg:items-start lg:h-[400px] lg:mt-0'>
                    <h2 className='hidden text-7xl font-bold text-center md:block'>
                        Hope you're Hungry!!
                    </h2>
                    <div className='flex flex-col gap-[16px] w-full items-center lg:flex-row'>
                        <Button className='w-[25rem] lg:w-[12rem] hover:bg-[#181818]'>Order</Button>
                        <Button className='w-[25rem] lg:w-[12rem] bg-white text-black border border-black hover:bg-white'>
                            Menu
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

function PopularPickSection({ items }) {
    return (
        <section className="flex flex-col my-15 items-center">
            <h2 className="text-4xl font-bold text-center mb-10">Hot Picks</h2>
            <div className='px-10 flex flex-col gap-5 md:flex-row md:flex-wrap md:justify-center'>
                {items.length === 0 && <p>No results found.</p>}
                {items.map(item => (
                    <PopularPicksCard key={item.id} item={item} />
                ))}
            </div>
        </section>
    );
}

function PopularPicksCard({ item }) {
    return (
        <div className="flex bg-gray-200 px-2 py-4 gap-[1.5rem] rounded-xl w-fit">
            <Image
                src={item.image || "/image.png"}
                alt={item.name}
                width={100}
                height={100}
                className='rounded-xl'
            />
            <div>
                <p className='text-xl font-bold'>{item.name}</p>
                <div className='flex gap-[4rem] items-center mt-2'>
                    <p className='font-semibold'>${item.price?.toFixed(2)}</p>
                    <Button className='w-1 h-8 rounded-full'>+</Button>
                </div>
            </div>
        </div>
    );
}

function fetchFilteredMenu({ category, rating, deals }) {
    const allItems = [
        { id: 1, name: 'Spicy Chicken', price: 7.98, rating: 4.5, category: 'normal', deal: true, image: '/image.png' },
        { id: 2, name: 'Vegan Salad', price: 5.99, rating: 5, category: 'vegan', deal: false, image: '/image.png' },
        { id: 3, name: 'Grilled Salmon', price: 12.5, rating: 4, category: 'normal', deal: true, image: '/image.png' },
        { id: 4, name: 'Veggie Burger', price: 8.25, rating: 3.5, category: 'vegan', deal: true, image: '/image.png' },
    ];

    return allItems.filter(item => {
        if (category && item.category !== category) return false;
        if (rating && item.rating < Number(rating)) return false;
        if (deals) {
            if (deals === 'deal' && !item.deal) return false;
            if (deals === 'normal' && item.deal) return false;
        }
        return true;
    });
}