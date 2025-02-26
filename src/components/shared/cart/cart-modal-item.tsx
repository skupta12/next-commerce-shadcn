import React from "react";
import Image from "next/image";
import { DeleteItemButton, EditItemQuantityButton } from ".";
import Link from "next/link";
import { Price } from "..";
import { CartItem } from "@/lib/shopify/types";

interface CartModalItemProps {
  className?: string;
  item: CartItem;
  optimisticUpdate: any;
  productImageAlt: string;
  productTitle: string;
  productImageUrl: string;
  merchandiseUrl: string;
  merchandiseTitle: string;
  totalAmount: string;
  currencyCode: string;
  quantity: number;
  defaultOption: string;
}

export const CartModalItem: React.FC<CartModalItemProps> = ({
  item,
  optimisticUpdate,
  productImageAlt,
  productTitle,
  productImageUrl,
  merchandiseUrl,
  merchandiseTitle,
  totalAmount,
  currencyCode,
  quantity,
  defaultOption,
}) => {
  return (
    <div className="relative flex w-full flex-row justify-between px-1 py-4">
      <div className="absolute z-40 -ml-1 -mt-2">
        <DeleteItemButton item={item} />
      </div>
      <div className="flex flex-row">
        <div className="relative h-16 w-16 overflow-hidden rounded-md border border-neutral-300 bg-neutral-300">
          <Image
            className="h-full w-full object-cover"
            width={64}
            height={64}
            alt={productImageAlt || productTitle}
            src={productImageUrl}
          />
        </div>
        <Link
          href={merchandiseUrl}
          // onClick={closeCart}
          className="z-30 ml-2 flex flex-row space-x-4"
        >
          <div className="flex flex-1 flex-col text-base">
            <span className="leading-tight">{productTitle}</span>
            {merchandiseTitle !== defaultOption ? (
              <p className="text-sm text-neutral-500">{merchandiseTitle}</p>
            ) : null}
          </div>
        </Link>
      </div>
      <div className="flex h-16 flex-col justify-between">
        <Price
          className="flex justify-end space-y-2 text-right text-sm"
          amount={totalAmount}
          currencyCode={currencyCode}
        />
        <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200">
          <EditItemQuantityButton
            item={item}
            type="minus"
            optimisticUpdate={optimisticUpdate}
          />
          <p className="w-6 text-center">
            <span className="w-full text-sm">{quantity}</span>
          </p>
          <EditItemQuantityButton
            item={item}
            type="plus"
            optimisticUpdate={optimisticUpdate}
          />
        </div>
      </div>
    </div>
  );
};
