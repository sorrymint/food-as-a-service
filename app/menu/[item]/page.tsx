import Link from "next/link"


const item = 
  {
    id: 1,
    title: "Classic Cheeseburger",
    description: "Grilled beef patty with cheddar cheese, lettuce, tomato, and house sauce.",
    price: 11.99,
    category: "Main Course",
    image: "/Burger2.jpg",
    available: true,
    spicy_level: 1,
    rating: 4.5
  }


export default function ProductsPage () {
  return (
    <div>
      <Link href={"/menu"} className="text-blue-500 mb-4 inline-block">
      <span className="text-xl mr-2">←</span>
       Menu </Link>
        <h1> Product Page</h1>
      <article>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </article>
    </div>
  );
}
