import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const menuItems = [
    {
        id: 1,
        name: 'Burger',
        description: 'Juicy grilled beef burger',
        price: 9.99,
        imageUrl: '/images/burger.jpg',
        category: 'Dinner',
        deal: true,
        rating: 4.5,
    },
    {
        id: 2,
        name: 'Pizza',
        description: 'Cheesy pepperoni pizza',
        price: 12.5,
        imageUrl: '/images/pizza.jpg',
        category: 'Dinner',
        deal: false,
        rating: 4.0,
    },
    {
        id: 3,
        name: 'Pasta',
        description: 'Creamy Alfredo pasta with chicken',
        price: 11.75,
        imageUrl: '/images/pasta.jpg',
        category: 'Dinner',
        deal: false,
        rating: 3.8,
    },
];

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    const isSingle = /^\d+$/.test(id || '');

    if (isSingle) {
        const item = menuItems.find((m) => m.id === parseInt(id!));
        return item
            ? NextResponse.json(item)
            : NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json(menuItems);
}
