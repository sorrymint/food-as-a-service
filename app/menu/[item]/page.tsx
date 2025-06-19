import { notFound } from 'next/navigation';

async function getItem(id: number) {
    const res = await fetch('http://localhost:3000/api/menu-items'); // or 3001
    const items = await res.json();
    return items.find((item: any) => item.id === id);
}

export default async function MenuItemPage({ params }: { params: { item: string } }) {
    const id = parseInt(params.item);
    const item = await getItem(id);

    if (!item) return notFound();

    return (
        <main className="p-6">
            <h1 className="text-3xl font-bold">{item.name}</h1>
            <p>{item.description}</p>
            <p className="text-gray-600">${item.price.toFixed(2)}</p>
            <p>⭐ {item.rating}</p>
            <p>Category: {item.category}</p>
            {item.imageUrl && <img src={item.imageUrl} alt={item.name} className="mt-4 max-w-sm rounded-xl" />}
        </main>
    );
}
