"use client";

import { useParams } from "next/navigation";

interface Restaurant {
    id: string;
    name: string;
    description: string;
}

const restaurants: Restaurant[] = [
    { id: "1", name: "Mike's Pizza", description: "Pizza made by Mike" },
    { id: "2", name: "Culvers", description: "Eat curd and burger" },
];

export default function RestaurantDetailPage() {
    const params = useParams();
    const restaurant = restaurants.find((r) => r.id === params.id);

    if (!restaurant) return <div>Restaurant not found.</div>;

    return (
        <div>
        <h1>{restaurant.name}</h1>
        <p>{restaurant.description}</p>
        </div>
        );
}