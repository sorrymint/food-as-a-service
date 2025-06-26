import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const menuItems = [
    // Breakfast
    {
        id: 1,
        name: 'Pancakes',
        description: 'Fluffy pancakes with syrup',
        price: 6.99,
        imageUrl: '/images/pancakes.jpg',
        category: 'Breakfast',
        rating: 4.2,
    },
    {
        id: 2,
        name: 'Omelette',
        description: 'Three-egg omelette with veggies',
        price: 7.99,
        imageUrl: '/images/omelette.jpg',
        category: 'Breakfast',
        rating: 4.0,
    },

    // Lunch
    {
        id: 3,
        name: 'Club Sandwich',
        description: 'Triple layered chicken sandwich',
        price: 8.5,
        imageUrl: '/images/club_sandwich.jpg',
        category: 'Lunch',
        rating: 4.3,
    },
    {
        id: 4,
        name: 'Caesar Salad',
        description: 'Classic Caesar salad with croutons',
        price: 7.25,
        imageUrl: '/images/caesar_salad.jpg',
        category: 'Lunch',
        rating: 3.9,
    },

    // Dinner
    {
        id: 5,
        name: 'Burger',
        description: 'Juicy grilled beef burger',
        price: 9.99,
        imageUrl: '/images/burger.jpg',
        category: 'Dinner',
        rating: 4.5,
    },
    {
        id: 6,
        name: 'Pizza',
        description: 'Cheesy pepperoni pizza',
        price: 12.5,
        imageUrl: '/images/pizza.jpg',
        category: 'Dinner',
        rating: 4.0,
    },
    {
        id: 7,
        name: 'Pasta',
        description: 'Creamy Alfredo pasta with chicken',
        price: 11.75,
        imageUrl: '/images/pasta.jpg',
        category: 'Dinner',
        rating: 3.8,
    },

    // Drinks
    {
        id: 8,
        name: 'Lemonade',
        description: 'Fresh squeezed lemonade',
        price: 3.0,
        imageUrl: '/images/lemonade.jpg',
        category: 'Drinks',
        rating: 4.6,
    },
    {
        id: 9,
        name: 'Coffee',
        description: 'Hot brewed coffee',
        price: 2.5,
        imageUrl: '/images/coffee.jpg',
        category: 'Drinks',
        rating: 4.8,
    },

    // Desserts
    {
        id: 10,
        name: 'Chocolate Cake',
        description: 'Rich chocolate layer cake',
        price: 5.5,
        imageUrl: '/images/chocolate_cake.jpg',
        category: 'Desserts',
        rating: 4.7,
    },
    {
        id: 11,
        name: 'Ice Cream',
        description: 'Vanilla ice cream with sprinkles',
        price: 4.0,
        imageUrl: '/images/ice_cream.jpg',
        category: 'Desserts',
        rating: 4.4,
    },

    // Snacks
    {
        id: 12,
        name: 'French Fries',
        description: 'Crispy golden fries',
        price: 3.99,
        imageUrl: '/images/fries.jpg',
        category: 'Snacks',
        rating: 4.1,
    },
    {
        id: 13,
        name: 'Chicken Nuggets',
        description: 'Bite-sized crispy chicken',
        price: 5.25,
        imageUrl: '/images/nuggets.jpg',
        category: 'Snacks',
        rating: 4.0,
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
