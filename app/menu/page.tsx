import Link from "next/link";
import Menulist from "@/components/menulist";
import { GetAllDishes } from "../actions/database_Resquest";

export default async function menu() {
  const items = await GetAllDishes();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl mx-auto ">Menu</h1>
        <Link
          href={"/Admin/create"}
          className="bg-blue-500 px-4 py-2 max-w-20 "
        >
          <button className="cursor-pointer ">Create</button>
        </Link>
      </div>
      <div className="space-y-6 flex flex-wrap gap-2">
        <Menulist items={items} />
      </div>6
    </div>
  );
}
