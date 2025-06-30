'use client';

import { useState, useEffect } from 'react';

interface FiltersProps {
    onFilterChange: (filters: {
        category: '' | 'normal' | 'vegan';
        rating: '' | '1' | '2' | '3' | '4' | '5';
        dealOnly: boolean;
    }) => void;
}

export default function Filters({ onFilterChange }: FiltersProps) {
    const [category, setCategory] = useState<'' | 'normal' | 'vegan'>('');
    const [rating, setRating] = useState<'' | '1' | '2' | '3' | '4' | '5'>('');
    const [dealOnly, setDealOnly] = useState(false);

    // Notify parent on filter change
    useEffect(() => {
        onFilterChange({ category, rating, dealOnly });
    }, [category, rating, dealOnly, onFilterChange]);

    return (
        <section className="flex flex-col gap-6 p-4 bg-gray-100 rounded-lg max-w-md mx-auto">
            {/* Category */}
            <div>
                <label className="block font-semibold mb-2">Category</label>
                <select
                    value={category}
                    onChange={e => setCategory(e.target.value as 'normal' | 'vegan' | '')}
                    className="w-full p-2 rounded border"
                >
                    <option value="">All</option>
                    <option value="normal">Normal</option>
                    <option value="vegan">Vegan</option>
                </select>
            </div>

            {/* Rating */}
            <div>
                <label className="block font-semibold mb-2">Rating</label>
                <select
                    value={rating}
                    onChange={e => setRating(e.target.value as '1' | '2' | '3' | '4' | '5' | '')}
                    className="w-full p-2 rounded border"
                >
                    <option value="">All</option>
                    <option value="1">1 star & up</option>
                    <option value="2">2 star & up</option>
                    <option value="3">3 star & up</option>
                    <option value="4">4 star & up</option>
                    <option value="5">5 star only</option>
                </select>
            </div>

            {/* Deal/Sale Price */}
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="dealOnly"
                    checked={dealOnly}
                    onChange={e => setDealOnly(e.target.checked)}
                    className="w-4 h-4"
                />
                <label htmlFor="dealOnly" className="font-semibold">Deal / Sale Price Only</label>
            </div>
        </section>
    );
}
