"use Client";

import { createDish } from "../actions";
import { dishFormSchema } from "@/lib/zodSchema/zodSchemas";
import { useActionState } from "react";
import { toast } from "sonner";

export default function CreateDishForm() {
  const clientAction = async (state: any, formData: FormData) => {
    const newDish = {
      businessId: formData.get("business_id"),
      name: formData.get("name"),
      active: formData.get("active"),
      description: formData.get("description"),
      image: formData.get("image"),
      price: formData.get("price"),
    };

    const results = dishFormSchema.safeParse(newDish);

    if (!results.success) {
      // console.log(results.error.issues)
      let errorMessage = "";

      // If we we are to add toast, it be a good way to incoparte error Message.
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
          name="businessId"
          id="businessId"
          className="w-full p-2 border rounded"
          placeholder="Enter Business ID"
        />
        {state?.errors?.businessId && (
          <p className="text-red-500">{state.errors.businessId}</p>
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

      <div>
        <label>Description</label>
        <textarea
          name="description"
          id="description"
          className="w-full p-2 border rounded"
          rows={5}
        />
        {state?.errors?.description && (
          <p className="text-red-500">{state.errors.description}</p>
        )}
      </div>

      <div>
        <label>Dish Status: </label>
        <select name="activeStatus" id="activeStatus">
          <option value="active">Active - In Stock</option>
          <option value="outStock">Out of Stock</option>
          <option value="discontinued">Discontinued</option>
        </select>
        {state?.errors?.active && (
          <p className="text-red-500">{state.errors.active}</p>
        )}
      </div>

      <div>
        <label>Image Name</label>
        <input
          type="text"
          name="imageName"
          id="imageName"
          className="w-full p-2 border rounded"
          placeholder="Name the Image is Saved as"
        />
        {state?.errors?.imageName && (
          <p className="text-red-500">{state.errors.imageName}</p>
        )}
      </div>

      <div>
        <label>Image Link</label>
        <input
          type="url"
          name="imageLink"
          id="imageLink"
          className="w-full p-2 border rounded"
          placeholder="Link to Image"
        />
        {state?.errors?.imageUrl && (
          <p className="text-red-500">{state.errors.imageUrl}</p>
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
