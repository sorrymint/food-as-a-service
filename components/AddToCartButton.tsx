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
    <div className=" w-full mt-6">
        <Button
          className=" mt-auto bg-primary hover:bg-primary/90 text-white w-full"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
    </div>
  );
}