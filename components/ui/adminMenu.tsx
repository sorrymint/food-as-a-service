"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import { Button } from "./button";
import DeleteDishButton from "./DeleteDishButton";
import { DishType } from "@/lib/zodSchema/zodSchemas";
import Link from "next/link";

export default function AdminMenu(props: { item: DishType }) {
  const IdValue: number = Number(props.item.id);
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 ">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="bg-white flex flex-col p-1 rounded-xl border-1 border-gray-400 shadow-xl "
        >
          <DropdownMenuLabel className="text-center">Actions</DropdownMenuLabel>
          <DropdownMenuSeparator className="border-1 border-gray-300 " />
          <DropdownMenuItem
            onClick={() =>
              navigator.clipboard.writeText(props.item.id as unknown as string)
            }
            className=" hover:bg-gray-100 hover:border-none px-5 py-1 cursor-copy"
          >
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem className=" hover:bg-gray-100 w-full px-5 py-1">
            <Link href="../admin/create">Add</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className=" hover:bg-gray-100 w-full px-5 py-1 ">
            <Link href={`../admin/update/${props.item.id}`}>Update</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="bg-red-500 hover:bg-red-400 w-full px-5 py-1 rounded-md cursor-pointer text-white/90">
            <DeleteDishButton dishId={IdValue} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
