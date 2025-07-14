import EditDishClient from "@/app/(dashboard)/dishes/[id]/edit/EditDishClient";

export default async function EditDishPage({ params: { id } }: { params: { id: string } }) {
    const res = await fetch(`${process.env.BASE_URL}/api/dishes/${id}`, {
        // cache: 'no-store', // optional
    });

    if (!res.ok) throw new Error('Dish not found');
    const dish = await res.json();

    return <EditDishClient dish={dish} id={id} />;
}


