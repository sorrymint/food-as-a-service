'use client';

import React from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import Link from "next/link";

export default function orderNowButton(props : {name: string}) {
  function handleAddToCart() {
    toast.success(`Added ${props.name} to cart!`);
  }
  return (
    <div>
      <Link href={"/cart"}>
        <Button
          className="w-[400px] py-6"
          onClick={handleAddToCart}
        >
          Order Now
        </Button>
      </Link>
    </div>
  );
}
