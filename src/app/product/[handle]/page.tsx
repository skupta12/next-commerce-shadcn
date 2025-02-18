import { Container } from "@/components/shared";
import { Gallery } from "@/components/shared/product";
import { getProduct } from "@/lib/shopify";
import { Image } from "@/lib/shopify/types";
import React, { Suspense } from "react";

export default async function ProductPage(props: {
  params: Promise<{ handle: string }>;
}) {
  const params = await props.params;
  const product = await getProduct(params.handle);

  return (
    <Container>
      <div
        className="flex flex-col rounded-lg border border-neutral-200
         bg-white p-8 md:p-12 lg:flex-row lg:gap-8"
      >
        <div className="w-full h-full basis-full lg:basis-4/6">
          <Suspense fallback={
             <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
          }>
            <Gallery
              images={product.images.slice(0, 5).map((image: Image) => ({
                src: image.url,
                altText: image.altText,
              }))}
            />
          </Suspense>
        </div>
        <div className="basis-full lg:basis-2/6">
          {/* <ProductDescription /> */}
        </div>
      </div>
      {/* <RelatedProducts /> */}
    </Container>
  );
}
