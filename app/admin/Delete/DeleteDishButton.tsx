"use client";
import React, { useTransition } from "react";
import { DeleteDishAction } from "./actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DeleteDishButton({ dishId }: { dishId: number }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this dish?")) {
      // When the button is clicked these function will be running in the back ground
      // Trandstion give use access to ispending allow for the dynamic movement
      startTransition(async () => {
        const result = await DeleteDishAction(dishId, {} as any);

        // Checks if the results was successful
        if (result?.success) {
          toast.success(`Item ${dishId} is Deleted`);
          router.push('/menu'); // Refresh the page to update the UI
        } else {
          console.error(result?.error || "Failed to delete dish");
          alert(result?.error || "Failed to delete dish");
        }
      });
    }
  };
  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
    >
      {isPending ? "Deleting..." : "Delete Dish"}
    </button>
  );
}
