import { createDish } from '@/app/Admin/create/actions'
import React, { useActionState } from 'react'

export default function createDishForm() {

    const [state, action, isPending] = useActionState(createDish, undefined)

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
        {state?.erorrs?.business_id && (
          <p className="text-red-500">{state.erorrs.business_id}</p>
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
        {state?.erorrs?.name && (
          <p className="text-red-500">{state.erorrs.name}</p>
        )}
      </div>
      <div>
        <label>Avtive?</label>
        <input
          type="checkbox"
          name="isActive"
          id="isActive"
          defaultChecked={false}
        />
        {state?.erorrs?.active && (
          <p className="text-red-500">{state.erorrs.active}</p>
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
        {state?.erorrs?.discription && (
          <p className="text-red-500">{state.erorrs.discription}</p>
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
        {state?.erorrs?.image && (
          <p className="text-red-500">{state.erorrs.image}</p>
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
        {state?.erorrs?.price && (
          <p className="text-red-500">{state.erorrs.price}</p>
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