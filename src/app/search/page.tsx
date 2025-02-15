import { ProductCard } from "@/components/shared/product/product-card";
import { defaultSort, sorting } from "@/lib/constants";
import { getProducts } from "@/lib/shopify";
import React from "react";

export default async function SearchPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;

  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await getProducts({ sortKey, reverse, query: searchValue });
  const resultsText = products.length > 1 ? "results" : "result";

  return (
    <div>
      {searchValue ? (
        <p>
          {products.length === 0
            ? "There are no products that match "
            : `Showing ${products.length} ${resultsText} for `}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      ) : null}
      {products.length > 0 ? (
        <ProductCard className="mt-4" products={products} />
      ) : null}
    </div>
  );
}
