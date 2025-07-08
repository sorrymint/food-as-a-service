// app/api/menu-items/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const menuItems = [
    { id: 1, name: 'Pancakes', status: 'available', description: 'Fluffy pancakes with syrup', price: 6.99, imageUrl: '/images/pancakes.jpg', category: 'Breakfast', rating: 4.2 },
    { id: 2, name: 'Omelette', status: 'new', description: 'Three-egg omelette with veggies', price: 7.99, imageUrl: '/images/omelette.jpg', category: 'Breakfast', rating: 4.0 },
    { id: 3, name: 'Club Sandwich', status: 'available', description: 'Triple layered chicken sandwich', price: 8.5, imageUrl: '/images/club_sandwich.jpg', category: 'Lunch', rating: 4.3 },
    { id: 4, name: 'Caesar Salad', status: 'unavailable', description: 'Classic Caesar salad', price: 7.25, imageUrl: '/images/caesar_salad.jpg', category: 'Lunch', rating: 3.9 },
    { id: 5, name: 'Burger', status: 'available', description: 'Juicy grilled beef burger', price: 9.99, imageUrl: '/images/burger.jpg', category: 'Dinner', rating: 4.5 },
    { id: 6, name: 'Pizza', status: 'available', description: 'Cheesy pepperoni pizza', price: 12.5, imageUrl: '/images/pizza.jpg', category: 'Dinner', rating: 4.0 },
    { id: 7, name: 'Pasta', status: 'unavailable', description: 'Creamy Alfredo pasta', price: 11.75, imageUrl: '/images/pasta.jpg', category: 'Dinner', rating: 3.8 },
    { id: 8, name: 'Lemonade', status: 'new', description: 'Fresh lemonade', price: 3.0, imageUrl: '/images/lemonade.jpg', category: 'Drinks', rating: 4.6 },
    { id: 9, name: 'Coffee', status: 'available', description: 'Hot coffee', price: 2.5, imageUrl: '/images/coffee.jpg', category: 'Drinks', rating: 4.8 },
    { id: 10, name: 'Chocolate Cake', status: 'new', description: 'Chocolate cake', price: 5.5, imageUrl: '/images/chocolate_cake.jpg', category: 'Desserts', rating: 4.7 },
    { id: 11, name: 'Ice Cream', status: 'available', description: 'Vanilla ice cream', price: 4.0, imageUrl: '/images/ice_cream.jpg', category: 'Desserts', rating: 4.4 },
    { id: 12, name: 'French Fries', status: 'available', description: 'Golden fries', price: 3.99, imageUrl: '/images/fries.jpg', category: 'Snacks', rating: 4.1 },
    { id: 13, name: 'Chicken Nuggets', status: 'unavailable', description: 'Crispy nuggets', price: 5.25, imageUrl: '/images/nuggets.jpg', category: 'Snacks', rating: 4.0 },
];

export async function GET(request: NextRequest) {
    return NextResponse.json(menuItems);
}

export async function PATCH(request: NextRequest) {
    const body = await request.json();
    const { id, rating } = body;

    const item = menuItems.find((item) => item.id === id);
    if (!item) return NextResponse.json({ error: 'Item not found' }, { status: 404 });

    item.rating = rating;
    return NextResponse.json({ success: true, id, newRating: rating });
}
