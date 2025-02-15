import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import React from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../../ui/sheet";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui";

interface CartModalProps {
  className?: string;
}

export const CartModal: React.FC<CartModalProps> = ({ className }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button aria-label="Open mobile menu" className={"flex h-11 w-11"}>
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className={`pb-0 bg-[#f3f3f7] ${className}`}>
        <VisuallyHidden>
          <SheetTitle className="text-[22px]">hidden</SheetTitle>
        </VisuallyHidden>

        {/* any content below */}
      </SheetContent>
    </Sheet>
  );
};
