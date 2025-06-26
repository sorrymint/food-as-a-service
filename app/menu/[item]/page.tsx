import { notFound } from 'next/navigation';

async function getItem(id: number) {
    const res = await fetch('http://localhost:3000/api/menu-items'); // Or your deployed URL
    const items = await res.json();
    return items.find((item: any) => item.id === id);
}

export default async function MenuItemPage({ params }: { params: { item: string } }) {
    const id = parseInt(params.item);
    const item = await getItem(id);

    if (!item) return notFound();

    return (
        <main className="p-6 max-w-xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{item.name}</h1>
            <p className="text-gray-700 mb-2">{item.description}</p>
            <p className="text-green-600 font-bold text-xl mb-2">${item.price.toFixed(2)}</p>
            <p>⭐ {item.rating}</p>
            <p className="text-sm mb-2">Category: {item.category}</p>
            {item.imageUrl && (
                <img src={item.imageUrl} alt={item.name} className="mt-4 w-full max-h-64 object-cover rounded-xl" />
            )}
        </main>
    );
}

