"use client";

import { Button } from "@/components/ui/button";
import { DishType } from "@/lib/zodSchema/zodSchemas";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { startTransition } from "react";
import { toast } from "sonner";
import { DeleteDishAction } from "../Delete/actions";
import router from "next/router";

export const columns: ColumnDef<DishType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isActive",
    header: "Status",
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const dish = row.original;

      const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this dish?")) {
          const dishId = Number(dish.id);
          // When the button is clicked these function will be running in the back ground
          // Trandstion give use access to ispending allow for the dynamic movement
          startTransition(async () => {
            const result = await DeleteDishAction(dishId, {} as any);

            // Checks if the results was successful
            if (result?.success) {
              toast.success(`Item ${dishId} is Deleted`);
              router.push("/menu"); // Refresh the page to update the UI
            } else {
              console.error(result?.error || "Failed to delete dish");
              alert(result?.error || "Failed to delete dish");
            }
          });
        }
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 ">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="bg-white flex flex-col p-1 rounded-xl border-1 border-gray-400 shadow-xl items-center"
          >
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(dish.id as unknown as string)
              }
              className=" hover:bg-gray-100 hover:border-none px-5 py-1 cursor-copy"
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuItem className=" hover:bg-gray-100 w-full px-5 py-1">
              <Link href="../admin/create">Add</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className=" hover:bg-gray-100 w-full px-5 py-1">
              <Link href={`../admin/update/${dish.id}`}>Update</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="bg-red-500 hover:bg-red-400 w-full px-5 py-1 rounded-md cursor-pointer text-white/90"
              onClick={handleDelete}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
