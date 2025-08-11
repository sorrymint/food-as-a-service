"use client";
import React, { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DeleteDishAction } from "@/app/actions/database_Resquest";

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
          router.push("/menu"); // Refresh the page to update the UI
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
      className=" text-white disabled:opacity-50"
    >
      {isPending ? "Deleting..." : "Delete Dish"}
    </button>
  );
}
