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


// "use Client";

// import {
//   DishFormState,
//   StringMap,
//   StringToBooleanMap,
// } from "@/app/actions/DishHelpers";
// import { createDishAction } from "../actions";
// import { dishFormSchema, DishType } from "@/lib/zodSchema/zodSchemas";
// import { useActionState, useEffect, useState } from "react";
// import { toast } from "sonner";
// import { convertZodErrors } from "@/app/actions/errors";

// const initialDish = {
//   businessId: 0,
//   name: "",
//   description: "",
//   price: "",
//   active: '',
//   imageName: "",
//   imageUrl: '',
// };

// const initState: DishFormState<DishType> = {};

// export default function CreateDishForm() {

//     // TODO: Add a useRef

//   // Keeping track of Errors
//   const [errors, setErrors] = useState<StringMap>({});
//   // Tracking blurs
//   const [blurs, setBlurs] = useState<StringToBooleanMap>({});
//   // Tracking dish Data

//   const [state, action, isPending] = useActionState(
//     createDishAction,
//     initState
//   );

//   const [dish, setDish] = useState<DishType>(state.data || initialDish);
//   // console.log(dish.isActive);

// useEffect(() => {
//   if (state.successMsg) {
//     toast.success(state.successMsg);
//     setBlurs({});
//   } else if (state.errors) {
//   }
//   if (state.data) {
//     setDish(state.data);
//   }}, [state]);

//   const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
//   const { name } = e.target;
//   setBlurs((prev) => ({ ...prev, [name]: true }));
//   };

//   const handleOnChangeChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const { name, value, type, checked } = e.target;
//   // console.log("Raw event:", { name, value, type, checked }); // Check if event fires correctly

//   setDish((prev) => {
//     // Handle checkboxes vs. other inputs
//     const newValue = type === "checkbox" ? checked : value;
//     // console.log("Updating:", { [name]: newValue }); // Verify the new value

//     const updateData = { ...prev, [name]: newValue };

//     // Reusable validation
//     // console.log("Updated active Status", updateData.isActive);
//     return updateData;
//   });
// };

//     // Take the whatever data is currently in the the input feild and try to parse them, if an error occurs then it its it thrown
//   const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;

//     setDish((prev) => {
//       //console.log(typeof prev.active);
//       console.log("OTher function");
//       const updateData = { ...prev, [name]: value };
//       const validated = dishFormSchema.safeParse(updateData);

//       if (validated.success) {
//         setErrors({});
//       } else {
//         const errors = convertZodErrors(validated.error);
//         setErrors(errors);
//       }
//       //console.log(updateData.active);
//       return updateData;
//     });
//   };

//   return(
//     <form className="flex flex-col gap-5" action={action}>
//       <div>
//         <label>Business ID</label>
//         <input
//           type="text"
//           name="businessId"
//           id="businessId"
//           onBlur={handleOnBlur}
//           onChange={handleOnChange}
//           value={dish.businessId}
//           className="w-full p-2 border rounded"
//           placeholder="Enter Business ID"
//         />
//         <div className="min-h-8">
//           {blurs.businessId && errors?.businessId && (
//             <p className="text-red-500">{errors.businessId}</p>
//           )}
//         </div>
//       </div>
//       <div>
//         <label>Dish Name</label>
//         <input
//           type="text"
//           name="name"
//           id="name"
//           defaultValue={dish.name}
//           onBlur={handleOnBlur}
//           onChange={handleOnChange}
//           className="w-full p-2 border rounded"
//           placeholder="Enter Dish Name"
//         />
//         <div className="min-h-8">
//           {blurs.name && errors?.name && (
//             <p className="text-red-500">{errors.name}</p>
//           )}
//         </div>
//       </div>

//       <div>
//         <label>Price</label>
//         <input
//           type="text"
//           name="price"
//           id="price"
//           defaultValue={dish.price}
//           onBlur={handleOnBlur}
//           onChange={handleOnChange}
//           className="w-full p-2 border rounded"
//           placeholder="Product Price"
//         />
//         <div className="min-h-8">
//           {blurs.price && errors?.price && (
//             <p className="text-red-500">{errors.price}</p>
//           )}
//         </div>
//       </div>

//       <div>
//         <label>Description</label>
//         <textarea
//           name="description"
//           id="description"
//           defaultValue={dish.description}
//           className="w-full p-2 border rounded"
//           rows={5}
//         />
//         <div className="min-h-8">
//           {blurs.description && errors?.description && (
//             <p className="text-red-500">{errors.description}</p>
//           )}
//         </div>
//       </div>

//       <div>
//         <label>Dish Status</label>
//         <select name="activeStatus" id="activeStatus">
//           <option value="active">Active - In Stock</option>
//           <option value="outStock">Out of Stock</option>
//           <option value="discontinued">Discontinued</option>
//         </select>
//         <div className="min-h-8">
//           {blurs.active && errors?.active && (
//             <p className="text-red-500">{errors.active}</p>
//           )}
//         </div>
//       </div>

//       <div>
//         <label>Image Name</label>
//         <input
//           type="text"
//           name="image"
//           id="image"
//           defaultValue={dish.imageName || "/Placeholder.png"}
//           onBlur={handleOnBlur}
//           onChange={handleOnChange}
//           className="w-full p-2 border rounded"
//           placeholder="Name the Image is Saved as"
//         />
//         <div className="min-h-8">
//           {blurs.imageName && errors?.imagName && (
//             <p className="text-red-500">{errors.imageName}</p>
//           )}
//         </div>
//       </div>

