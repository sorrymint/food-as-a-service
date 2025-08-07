// import { useParams } from "next/navigation";
import { getDishes } from "./actions";
import UpdateForm from "./components/updateForm";

export default async function UpdatingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Converting the id into a number so its safe for the database
  const { id } = await params;
  const itemId: number = parseInt(id, 10);

  if (isNaN(itemId)) {
    return <div>Invalid ID - must be a number</div>;
  }

  // Getting th current Dish ID for default values
  const initdish = await getDishes(itemId);

  if (!initdish || initdish.length === 0) {
    return <div>Dish not found</div>;
  }

  // export default async function UpdatingPage() {
  //   const params = useParams();
  //   const id = params?.id;
  //   const itemId = parseInt(id as string, 10);

  return (
    <div>
      <h2 className="font-extrabold mb-4">Update Page</h2>

      <UpdateForm prevData={initdish[0]} />
    </div>
  );
}
