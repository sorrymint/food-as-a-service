'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

export default function AddToCartButton({ product }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAddToCart = async () => {
    const res = await fetch('/api/cart', {
      method: 'POST',
      body: JSON.stringify({
        productId: product.id,
        name: product.name,
        price: product.price,
      }),
    });

    if (!res.ok) {
      alert('Failed to add item');
      return;
    }

    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isPending}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      {isPending ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}