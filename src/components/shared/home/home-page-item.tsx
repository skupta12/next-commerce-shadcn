import Link from "next/link";
import { ProductCardItem } from "../product";
import { Product } from "@/lib/shopify/types";

export function HomePageItem({
    item,
    size,
    priority
  }: {
    item: Product;
    size: 'full' | 'half';
    priority?: boolean;
  }) {
    return (
      <div
        className={size === 'full' ? 'md:col-span-4 md:row-span-2' : 'md:col-span-2 md:row-span-1'}
      >
        <Link
          className="relative block lg:aspect-[2/3] aspect-square h-full w-full"
          href={`/product/${item.handle}`}
          prefetch={true}
        >
          <ProductCardItem
            className="w-full h-full object-cover"
            src={item.featuredImage.url}
            fill
            sizes={
              size === 'full' ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'
            }
            priority={priority}
            alt={item.title}
            label={{
              position: size === 'full' ? 'center' : 'bottom',
              title: item.title as string,
              amount: item.priceRange.maxVariantPrice.amount,
              currencyCode: item.priceRange.maxVariantPrice.currencyCode
            }}
          />
        </Link>
      </div>
    );
  }