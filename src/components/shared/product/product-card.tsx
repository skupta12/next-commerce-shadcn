import { Product } from "@/lib/shopify/types";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import { ProductCardItem } from "./product-card-item";

interface ProductCardProps {
  className?: string;
  products: Product[];
}

export const ProductCard: React.FC<ProductCardProps> = ({
  className,
  products,
}) => {
  return (
    <div className={cn("grid grid-cols-12 gap-5", className)}>
      {products.map((product) => (
        <div
          key={product.handle}
          className="lg:col-span-4 sm:col-span-6 col-span-12 border p-0"
        >
          <Link
            className="flex flex-col gap-4"
            prefetch
            href={`/product/${product.handle}`}
          >
            <ProductCardItem
              width={300}
              height={200}
              alt={product.title}
              label={{
                title: product.title,
                amount: product.priceRange.maxVariantPrice.amount,
                currencyCode: product.priceRange.minVariantPrice.currencyCode,
              }}
              src={product.featuredImage?.url}
              className="text-[25px] text-semibold"
            />
          </Link>
        </div>
      ))}
    </div>
  );
};