//       <div>
//         <label>Image Link</label>
//         <input
//           type="url"
//           name="imageUrl"
//           id="imageUrl"
//           defaultValue={dish.imageUrl || "placehoder.com"}
//           onBlur={handleOnBlur}
//           onChange={handleOnChange}
//           className="w-full p-2 border rounded"
//           placeholder="Link to image"
//         />
//         <div className="min-h-8">
//           {blurs.imageUrl && errors?.imageUrl && (
//             <p className="text-red-500">{errors.imageUrl}</p>
//           )}
//         </div>
//       </div>

//       <button
//         disabled={isPending}
//         type="submit"
//         className="bg-blue-500
//             text-white px-4 py-2 rounded"
//       >
//         {isPending ? "Loading" : "Create Item"}
//       </button>
//     </form>
//   );
// }

//   // const clientAction = async (state: any, formData: FormData) => {
//   //   const newDish = {
//   //     businessId: formData.get("business_id"),
//   //     name: formData.get("name"),
//   //     active: formData.get("active"),
//   //     description: formData.get("description"),
//   //     image: formData.get("image"),
//   //     price: formData.get("price"),
//   //   };

//   //   const results = dishFormSchema.safeParse(newDish);

//   //   if (!results.success) {
//   //     // console.log(results.error.issues)
//   //     let errorMessage = "";

//   //     // If we we are to add toast, it be a good way to incoparte error Message.
//   //     results.error.issues.forEach((issue) => {
//   //       errorMessage =
//   //         errorMessage + issue.path[0] + ": " + issue.message + ". ";
//   //     });

//   //     toast.error(errorMessage);
//   //     return {
//   //       errors: results.error.flatten().fieldErrors,
//   //     };
//   //   }
//   //   console.log(results.data);
//   //   const response = await createDish(results.data);

//   //   if (response?.error) {
//   //     toast.error(response.error);
//   //   }
//   // };

//   // const [state, action, isPending] = useActionState(clientAction, undefined);

//   // return (
    
//   //   <form className="flex flex-col gap-5" action={action}>
//   //     <div>
//   //       <label>Business ID</label>
//   //       <input
//   //         type="text"
//   //         name="businessId"
//   //         id="businessId"
//   //         className="w-full p-2 border rounded"
//   //         placeholder="Enter Business ID"
//   //       />
//   //       {state?.errors?.businessId && (
//   //         <p className="text-red-500">{state.errors.businessId}</p>
//   //       )}
//   //     </div>

//   //     <div>
//   //       <label>Dish Name</label>
//   //       <input
//   //         type="text"
//   //         name="name"
//   //         id="name"
//   //         className="w-full p-2 border rounded"
//   //         placeholder="Enter Dish Name"
//   //       />
//   //       {state?.errors?.name && (
//   //         <p className="text-red-500">{state.errors.name}</p>
//   //       )}
//   //     </div>

//   //     <div>
//   //       <label>Price</label>
//   //       <input
//   //         type="text"
//   //         name="price"
//   //         id="price"
//   //         className="w-full p-2 border rounded"
//   //         placeholder="Product Price"
//   //       />
//   //       {state?.errors?.price && (
//   //         <p className="text-red-500">{state.errors.price}</p>
//   //       )}
//   //     </div>

//   //     <div>
//   //       <label>Description</label>
//   //       <textarea
//   //         name="description"
//   //         id="description"
//   //         className="w-full p-2 border rounded"
//   //         rows={5}
//   //       />
//   //       {state?.errors?.description && (
//   //         <p className="text-red-500">{state.errors.description}</p>
//   //       )}
//   //     </div>

//   //     <div>
//   //       <label>Dish Status: </label>
//   //       <select name="activeStatus" id="activeStatus">
//   //         <option value="active">Active - In Stock</option>
//   //         <option value="outStock">Out of Stock</option>
//   //         <option value="discontinued">Discontinued</option>
//   //       </select>
//   //       {state?.errors?.active && (
//   //         <p className="text-red-500">{state.errors.active}</p>
//   //       )}
//   //     </div>

//   //     <div>
//   //       <label>Image Name</label>
//   //       <input
//   //         type="text"
//   //         name="imageName"
//   //         id="imageName"
//   //         className="w-full p-2 border rounded"
//   //         placeholder="Name the Image is Saved as"
//   //       />
//   //       {state?.errors?.imageName && (
//   //         <p className="text-red-500">{state.errors.imageName}</p>
//   //       )}
//   //     </div>

//   //     <div>
//   //       <label>Image Link</label>
//   //       <input
//   //         type="url"
//   //         name="imageLink"
//   //         id="imageLink"
//   //         className="w-full p-2 border rounded"
//   //         placeholder="Link to Image"
//   //       />
//   //       {state?.errors?.imageUrl && (
//   //         <p className="text-red-500">{state.errors.imageUrl}</p>
//   //       )}
//   //     </div>

//   //     <button
//   //       disabled={isPending}
//   //       type="submit"
//   //       className="bg-blue-500
//   //           text-white px-4 py-2 rounded"
//   //     >
//   //       {isPending ? "Loading" : "Create Item"}
//   //     </button>
//   //   </form>
//   // );
// }
