'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';

type Props = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export function PickCard({ id, name, price, image }: Props) {
  const addToOrder = async () => {
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dishId: id, name, price }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert('Error: ' + (data.error || 'Failed to add to order'));
        return;
      }

      alert(`${name} added to your order!`);
    } catch (error) {
      alert('Network error: ' + error);
    }
  };

  return (
    <div className="flex bg-gray-200 px-2 py-4 gap-6 rounded-xl w-fit">
      <Image src={image} alt={name} width={100} height={100} className="rounded-xl" />
      <div>
        <p className="text-xl font-bold">{name}</p>
        <div className="flex gap-16 items-center mt-2">
          <p className="font-semibold">${price.toFixed(2)}</p>
          <Button onClick={addToOrder} className="w-8 h-8 rounded-full">
            +
          </Button>
        </div>
      </div>
    </div>
  );
}