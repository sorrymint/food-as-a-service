// app/api/menu-items/route.ts
import { NextResponse } from 'next/server';

const menuItems = [
    {
        id: 1,
        name: 'Burger',
        description: 'Juicy grilled beef burger',
        price: 9.99,
        imageUrl: '/images/burger.jpg',
    },
    {
        id: 2,
        name: 'Pizza',
        description: 'Cheesy pepperoni pizza',
        price: 12.5,
        imageUrl: '/images/pizza.jpg',
    },
    {
        id: 3,
        name: 'Pasta',
        description: 'Creamy Alfredo pasta with chicken',
        price: 11.75,
        imageUrl: '/images/pasta.jpg',
    },
];

export async function GET() {
    return NextResponse.json(menuItems);
}
