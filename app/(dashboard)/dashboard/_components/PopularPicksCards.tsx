"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function PopularPicksCards() {
  async function handleAddToCart() {
    try {
      const res = await fetch("/api/order/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: 1, // replace with actual order ID or create logic
          name: "Spicy Chicken",
          quantity: 1,
        }),
      });

      if (!res.ok) throw new Error("Failed to add to cart");

      toast.custom(() => (
        <div className="p-4 bg-white rounded shadow">
          <p className="font-semibold">Spicy Chicken added to cart!</p>
          <p className="text-gray-500 text-sm">Check your cart to review your item.</p>
        </div>
      ));
    } catch (error) {
      toast.error("Failed to add Spicy Chicken to cart");
    }
  }
  return (
    <div className="flex bg-gray-200 px-2 py-4 gap-[1.5rem] rounded-xl w-fit">
      <Image
        src={"/image.png"}
        alt="a burger"
        width={100}
        height={100}
        className="rounded-xl"
      />
      <div>
        <p className="text-xl font-bold">Spicy Chicken</p>
        <div className="flex gap-[4rem] items-center mt-2">
          <p className="font-semibold">$7.98</p>
          <Button
            className="w-1 h-8 rounded-full"
            onClick={handleAddToCart}>
            +
          </Button>
        </div>
      </div>
    </div>
  );
}