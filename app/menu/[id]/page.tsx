import { Button } from "@/components/ui/button";
import { db } from "@/lib/db/drizzle";
import { dishes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { HeartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link"


// const item = 
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
//   }


export default async function ProductsPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  
  const stringId = (await params).id;
  const id = Number(stringId);

  if (isNaN(id)) {
    return <div>Invalid ID</div>;
  }
  const item = await db
    .select()
    .from(dishes)
    .where(eq(dishes.id, id))
    .then((res) => res[0]);

  if (!item) {
    return <div>Item Not Found</div>;
  }

  return (
    <div>
          <Link href={"/menu"} className="text-blue-500 mb-4 inline-block">
        <span className="text-xl mr-2">←</span>
        Menu{" "}
      </Link>
    <div className="flex items-center justify-center">

      <article className="flex flex-col-reverse gap-6 items-center md:flex-row-reverse md:mt-30 md:gap-10 ">
        <div className="w-[505px] space-y-2">
          <div className="flex flex-row justify-between items-center ">
          <h2 className="text-2xl font-bold ">{item.name}</h2>
          <HeartIcon fill="black"/>
          </div>
          {item.active ? activeStatus() : unactiveStatus()}
          <div className="flex flex-row justify-between items-center">
            <p className=" w-fit h-fit p-2 bg-amber-400 text-xs m-0">Rating Component (0)</p>
            <p className="font-extrabold text-2xl"> ${item.price}</p>
          </div>
          <p className="text-gray-600 text-[16px] mt-12 mb-6">{item.description}</p>
          <div className=" flex justify-center items-center mb-6">
            <Button className="w-[400px] py-6">Order Now</Button>
          </div>
        </div>
        <Image
          placeholder="empty"
          src={item.image! || "/Placeholder.png"}
          width={200}
          height={200}
          alt="Some type of images"
          className="max-w-[510px] w-full h-auto rounded-sm"
          priority={false}
        />

      </article>

    </div>
    </div>
  );

  function activeStatus(){
    return (
      <div>
      <p className="border-1 border-gray-400 rounded-xl w-fit px-2 text-sm text-center ">
        Pick up
        <span className="w-2 h-2 bg-green-600 rounded-full inline-block ml-2"/>
      </p>
    </div>
  );
  }

  function unactiveStatus(){
    return (
      <div>
      <p className="border-1 border-gray-400 rounded-xl w-fit px-2 text-sm text-center ">
        Sold out
        <span className="w-2 h-2 bg-red-600 rounded-full inline-block ml-2"/>
      </p>
    </div>
    );
  }
}
