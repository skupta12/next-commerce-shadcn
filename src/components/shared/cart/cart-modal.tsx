"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../../ui/sheet";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui";
import { useCart } from "./cart-context";
import { createUrl } from "@/lib/utils";
import { createCartAndSetCookie, redirectToCheckout } from "./actions";
import { useEffect, useRef, useState } from "react";
import { DEFAULT_OPTION } from "@/lib/constants";
import { CalculatedCheckout, CartModalItem, CartNumber } from ".";
import { useFormStatus } from "react-dom";
import { LoadingDots } from "..";

type MerchandiseSearchParams = {
  [key: string]: string;
};

export const CartModal: React.FC = () => {

  const { cart, updateCartItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart?.totalQuantity);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

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
      <Sheet open={isOpen} onOpenChange={isOpen ? closeCart : openCart}>
        <SheetTrigger asChild>
          <Button aria-label="Open mobile menu" className={"flex h-11 w-11"}>
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent
          aria-describedby="The cart modal window"
          side="right"
          className={`bg-[#f3f3f7]`}
        >
          <VisuallyHidden>
            <SheetTitle className="text-[22px]">hidden</SheetTitle>
          </VisuallyHidden>

          {!cart || cart.lines.length === 0 ? (
            <div className="text-center h-full flex justify-center items-center text-2xl font-bold">
              Your cart is empty
            </div>
          ) : (
            <div className="pt-10 flex h-full flex-col justify-between overflow-hidden p-0">
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
                          merchandiseSearchParams[name.toLowerCase()] = value;
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
                        <CartModalItem
                          item={item}
                          optimisticUpdate={updateCartItem}
                          productImageAlt={
                            item.merchandise.product.featuredImage.altText ||
                            item.merchandise.product.title
                          }
                          productImageUrl={
                            item.merchandise.product.featuredImage.url
                          }
                          productTitle={
                            item.merchandise.product.title
                          }
                          merchandiseUrl={merchandiseUrl}
                          merchandiseTitle={item.merchandise.title}
                          totalAmount={item.cost.totalAmount.amount}
                          currencyCode={item.cost.totalAmount.currencyCode}
                          quantity={item.quantity}
                          defaultOption={DEFAULT_OPTION}
                        />
                      </li>
                    );
                  })}
              </ul>
              <CalculatedCheckout
                totalTaxAmount={cart.cost.totalTaxAmount.amount}
                totalAmountCurrencyCode={cart.cost.totalAmount.currencyCode}
                totalAmount={cart.cost.totalAmount.amount}
                totalTaxAmountCurrencyCode={cart.cost.totalTaxAmount.currencyCode}
              />

              <form action={redirectToCheckout}> {/* <form onSubmit={async (e) => { e.preventDefault(); await redirectToCheckout(); }}> */}
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
      {pending ? <LoadingDots className="bg-white" /> : "Proceed to Checkout"}
    </button>
  );
};
