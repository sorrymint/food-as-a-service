'use client'

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState  } from "react"
type dishes = {
    id: number
    name: string
    description: string
    image: string
    price: number
    tags?: string;
    }

export default function ItemListing() {
    const [items, setItems] = useState<dishes[]> ([])

    useEffect(() => {
        const fetchItems = async () => {
            const res = await fetch('api/items')
            const data = await res.json();
            setItems(data);
        }

        fetchItems();
        
    }, [])

  return (
    <div>
      {items.map((item) => (
        <li
          key={item.id}
          className="border rounded-2xl h-[25rem] max-w-[20rem]"
        >
          <Image
            src={item.image!}
            alt=""
            width={320}
            height={0}
            className="rounded-t-2xl "
          />
          <div className="p-4 space-y-12">
            <Link
              href={`/menu/${item.id}`}
              className="text-xl hover:text-blue-500 font-bold"
            >
              {item.name}
            </Link>
            <p className="text-sm text-gray-600 ">
              {item.description.substring(0, 100)}
            </p>
              
              {item.tags && (
                  <p className="text-xs text-gray-500 italic">
                      Tags: {item.tags.split(',').map(tag => tag.trim()).join(', ')}
                  </p>
              )}
              
            <div className="flex justify-between">
              <p className="text-3xl font-bold">${item.price}</p>
              <button className=" bg-amber-400 px-4 py-2 text-sm font-extrabold hover:bg-amber-300 rounded border-b-3 border-amber-600 cursor-pointer">
                Add to Cart
              </button>
            </div>
          </div>
        </li>
      ))}
    </div>
  );
}
