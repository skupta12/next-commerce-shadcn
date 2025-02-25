"use client";

import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";
import { Button } from "../../ui/button";
import Link from "next/link";
import { Menu } from "@/lib/shopify/types";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu as MenuIcon } from "lucide-react";
import { SearchForm } from "../search-form";

interface HeaderMobileMenuProps {
  className?: string;
  menu: Menu[];
}


export const HeaderMobileMenu: React.FC<HeaderMobileMenuProps> = ({
  className,
  menu,
}) => {
  const [open, setOpen] = React.useState(false); // temp

  const handleCloseModal = (isOpen?: boolean) => {
    
    // temp
    if (!isOpen) {
      setTimeout(() => setOpen(false), 300);
    } else {
      setOpen(true);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button aria-label="Open mobile menu" className={"flex h-11 w-11"}>
          <MenuIcon className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className={`pb-0 bg-[#f3f3f7] ${className}`}>
        <SearchForm onSearch={handleCloseModal} className="mt-14" />

        <nav className="mt-4">
          {menu.length ? (
            <ul className="flex flex-col gap-3 text-base">
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <SheetClose asChild>
                    <Link
                      href={item.path}
                      prefetch={true}
                      className="text-neutral-500 underline-offset-4 hover:text-black hover:underline"
                    >
                      {item.title}
                    </Link>
                  </SheetClose>
                </li>
              ))}
            </ul>
          ) : null}
        </nav>

        <VisuallyHidden>
          <SheetTitle>hidden</SheetTitle>
        </VisuallyHidden>
      </SheetContent>
    </Sheet>
  );
};
