'use client';

import { useEffect, useState, useRef } from 'react';
import { ShoppingCart, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from 'components/ui/header'
import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/db/drizzle';
import { dishes } from '@/lib/db/schema';


interface MenuItem {
    id: number;
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
    rating?: number;
    category: string;
}

interface CartItem extends MenuItem {
    quantity: number;
}

// import Header from 'components/ui/header'
// import Link from 'next/link';
// import Image from 'next/image';
// import { db } from '@/lib/db/drizzle';
// import { dishes } from '@/lib/db/schema';


// export default async function menu() {

//   const menuItems = await db.select().from(dishes);
//   return (
//     <div className='flex flex-col gap-12'>
//       <div className='flex flex-col gap-4'>
//       <h1 className='text-3xl mx-auto '>Menu</h1>
//       <Link href={'/create'} className='bg-blue-500 px-4 py-2 max-w-20 '>
//       <button className='cursor-pointer '>Create</button>
//       </Link>
//       </div>
//       <div className='space-y-6 flex flex-wrap gap-2'>
//         {menuItems.map(item => (
//           <div key={item.id} className='border rounded-2xl h-[25rem] max-w-[20rem]'>
//             <Image src={item.image!} alt='' width={320} height={0}
//             className='rounded-t-2xl '></Image>
//             <div className='p-4 space-y-12'>
//           <Link href={`/menu/${item.id}`}
//           className='text-xl hover:text-blue-500 font-bold'>
//             {item.name}
//           </Link> 
//           <p className='text-sm text-gray-600 '>
//             {item.description.substring(0, 100)}
//             </p>
            
//             <div className='flex justify-between'>
//             <p className='text-3xl font-bold'>${item.price}</p>
//             <button className=' bg-amber-400 px-4 py-2 text-sm font-extrabold hover:bg-amber-300 rounded border-b-3 border-amber-600 cursor-pointer'>Add to Cart</button>
//             </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


export default function MenuPage() {
    const [items, setItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [cartOpen, setCartOpen] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
    const [deliveryMode, setDeliveryMode] = useState<'Delivery' | 'Pickup'>('Delivery');
    const [searchQuery, setSearchQuery] = useState('');
    const [userRatings, setUserRatings] = useState<Record<number, number>>({});
    const cartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetch('/api/menu-items')
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error loading items:', err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
                setCartOpen(false);
            }
        }
        if (cartOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [cartOpen]);

    const categories = Array.from(new Set(items.map((item) => item.category)));

    const filteredItems = categoryFilter
        ? items.filter(
            (item) =>
                item.category === categoryFilter &&
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : items.filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    function addToCart(item: MenuItem) {
        setCartItems((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if (existing) {
                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    }

    function removeFromCart(id: number) {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    }

    function updateQuantity(id: number, qty: number) {
        if (qty < 1) return;
        setCartItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
        );
    }

    if (loading) return <p className="text-white text-center p-4">Loading...</p>;

    return (
        <div className="flex bg-black min-h-screen text-white">
            {/* Sidebar */}
            <aside className="w-48 p-4 space-y-4 text-sm font-medium">
                <Link href="/" className="hover:text-green-400 block">Home</Link>
                <Link href="/sign-in" className="hover:text-green-400 block">Log In</Link>
                <Link href="/sign-up" className="hover:text-green-400 block">Sign Up</Link>
                <Link href="#" className="hover:text-green-400 block">Account</Link>
                <Link href="#" className="hover:text-green-400 block">Payment</Link>
                <Link href="#" className="hover:text-green-400 block">Saved</Link>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="flex justify-between items-center px-6 py-4">
                    <div className="flex items-center gap-4">
                        <img src="/DineDirectFavicon.png" alt="Logo" className="h-10" />
                        <div className="flex rounded-full overflow-hidden border border-green-700">
                            <Button
                                variant={deliveryMode === 'Delivery' ? 'default' : 'ghost'}
                                className={`rounded-none px-4 py-1 ${
                                    deliveryMode === 'Delivery'
                                        ? 'bg-green-800 text-white'
                                        : 'bg-green-600 text-white hover:bg-green-700'
                                }`}
                                onClick={() => setDeliveryMode('Delivery')}
                            >
                                Delivery
                            </Button>
                            <Button
                                variant={deliveryMode === 'Pickup' ? 'default' : 'ghost'}
                                className={`rounded-none px-4 py-1 ${
                                    deliveryMode === 'Pickup'
                                        ? 'bg-green-800 text-white'
                                        : 'bg-green-600 text-white hover:bg-green-700'
                                }`}
                                onClick={() => setDeliveryMode('Pickup')}
                            >
                                Pickup
                            </Button>
                        </div>
                        <Button className="bg-white text-green-700 hover:bg-gray-100">Address</Button>
                    </div>

                    <div className="flex items-center gap-4 relative" ref={cartRef}>
                        <Input
                            type="text"
                            placeholder="Search menu items..."
                            className="w-64"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Button onClick={() => setCartOpen(!cartOpen)} className="relative bg-transparent hover:bg-transparent">
                            <ShoppingCart className="w-6 h-6 text-white" />
                            {totalQuantity > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white w-5 h-5 flex items-center justify-center rounded-full">
                                    {totalQuantity}
                                </span>
                            )}
                        </Button>
                        <Link href="/sign-in" className="hover:underline text-sm">Log In</Link>
                        <Link href="/sign-up" className="hover:underline text-sm">Sign Up</Link>

                        {/* Cart Dropdown */}
                        {cartOpen && (
                            <div className="absolute top-12 right-0 bg-white text-black shadow-lg w-80 rounded z-50">
                                <h3 className="font-semibold p-4 border-b">Your Cart</h3>
                                {cartItems.length === 0 ? (
                                    <p className="p-4 text-center text-gray-600">Cart is empty</p>
                                ) : (
                                    <ul>
                                        {cartItems.map((item) => (
                                            <li key={item.id} className="flex justify-between items-center p-4 border-b">
                                                <div>
                                                    <p className="font-semibold">{item.name}</p>
                                                    <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                                                    <div>
                                                        <input
                                                            type="number"
                                                            min={1}
                                                            value={item.quantity}
                                                            onChange={(e) =>
                                                                updateQuantity(item.id, parseInt(e.target.value) || 1)
                                                            }
                                                            className="w-16 mt-1 px-2 py-1 border rounded text-center"
                                                        />
                                                    </div>
                                                </div>
                                                <Button variant="ghost" onClick={() => removeFromCart(item.id)}>
                                                    <X className="text-red-600 hover:text-red-800" />
                                                </Button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>
                </header>

                {/* Category stars */}
                <nav className="flex gap-3 px-6 py-3 bg-white border-b border-green-700 overflow-x-auto">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategoryFilter(cat === categoryFilter ? null : cat)}
                            className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                                cat === categoryFilter
                                    ? 'bg-green-600 text-white'
                                    : 'bg-white text-green-700 hover:bg-green-300'
                            }`}
                        >
                            ⭐ <span>{cat}</span>
                        </button>
                    ))}
                </nav>

                {/* Menu Items */}
                <main className="p-6 bg-white flex-grow">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredItems.map((item) => (
                            <Card
                                key={item.id}
                                className="bg-yellow-100 text-black rounded-lg shadow flex flex-col items-center text-center w-full h-[420px]"
                            >
                                <CardContent className="p-4 flex flex-col items-center w-full h-full">
                                    <img
                                        src={item.imageUrl || '/placeholder.png'}
                                        alt={item.name}
                                        className="w-full h-36 object-cover rounded mb-2"
                                    />
                                    <h3 className="text-lg font-semibold">{item.name}</h3>
                                    <p className="text-gray-600 text-sm">{item.description}</p>
                                    <div className="flex items-center justify-center mt-1">
                                        <div className="flex text-yellow-500 mr-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <span
                                                    key={star}
                                                    onClick={async () => {
                                                        setUserRatings((prev) => ({ ...prev, [item.id]: star }));
                                                        try {
                                                            await fetch('/api/menu-items', {
                                                                method: 'PATCH',
                                                                headers: {
                                                                    'Content-Type': 'application/json',
                                                                },
                                                                body: JSON.stringify({ id: item.id, rating: star }),
                                                            });
                                                        } catch (err) {
                                                            console.error('Rating update failed', err);
                                                        }
                                                    }}
                                                    className={`cursor-pointer text-xl ${
                                                        (userRatings[item.id] ?? Math.floor(item.rating || 0)) >= star
                                                            ? 'text-yellow-500'
                                                            : 'text-gray-300'
                                                    }`}
                                                >
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-700">
                                            {(userRatings[item.id] ?? item.rating)?.toFixed(1)}
                                        </span>
                                    </div>
                                    <p className="font-bold mt-1">${item.price.toFixed(2)}</p>
                                    <Button
                                        onClick={() => addToCart(item)}
                                        className="mt-auto bg-green-600 hover:bg-green-700 text-white w-full"
                                    >
                                        Add to Cart
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}

