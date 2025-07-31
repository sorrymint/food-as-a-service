"use Client";

import {
  DishFormState,
  StringMap,
  StringToBooleanMap,
} from "@/app/actions/DishHelpers";
import { createDishAction } from "../actions";
import { dishFormSchema, DishType } from "@/lib/zodSchema/zodSchemas";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { convertZodErrors } from "@/app/actions/errors";

const initialDish = {
  businessId: 0,
  name: "",
  description: "",
  price: "",
  active: false,
  image: "",
};

const initState: DishFormState<DishType> = {};

export default function CreateDishForm() {
  // TODO: Add a useRef

  // Keeping track of Errors
  const [errors, setErrors] = useState<StringMap>({});
  // Tracking blurs
  const [blurs, setBlurs] = useState<StringToBooleanMap>({});
  // Tracking dish Data

  const [state, action, isPending] = useActionState(createDishAction, initState);

  const [dish, setDish] = useState<DishType>(state.data || initialDish);

  useEffect(() => {
    if (state.successMsg) {
      toast.success(state.successMsg);
      setBlurs({});
    } else if (state.errors) {
    }
    if (state.data) {
      setDish(state.data);
    }
  }, [state]);

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setBlurs((prev) => ({ ...prev, [name]: true }));
  };

  // Take the whatever data is currently in the the input feild and try to parse them, if an error occurs then it its it thrown
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDish((prev) => {
      const businessIdValue = Number(prev.businessId);
      console.log(typeof businessIdValue);
      const updateData = { ...prev, [name]: value  };
      const validated = dishFormSchema.safeParse(updateData);

      if (validated.success) {
        setErrors({});
      } else {
        const errors = convertZodErrors(validated.error);
        setErrors(errors);
      }
      return updateData;
    });
  };

  return (
    <form className="flex flex-col gap-5" action={action}>
      <div>
        <label>Business ID</label>
        <input
          type="text"
          name="businessId"
          id="businessId"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          value={dish.businessId}
          className="w-full p-2 border rounded"
          placeholder="Enter Business ID"
        />
        <div className="min-h-8">
          {blurs.businessId && errors?.businessId && (
            <p className="text-red-500">{errors.businessId}</p>
          )}
        </div>
      </div>
      <div>
        <label>Dish Name</label>
        <input
          type="text"
          name="name"
          id="name"
          defaultValue={dish.name}
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          className="w-full p-2 border rounded"
          placeholder="Enter Dish Name"
        />
        <div className="min-h-8">
          {blurs.name && errors?.name && (
            <p className="text-red-500">{errors.name}</p>
          )}
        </div>
      </div>
      <div>
        <label>Active?</label>
        <input
          type="checkbox"
          name="isActive"
          id="isActive"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          defaultChecked={false}
        />
        <div className="min-h-8">
          {blurs.isActive && errors?.isActive && (
            <p className="text-red-500">{errors.isActive}</p>
          )}
        </div>
      </div>

      <div>
        <label>description</label>
        <textarea
          name="description"
          id="description"
          defaultValue={dish.description}
          className="w-full p-2 border rounded"
          rows={5}
        />
        <div className="min-h-8">
          {blurs.description && errors?.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
        </div>
      </div>

      <div>
        <label>Image Name</label>
        <input
          type="text"
          name="image"
          id="image"
          defaultValue={dish.image || '/Placeholder.png'}
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          className="w-full p-2 border rounded"
          placeholder="Name the Image is Saved as"
        />
        <div className="min-h-8">
          {blurs.image && errors?.image && (
            <p className="text-red-500">{errors.image}</p>
          )}
        </div>
      </div>

      <div>
        <label>Price</label>
        <input
          type="text"
          name="price"
          id="price"
          defaultValue={dish.price}
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          className="w-full p-2 border rounded"
          placeholder="Product Price"
        />
        <div className="min-h-8">
          {blurs.price && errors?.price && (
            <p className="text-red-500">{errors.price}</p>
          )}
        </div>
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

// const clientAction = async (state: any, formData: FormData) => {
//   const newDish = {
//     businessId: formData.get("businessId"),
//     name: formData.get("name"),
//     isActive: formData.get("isActive") === "on",
//     description: formData.get("description"),
//     image: formData.get("image"),
//     price: formData.get("price"),
//   };

//   const results = dishFormSchema.safeParse(newDish);

//   if (!results.success) {
//     // console.log(results.error.issues)
//     let errorMessage = "";

//     // If we werer to add toast goo way to incoparte error Message.
//     results.error.issues.forEach((issue) => {
//       errorMessage =
//         errorMessage + issue.path[0] + ": " + issue.message + ". ";
//     });

//     toast.error(errorMessage);
//     return {
//       errors: results.error.flatten().fieldErrors,
//     };
//   }
//   console.log(results.data);
//   const response = await createDishAction(results.data);

//   if (response?.error) {
//     toast.error(response.error);
//   }
// };
