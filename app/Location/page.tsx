'use client';

import React, { useState } from 'react';

export default function LocationPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchedRestaurant, setSearchedRestaurant] = useState('');

    const handleSearch = () => {
        setSearchedRestaurant(searchTerm);
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Search a Restaurant</h1>

            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Enter restaurant name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 flex-grow"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Search
                </button>
            </div>

            {searchedRestaurant && (
                <div className="border p-4 rounded bg-gray-100">
                    <p><strong>Restaurant Searched:</strong> {searchedRestaurant}</p>
                    <p><em>(Coordinates and details require a location API)</em></p>
                </div>
            )}
        </div>
    );
}
