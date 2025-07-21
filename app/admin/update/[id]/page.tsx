import { number } from "zod";
import UpdateForm from "./components/updateForm";

export default function UpdatingPage({
  params,
}: {
  params: {
    id: string;
  };
}) {

    const theNum = async () => {
      //Parsing string into a number
      console.log(params, typeof params);
      const itemId = await parseInt(params.id);
      console.log(itemId, typeof itemId);
      return itemId;
    };

  
  return (
    <div>
      <h2 className="font-extrabold mb-4">Update Page</h2>

      <UpdateForm param={theNum} />
    </div>
  );
}
