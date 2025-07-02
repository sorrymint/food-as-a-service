'use client'
import React, { useState } from "react";
import { db } from "@/lib/db/drizzle";
import { dishes } from "@/lib/db/schema";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

export default async function Menulist() {
  const menuItems = await db.select().from(dishes);

  const [userRatings, setUserRatings] = useState<Record<number, number>>({});

  return (
    <main className="p-6 bg-white flex-grow">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {menuItems.map((item) => (
          <Card
            key={item.id}
            className="bg-yellow-100 text-black rounded-lg shadow flex flex-col items-center text-center w-full h-[420px]"
          >
            <CardContent className="p-4 flex flex-col items-center w-full h-full">
              <img
                src={item.image! || "/placeholder.png"}
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
                        setUserRatings((prev) => ({
                          ...prev,
                          [item.id]: star,
                        }));
                        try {
                          await fetch("/api/menu-items", {
                            method: "PATCH",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ id: item.id, rating: star }),
                          });
                        } catch (err) {
                          console.error("Rating update failed", err);
                        }
                      }}
                      className={`cursor-pointer text-xl ${
                        (userRatings[item.id] ?? Math.floor(3)) >= star
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-700">
                  {(userRatings[item.id] ?? 3)?.toFixed(1)}
                </span>
              </div>
              <p className="font-bold mt-1">${item.price}</p>
              <Button className="mt-auto bg-green-600 hover:bg-green-700 text-white w-full">
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
