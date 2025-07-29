"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { DishType } from "@/lib/zodSchema/zodSchemas";

//TODO: items are the varaible that are returned from the database
type dishes = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
};

export default function Menulist({items} : {items : DishType[] }) {
  // USESTATE creates an empty array of items
  // SETITEMS allows use to add dishes into this array
  // const [items, setItems] = useState<dishes[]>([]);

  // useEffect(() => {
  //   const fetchItems = async () => {
  //     const res = await fetch("api/items");
  //     const data = await res.json();
  //     setItems(data);
  //     console.log(data);
  //   };

  //   fetchItems();
  // }, []);

  const [userRatings, setUserRatings] = useState<Record<number, number>>({});

  return (
    <main className=" flex-grow">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 ">
        {items.map(item => (
          <li key={item.id}>

            <Card
              className="bg-yellow-100 text-black rounded-lg shadow flex flex-col items-center text-center w-full h-[420px]"
            >
              <CardContent className="p-4 flex flex-col items-center w-full h-full">
                <img
                  src={item.image! || "/placeholder.png"}
                  alt={item.name}
                  className="w-full h-36 object-cover rounded mb-2 "
                />
                <Link href={`/menu/${item.id}`}><h3 className="text-lg font-semibold hover:text-blue-500">{item.name}</h3></Link>
                <p className="text-gray-600 text-sm">{item.description.substring(0, 100)}</p>
                <div className="flex items-center justify-center mt-1">
                  <div className="flex text-yellow-500 mr-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onClick={async () => {
                          setUserRatings((prev) => ({
                            ...prev,
                            [item.id!]: star,
                          }));
                          try {
                            await fetch("/api/menu-items", {
                              method: "PATCH",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                id: item.id,
                                rating: star,
                              }),
                            });
                          } catch (err) {
                            console.error("Rating update failed", err);
                          }
                        }}
                        className={`cursor-pointer text-xl ${
                          (userRatings[item.id!] ?? Math.floor(3)) >= star
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-700">
                    {(userRatings[item.id!] ?? 3)?.toFixed(1)}
                  </span>
                </div>
                <p className="font-bold mt-1">${item.price}</p>
                <Button className="mt-auto bg-green-600 hover:bg-green-700 text-white w-full">
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </main>
  );
}
