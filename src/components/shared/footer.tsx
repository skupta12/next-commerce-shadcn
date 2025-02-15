import { getMenu } from "@/lib/shopify";
import { Menu } from "@/lib/shopify/types";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface FooterProps {
    className?: string;
}

export const Footer: React.FC<FooterProps> = async ({ className }) => {

  const menu = await getMenu("next-js-footer-menu");

  return (
    <footer className={cn("flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t dark:border-t-black", className)}>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        {menu.length > 0 ? (
          <ul className="hidden gap-6 text-sm md:flex md:items-center">
            {menu.map((item: Menu) => (
              <li key={item.title}>
                <Link
                  href={item.path}
                  prefetch={true}
                  className="text-gray-700 underline-offset-4 hover:text-black
                  hover:underline"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </nav>
    </footer>
  );
}
