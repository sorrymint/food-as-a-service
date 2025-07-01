'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { SearchInput } from '@/components/ui/inputs/searchInput';

export default function HomePage() {
  return (
    <main className='flex flex-col'>
      <section>
        <SearchInput />
      </section>
      <BodyAndAvatar />
      <PopularPickSection />
    </main>
  );
}

function BodyAndAvatar() {
  return (
    <section>
      <div className='w-full flex flex-col gap-[2rem] items-center md:flex-row-reverse lg:gap-15 lg:justify-center'>
        <Image
          src={'/shrimpdish.jpg'}
          alt='A picture of a delicious dish'
          width={400}
          height={200}
          className='w-[100%] md:w-[50%] lg:w-[30%]'
        />
        <div className='md:flex md:flex-col md:gap-20 lg:items-start lg:h-[400px]'>
          <h2 className='hidden text-7xl font-bold text-center md:block'>
            Hope you're Hungry!!
          </h2>
          <div className='flex flex-col gap-[16px] w-full items-center lg:flex-row'>
            <Button className='w-[25rem] lg:w-[12rem] hover:bg-[#181818]'>
              Order
            </Button>
            <Button className='w-[25rem] lg:w-[12rem] bg-white text-black border border-black hover:bg-white'>
              Menu
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}


function PopularPickSection() {
  const hotPicksData = [
    { id: 1, name: 'Spicy chicken', price: 7.98, image: '/image.png' },
    { id: 2, name: 'A burger', price: 8.5, image: '/burger.png' },
    { id: 3, name: 'Spicy chicken wings', price: 9.0, image: '/wings.png' },
    { id: 4, name: 'Veggie salad', price: 6.75, image: '/salad.png' },
  ];

  return (
    <section className="flex flex-col my-15 items-center">
      <h2 className="text-4xl font-bold text-center mb-10">Hot Picks</h2>
      <div className="px-10 flex flex-col gap-5 md:flex-row md:flex-wrap md:justify-center">
        {hotPicksData.map((pick) => (
          <PopularPicksCard
            key={pick.id}
            id={pick.id}
            name={pick.name}
            price={pick.price}
            image={pick.image}
          />
        ))}
      </div>
    </section>
  );
}

function PopularPicksCard({ id, name, price, image }: { id: number; name: string; price: number; image: string; }) {
  const { data: session } = useSession();

  const addToOrder = async () => {
  if (!session) {
    alert("Please sign in to add items to your order.");
    return;
  }

  try {
    const res = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        businessId: 1,
        customerId: Number(session.user.id),
        dishId: id,
        name,
        price,
        quantity: 1,
  }),
});

    if (!res.ok) {
      const data = await res.json();
      alert("Error: " + (data.error || "Failed to add to order"));
      return;
    }

    alert(`${name} added to your order!`);
  } catch (error) {
    alert("Network error: " + error);
  }
};

  return (
    <div className="flex bg-gray-200 px-2 py-4 gap-6 rounded-xl w-fit">
      <Image src={image} alt={name} width={100} height={100} className="rounded-xl" />
      <div>
        <p className="text-xl font-bold">{name}</p>
        <div className="flex gap-16 items-center mt-2">
          <p className="font-semibold">${price.toFixed(2)}</p>
          <Button onClick={addToOrder} className="w-8 h-8 rounded-full">+</Button>
        </div>
      </div>
    </div>
  );
}