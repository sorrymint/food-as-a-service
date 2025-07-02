"use client";

import Link from "next/link";

interface Restaurant {
    id: string;
    name: string;
    description: string;
}

const restaurants: Restaurant[] = [
    { id: "1", name: "Mike's Pizza", description: "Pizza made by Mike" },
    { id: "2", name: "Culvers", description: "Eat curd and burger" },
];

export default function RestaurantsPage() {
    return (
        <div>
            <h1>Restaurants</h1>
            <ul>
                {restaurants.map((r) => (
                    <li key={r.id} className="mb-3">
                        <Link href={`/restaurants/${r.id}`} className="text-blue-600 hover:underline">
                            {r.name}
                        </Link>
                        <p>{r.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
