import { GetDishById } from "@/app/actions/database_Resquest";
import DeleteDishButton from "@/components/ui/DeleteDishButton";
import OrderNowButton from "@/components/OrderNowButton";
import { HeartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const stringId = (await params).id;
  const itemId = Number(stringId);

  if (isNaN(itemId)) {
    return <div>Invalid ID</div>;
  }
  // Getting data from database
  const item = await GetDishById(itemId);

  if (!item) {
    return <p>Dish Not Found</p>;
  }

  return (
    <div>
      <Link href={"/menu"} className="text-blue-500 mb-4 inline-block">
        <span className="text-xl mr-2">←</span>
        Menu{" "}
      </Link>
      <div className=" mr-6 space-x-5">
        <Link
          href={`/Admin/update/${item.id}`}
          className="bg-blue-500 px-4 py-2 max-w-20 "
        >
          <button className="cursor-pointer ">Update Item</button>
        </Link>
        <DeleteDishButton dishId={item.id} />

      </div>

      <div className="flex items-center justify-center">
        <article className="flex flex-col-reverse gap-6 items-center md:flex-row-reverse md:mt-30 md:gap-10 ">
          <div className="w-[505px] space-y-2">
            <div className="flex flex-row justify-between items-center ">
              <h2 className="text-2xl font-bold ">{item.name}</h2>
              <HeartIcon fill="black" />
            </div>
            <div>
              {item.active}
            </div>
            <div className="flex flex-row justify-between items-center">
              <p className=" w-fit h-fit p-2 bg-amber-400 text-xs m-0">
                Rating Component (0)
              </p>
              <p className="font-extrabold text-2xl"> ${item.price}</p>
            </div>
            <p className="text-gray-600 text-[16px] mt-12 mb-6">
              {item.description}
            </p>
            <div className=" flex justify-center items-center mb-6">
              <OrderNowButton name={item.name} />
            </div>
          </div>
          <Image
            placeholder="empty"
            src={item.imageUrl! || "/Placeholder.png"}
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
  
  // function activeStatus() {
  //   return (
  //     <div>
  //       <p className="border-1 border-gray-400 rounded-xl w-fit px-2 text-sm text-center ">
  //         Pick up
  //         <span className="w-2 h-2 bg-green-600 rounded-full inline-block ml-2" />
  //       </p>
  //     </div>
  //   );
  // }

  // function unactiveStatus() {
  //   return (
  //     <div>
  //       <p className="border-1 border-gray-400 rounded-xl w-fit px-2 text-sm text-center ">
  //         Discontinued
  //         <span className="w-2 h-2 bg-red-600 rounded-full inline-block ml-2" />
  //       </p>
  //     </div>
  //   );
  // }

  // function outStockStatus(){
  //   return (
  //     <div>
  //       <p className="border-1 border-gray-400 rounded-xl w-fit px-2 text-sm text-center ">
  //         Soldout - Out of Stock
  //         <span className="w-2 h-2 bg-red-600 rounded-full inline-block ml-2" />
  //       </p>
  //     </div>
  //   );
  // }
}
