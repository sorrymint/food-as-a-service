import { GetDishById } from "@/app/actions/database_Resquest";
import { Button } from "@/components/ui/button";
import { DishType } from "@/lib/zodSchema/zodSchemas";
import { HeartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link"


export default async function ProductsPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  
  //Getting the id and parasing it into a number
  const { id } = await params;
  const itemId = parseInt(id, 10);

  if (isNaN(itemId)) {
    return <div>Invalid ID</div>;
  }
  // Getting data from database
  const data = await GetDishById(itemId);
  
  if(!data){
    return <p>Dish Not Found</p>
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
          <h2 className="text-2xl font-bold ">{data.name}</h2>
          <HeartIcon fill="black"/>
          </div>
          {data.active ? activeStatus() : unactiveStatus()}
          <div className="flex flex-row justify-between items-center">
            <p className=" w-fit h-fit p-2 bg-amber-400 text-xs m-0">Rating Component (0)</p>
            <p className="font-extrabold text-2xl"> ${data.price}</p>
          </div>
          <p className="text-gray-600 text-[16px] mt-12 mb-6">{data.description}</p>
          <div className=" flex justify-center items-center mb-6">
            <Button className="w-[400px] py-6">Order Now</Button>
          </div>
        </div>
        <Image
          placeholder="empty"
          src={data.image! || "/Placeholder.png"}
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
