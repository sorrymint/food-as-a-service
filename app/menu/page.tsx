import Link from "next/link";
import Menulist from "@/components/menulist";
import { GetAllDishes } from "../actions/database_Resquest";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { CirclePlus, MoreHorizontal } from "lucide-react";

export default async function menu() {
  const items = await GetAllDishes();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl mx-auto ">Menu</h1>

        <Link href={"/admin/create"} className="">
          <button className="cursor-pointer bg-black/90 px-4 py-2 max-w-30 rounded text-white/90">
            <CirclePlus className="inline" color="#FFFFFFE6" /> Create
          </button>
        </Link>
      </div>
      <div className="space-y-6 flex flex-wrap gap-2">
        <Menulist items={items} />
      </div>
    </div>
  );
}

{
  /* <DropdownMenu>
  <DropdownMenuTrigger>
    <MoreHorizontal />
      <span className="sr-only">More</span>
    </DropdownMenuTrigger>
  <DropdownMenuContent className="">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuItem>Subscription</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu> */
}
