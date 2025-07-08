import { db } from "@/lib/db/drizzle";
import { dishes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
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
  params,
}: {
  params: { id: string };
}) {
  console.log("params:", params);
  const id = Number(params.id);
  console.log("params.id:", params.id, typeof params.id);

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
      <h1> Product Page</h1>
      <article>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <p>{item.active? "Avaliable": "Unavaliable"}</p>
        <Image src={item.image! || "/placeholder.png"} width={300} height={100} alt="Some type of images" />
        <p>${item.price}</p>
      </article>
    </div>
  );
}
