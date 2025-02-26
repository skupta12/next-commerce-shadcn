"use client";

import { CartItem } from "@/lib/shopify/types";
import { removeItem } from "./actions";
import { useActionState } from "react";
import { PlusIcon } from "lucide-react";

export function DeleteItemButton({
  item,
  // optimisticUpdate,
}: {
  item: CartItem;
  // optimisticUpdate: any;
}) {
  const [message, formAction] = useActionState(removeItem, null);
  const merchandiseId = item.merchandise.id;
  const actionWithVariant = formAction.bind(null, merchandiseId);

  return (
    <form
      action={async () => {
        // optimisticUpdate(merchandiseId, "delete");
        await actionWithVariant();
      }}
    >
      <button
        type="submit"
        aria-label="Remove cart item"
        className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-neutral-300"
      >
        <PlusIcon size={16} className="transform rotate-45" />
      </button>
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}