"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";

type Item = {
  id: number;
  name: string;
  price: number;
  rating: number;
  category: string;
  deal: boolean;
  image?: string;
  tags?: string;
};

const allItems: Item[] = [
  {
    id: 1,
    name: "Spicy Chicken",
    price: 7.98,
    rating: 4.5,
    category: "normal",
    deal: true,
    image: "/Burger-newspaper.png",
    tags: "spicy, popular",
  },
  {
    id: 2,
    name: "Vegan Salad",
    price: 5.99,
    rating: 5,
    category: "vegan",
    deal: false,
    image: "/Burger-on-Table.jpg",
    tags: "vegan, healthy",
  },
  {
    id: 3,
    name: "Grilled Salmon",
    price: 12.5,
    rating: 4,
    category: "normal",
    deal: true,
    image: "/Burger2.jpg",
    tags: "seafood, fresh",
  },
  {
    id: 4,
    name: "Veggie Burger",
    price: 8.25,
    rating: 3.5,
    category: "vegan",
    deal: true,
    image: "/Burger-on-Table.jpg",
    tags: "vegan, popular",
  },
    {
    id: 5,
    name: "Salmon Burger",
    price: 12.5,
    rating: 4,
    category: "normal",
    deal: true,
    image: "/Burger2.jpg",
    tags: "seafood, fresh",
  },
];

export default function HomePage() {
  const [filters, setFilters] = useState({
    category: "",
    rating: "",
    deals: "",
  });

  const filteredItems = allItems.filter((item) => {
    if (filters.category && item.category !== filters.category) return false;
    if (filters.rating && item.rating < Number(filters.rating)) return false;
    if (filters.deals === "deal" && !item.deal) return false;
    if (filters.deals === "normal" && item.deal) return false;
    return true;
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };
  // public/shrimp-Pan.avif

  return (
    <main className=" space-y-20">
      <div className="bg-[url('/shrimp-Pan.avif')] bg-cover bg-center md:w-[110vw] h-[95vh] -mt-8  -mx-8 w-[110vw] md:-mx-10 relative lg:-mx-42">
        <section className="flex flex-col md:flex-row-reverse items-center gap-6 lg:gap-15 lg:justify-center mb-10">
          <div className="text-center md:text-left space-y-14 absolute top-32 left-8  w-fit md:space-y-32 lg:left-40 lg:space-y-24">
            <div className="flex flex-col items-start">
              <h2 className="text-5xl font-extrabold text-gray-200 lg:text-[100px]">Julius </h2>
              <span className="text-5xl font-extrabold text-gray-200 lg:text-[100px]">
                Caesar
              </span>
              <p className="font-semibold text-sm text-gray-200">
                BEST LOCAL DEALS
              </p>
            </div>
            <div className="flex flex-col gap-4 lg:flex-row w-full ">
                <Link href={"/cart"}>
              <Button className="w-48 lg:w-32 py-6 hover:bg-[#181818] shadow-lg shadow-gray-600/20 border-gray-100/10 border-1 md:px-30 cursor-pointer">Order</Button>
              </Link>
              <Link href={"/menu"}>
              <Button className="w-48 lg:w-32 bg-white text-black border-1 py-6 hover:bg-white md:px-30 cursor-pointer">
                Menu
              </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <section className="flex flex-col items-center gap-2">
        <h2 className="text-4xl font-bold mb-8">Hot Picks</h2>
        <section className="mb-6 flex flex-col md:items-end items-center">
          <form className="flex gap-4 mr-34 ">
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="border rounded p-2"
            >
              <option value="">All Categories</option>
              <option value="normal">Normal</option>
              <option value="vegan">Vegan</option>
            </select>

            <select
              name="rating"
              value={filters.rating}
              onChange={handleFilterChange}
              className="border rounded p-2"
            >
              <option value="">Any Rating</option>
              <option value="1">1 star & up</option>
              <option value="2">2 stars & up</option>
              <option value="3">3 stars & up</option>
              <option value="4">4 stars & up</option>
              <option value="5">5 stars</option>
            </select>

            <select
              name="deals"
              value={filters.deals}
              onChange={handleFilterChange}
              className="border rounded p-2"
            >
              <option value="">All Prices</option>
              <option value="normal">Normal Priced</option>
              <option value="deal">Deal / Sale Price</option>
            </select>
          </form>
        
        <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center gap-6 px-6 items-center mt-8  ">
          {filteredItems.length === 0 && <p>No results found.</p>}
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="flex bg-gray-200 px-4 py-4 gap-6 rounded-xl w-fit"
            >
              <Image
                src={item.image || "/image.png"}
                alt={item.name}
                width={100}
                height={100}
                className="rounded-xl"
              />
              <div>
                <p className="text-xl font-bold">{item.name}</p>

                {/* Tags display */}
                {item.tags && (
                  <p className="text-sm text-gray-700 italic mb-2">
                    {item.tags
                      .split(",")
                      .map((tag) => tag.trim())
                      .map((tag, i) => (
                        <span
                          key={i}
                          className="mr-2 px-2 py-1 rounded bg-gray-300 text-gray-900 text-xs font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                  </p>
                )}

                <div className="flex gap-10 items-center mt-2">
                  <p className="font-semibold">${item.price.toFixed(2)}</p>
                  <Button
                    className="w-8 h-8 rounded-full"
                    onClick={() =>
                      toast.success(`${item.name} added to cart!`, {
                        description: "Check your cart to review your item.",
                      })
                    }
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        </section>
      </section>
    </main>
  );
}
