import React from "react";
import Link from "next/link";
import { Menu } from "@/lib/shopify/types";
import { getMenu } from "@/lib/shopify";
import LogoSquare from "../icons/logo-square";
import { Container, SearchForm } from "@/components/shared";
import { HeaderMobileMenu } from "./header-mobile-menu";
import { CartModal } from "../cart/cart-modal";

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = async ({ className }) => {
  const menu = await getMenu("next-js-frontend-menu");

  return (
    <header className={className}>
      <Container>
        <nav className="flex items-center justify-between py-4">
          <div className="block flex-none md:hidden">
            {/* mobile */}
            <HeaderMobileMenu menu={menu} />
          </div>
          <div className="flex w-full items-center">
            <div className="flex w-full md:w-1/3">
              <Link
                prefetch
                href="/"
                className="mr-2 flex w-full 
              items-center justify-center md:w-auto lg:mr-6"
              >
                <LogoSquare />

                <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
                  {process.env.SITE_NAME}
                </div>
              </Link>

              {/* desktop */}
              {menu.length ? (
                <ul className="hidden gap-x-6 text-sm md:flex md:items-center">
                  {menu.map((item: Menu) => (
                    <li key={item.title}>
                      <Link
                        href={item.path}
                        prefetch={true}
                        className="text-neutral-500 underline-offset-4 hover:text-black hover:underline"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <div className="hidden justify-center md:flex lg:w-1/3">
              <SearchForm />
            </div>
            <div className="flex justify-end md:w-1/3">
              <CartModal />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
};
