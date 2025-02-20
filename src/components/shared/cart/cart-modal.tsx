"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../../ui/sheet";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui";
import { useCart } from "./cart-context";
import Image from "next/image";
import { createUrl } from "@/lib/utils";
import { Price } from "../price";
import { createCartAndSetCookie, redirectToCheckout } from "./actions";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { DEFAULT_OPTION } from "@/lib/constants";
import { DeleteItemButton, EditItemQuantityButton } from ".";
import { useFormStatus } from "react-dom";
import { LoadingDots } from "../loading-dots";
import { CartNumber } from "./cart-number";

interface CartModalProps {
  className?: string;
}

type MerchandiseSearchParams = {
  [key: string]: string;
};

export const CartModal: React.FC<CartModalProps> = ({ className }) => {

  const { cart, updateCartItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart?.totalQuantity);
  // const openCart = () => setIsOpen(true);
  // const closeCart = () => setIsOpen(false);

  useEffect(() => {
    if (!cart) {
      createCartAndSetCookie();
    }
  }, [cart]);

  useEffect(() => {
    if (
      cart?.totalQuantity &&
      cart?.totalQuantity !== quantityRef.current &&
      cart?.totalQuantity > 0
    ) {
      if (!isOpen) {
        setIsOpen(true);
      }
      quantityRef.current = cart?.totalQuantity;
    }
  }, [isOpen, cart?.totalQuantity, quantityRef]);

 
  return (
    <>
    <button className="relative" aria-label="Open cart">
      <CartNumber quantity={cart?.totalQuantity} />
    </button>
    <Sheet>
      <SheetTrigger asChild>
        <Button aria-label="Open mobile menu" className={"flex h-11 w-11"}>
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent aria-describedby="The cart modal window" side="right" className={`pb-0 bg-[#f3f3f7] ${className}`}>
        <VisuallyHidden>
          <SheetTitle className="text-[22px]">hidden</SheetTitle>
        </VisuallyHidden>

        {!cart || cart.lines.length === 0 ? (
          <div className="text-center h-full flex justify-center items-center text-2xl font-bold">
            Your cart is empty
          </div>
        ) : (
          <div className="pt-10 flex h-full flex-col justify-between overflow-hidden p-1">
               <ul className="grow overflow-auto py-4">
                    {cart.lines
                      .sort((a, b) =>
                        a.merchandise.product.title.localeCompare(
                          b.merchandise.product.title
                        )
                      )
                      .map((item, i) => {
                        const merchandiseSearchParams =
                          {} as MerchandiseSearchParams;

                        item.merchandise.selectedOptions.forEach(
                          ({ name, value }) => {
                            if (value !== DEFAULT_OPTION) {
                              merchandiseSearchParams[name.toLowerCase()] =
                                value;
                            }
                          }
                        );

                        const merchandiseUrl = createUrl(
                          `/product/${item.merchandise.product.handle}`,
                          new URLSearchParams(merchandiseSearchParams)
                        );

                        return (
                          <li
                            key={i}
                            className="flex w-full flex-col border-b border-neutral-300"
                          >
                            <div className="relative flex w-full flex-row justify-between px-1 py-4">
                              <div className="absolute z-40 -ml-1 -mt-2">
                                <DeleteItemButton               
                                  item={item}
                                  optimisticUpdate={updateCartItem}
                                />
                              </div>
                              <div className="flex flex-row">
                                <div className="relative h-16 w-16 overflow-hidden rounded-md border border-neutral-300 bg-neutral-300">
                                  <Image
                                    className="h-full w-full object-cover"
                                    width={64}
                                    height={64}
                                    alt={
                                      item.merchandise.product.featuredImage
                                        .altText ||
                                      item.merchandise.product.title
                                    }
                                    src={
                                      item.merchandise.product.featuredImage.url
                                    }
                                  />
                                </div>
                                <Link
                                  href={merchandiseUrl}
                                  // onClick={closeCart}
                                  className="z-30 ml-2 flex flex-row space-x-4"
                                >
                                  <div className="flex flex-1 flex-col text-base">
                                    <span className="leading-tight">
                                      {item.merchandise.product.title}
                                    </span>
                                    {item.merchandise.title !==
                                    DEFAULT_OPTION ? (
                                      <p className="text-sm text-neutral-500">
                                        {item.merchandise.title}
                                      </p>
                                    ) : null}
                                  </div>
                                </Link>
                              </div>
                              <div className="flex h-16 flex-col justify-between">
                                <Price
                                  className="flex justify-end space-y-2 text-right text-sm"
                                  amount={item.cost.totalAmount.amount}
                                  currencyCode={
                                    item.cost.totalAmount.currencyCode
                                  }
                                />
                                <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200">
                                  <EditItemQuantityButton
                                    item={item}
                                    type="minus"
                                    optimisticUpdate={updateCartItem}
                                  />
                                  <p className="w-6 text-center">
                                    <span className="w-full text-sm">
                                      {item.quantity}
                                    </span>
                                  </p>
                                  <EditItemQuantityButton
                                    item={item}
                                    type="plus"
                                    optimisticUpdate={updateCartItem}
                                  />
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                  <div className="py-4 text-sm text-neutral-500">
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1">
                      <p>Taxes</p>
                      <Price
                        className="text-right text-base text-black"
                        amount={cart.cost.totalTaxAmount.amount}
                        currencyCode={cart.cost.totalTaxAmount.currencyCode}
                      />
                    </div>
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1">
                      <p>Shipping</p>
                      <p className="text-right">Calculated at checkout</p>
                    </div>
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1">
                      <p>Total</p>
                      <Price
                        className="text-right text-base text-black"
                        amount={cart.cost.totalAmount.amount}
                        currencyCode={cart.cost.totalAmount.currencyCode}
                      />
                    </div>
                  </div>
                  
                  <form action={redirectToCheckout}>
                    <CheckoutButton />
                  </form>
          </div>
        )}

        {/* any content below */}
      </SheetContent>
    </Sheet>
    </>
  );
};

const CheckoutButton = () => {

  const { pending } = useFormStatus();
  
  return (
    <button
      className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
      type="submit"
      disabled={pending}
    >
      {pending ? <LoadingDots className="bg-white" /> : 'Proceed to Checkout'}
    </button>
  );
}
