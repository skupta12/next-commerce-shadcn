"use client";

import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "./cart-context";
import { addItem } from "./actions";
import { Product } from "@/lib/shopify/types";

function SubmitButton({
  availableForSale,
  selectedVariantId,
  isLoading,
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
  isLoading: boolean;
}) {
  const buttonClasses =
    "relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white";
  const disabledClasses = "cursor-not-allowed opacity-60 hover:opacity-60";

  if (!availableForSale) {
    return (
      <button disabled className={cn(buttonClasses, disabledClasses)}>
        Out of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        disabled
        className={cn(buttonClasses, disabledClasses)}
        aria-label="Please select an option"
      >
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div>
        Add to Cart
      </button>
    );
  }

  return (
    <button
      disabled={isLoading}
      className={cn(buttonClasses, { "hover:opacity-90": !isLoading })}
    >
      <div className="absolute left-0 ml-4">
        <PlusIcon className="h-5" />
      </div>
      {isLoading ? "Adding to cart..." : "Add To Cart"}
    </button>
  );
}

interface AddToCartProps {
  product: Product;
}

export const AddToCart = ({ product }: AddToCartProps) => {
  const { variants, availableForSale } = product;
  const { addCartItem } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const variant = variants[0]; // Пример выбора варианта, лучше использовать реальный выбранный вариант.
  const selectedVariantId = variant?.id;

  const handleAddToCart = async () => {
    if (!selectedVariantId) return;

    setIsLoading(true);
    try {
      await addItem(selectedVariantId, ); // Отправка запроса на добавление
      addCartItem(variant, product); // Обновление состояния корзины после запроса
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleAddToCart();
      }}
    >
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
        isLoading={isLoading}
      />
    </form>
  );
};
