"use Client";

import { createDish } from "../actions";
import { dishFormSchema } from "@/lib/zodSchema/zodSchemas";
import { useActionState } from "react";
import { toast } from "sonner";

export default function CreateDishForm() {
  const clientAction = async (state: any, formData: FormData) => {
    const newDish = {
      business_id: formData.get("business_id"),
      name: formData.get("name"),
      isActive: formData.get("isActive") === "on",
      discription: formData.get("discription"),
      image: formData.get("image"),
      price: formData.get("price"),
    };

    const results = dishFormSchema.safeParse(newDish);

    if (!results.success) {
      // console.log(results.error.issues)
      let errorMessage = "";

      // If we werer to add toast goo way to incoparte error Message.
      results.error.issues.forEach((issue) => {
        errorMessage =
          errorMessage + issue.path[0] + ": " + issue.message + ". ";
      });

      toast.error(errorMessage);
      return {
        errors: results.error.flatten().fieldErrors,
      };
    }
    console.log(results.data);
    const response = await createDish(results.data);

    if (response?.error) {
      toast.error(response.error);
    }
  };

  const [state, action, isPending] = useActionState(clientAction, undefined);

  return (
    
    <form className="flex flex-col gap-5" action={action}>
      <div>
        <label>Business ID</label>
        <input
          type="text"
          name="business_id"
          id="business_id"
          className="w-full p-2 border rounded"
          placeholder="Enter Business ID"
        />
        {state?.errors?.business_id && (
          <p className="text-red-500">{state.errors.business_id}</p>
        )}
      </div>
      <div>
        <label>Dish Name</label>
        <input
          type="text"
          name="name"
          id="name"
          className="w-full p-2 border rounded"
          placeholder="Enter Dish Name"
        />
        {state?.errors?.name && (
          <p className="text-red-500">{state.errors.name}</p>
        )}
      </div>
      <div>
        <label>Active?</label>
        <input
          type="checkbox"
          name="isActive"
          id="isActive"
          defaultChecked={false}
        />
        {state?.errors?.active && (
          <p className="text-red-500">{state.errors.active}</p>
        )}
      </div>

      <div>
        <label>Discription</label>
        <textarea
          name="discription"
          id="discription"
          className="w-full p-2 border rounded"
          rows={5}
        />
        {state?.errors?.discription && (
          <p className="text-red-500">{state.errors.discription}</p>
        )}
      </div>

      <div>
        <label>Image Name</label>
        <input
          type="text"
          name="image"
          id="image"
          className="w-full p-2 border rounded"
          placeholder="Name the Image is Saved as"
        />
        {state?.errors?.image && (
          <p className="text-red-500">{state.errors.image}</p>
        )}
      </div>

      <div>
        <label>Price</label>
        <input
          type="text"
          name="price"
          id="price"
          className="w-full p-2 border rounded"
          placeholder="Product Price"
        />
        {state?.errors?.price && (
          <p className="text-red-500">{state.errors.price}</p>
        )}
      </div>

      <button
        disabled={isPending}
        type="submit"
        className="bg-blue-500
            text-white px-4 py-2 rounded"
      >
        {isPending ? "Loading" : "Create Item"}
      </button>
    </form>
  );
}
