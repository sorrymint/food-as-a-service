
import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db/drizzle";
import { dishes } from "@/lib/db/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Menulist from "@/components/menulist";

// const menuItems = [
//   {
//     id: 1,
//     title: "Classic Cheeseburger",
//     description: "Grilled beef patty with cheddar cheese, lettuce, tomato, and house sauce.",
//     price: 11.99,
//     category: "Main Course",
//     image: "/Burger2.jpg",
//     available: true,
//     spicy_level: 1,
//     rating: 4.5
//   },
//   {
//     id: 2,
//     title: "Margherita Pizza",
//     description: "Traditional Italian pizza with fresh mozzarella, basil, and tomato sauce.",
//     price: 13.5,
//     category: "Main Course",
//     image: "/Burger-newspaper.png",
//     available: true,
//     spicy_level: 0,
//     rating: 4.7
//   },
//   {
//     id: 3,
//     title: "Spicy Ramen Bowl",
//     description: "Noodles in a spicy miso broth with pork belly, egg, and scallions.",
//     price: 14.25,
//     category: "Main Course",
//     image: "/Burger-newspaper.png",
//     available: false,
//     spicy_level: 4,
//     rating: 4.2
//   },
//   {
//     id: 4,
//     title: "Caesar Salad",
//     description: "Crisp romaine lettuce with creamy Caesar dressing, croutons, and parmesan.",
//     price: 9.75,
//     category: "Appetizer",
//     image: "/Burger-on-Table.jpg",
//     available: true,
//     spicy_level: 0,
//     rating: 4.0
//   },
//   {
//     id: 5,
//     title: "Vegan Buddha Bowl",
//     description: "Quinoa, roasted chickpeas, avocado, sweet potato, and tahini dressing.",
//     price: 12.00,
//     category: "Main Course",
//     image: "/Burger-newspaper.png",
//     available: true,
//     spicy_level: 1,
//     rating: 4.8
//   },
//   {
//     id: 6,
//     title: "Chocolate Lava Cake",
//     description: "Warm chocolate cake with a gooey molten center, served with vanilla ice cream.",
//     price: 6.95,
//     category: "Dessert",
//     image: "/Burger2.jpg",
//     available: true,
//     spicy_level: 0,
//     rating: 4.9
//   },
//   {
//     id: 7,
//     title: "Mango Smoothie",
//     description: "Fresh mango blended with yogurt and a hint of honey.",
//     price: 4.50,
//     category: "Beverage",
//     image: "/Burger-on-Table.jpg",
//     available: true,
//     spicy_level: 0,
//     rating: 4.3
//   }
// ];
//export default
export default async function menu() {
  const menuItems = await db.select().from(dishes);
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl mx-auto ">Menu</h1>
        <Link href={"/create"} className="bg-blue-500 px-4 py-2 max-w-20 ">
          <button className="cursor-pointer ">Create</button>
        </Link>
      </div>
      <div className="space-y-6 flex flex-wrap gap-2">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="border rounded-2xl h-[25rem] max-w-[20rem]"
          >
            <Image
              src={item.image!}
              alt=""
              width={320}
              height={0}
              className="rounded-t-2xl "
            ></Image>
            <div className="p-4 space-y-12">
              <Link
                href={`/menu/${item.id}`}
                className="text-xl hover:text-blue-500 font-bold"
              >
                {item.name}
              </Link>
              <p className="text-sm text-gray-600 ">
                {item.description.substring(0, 100)}
              </p>

              <div className="flex justify-between">
                <p className="text-3xl font-bold">${item.price}</p>
                <button className=" bg-amber-400 px-4 py-2 text-sm font-extrabold hover:bg-amber-300 rounded border-b-3 border-amber-600 cursor-pointer">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

