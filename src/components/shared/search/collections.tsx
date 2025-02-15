import { Skeleton } from "@/components/ui";
import { getCollections } from "@/lib/shopify";
import clsx from "clsx";
import { Suspense } from "react";

async function CollectionList() {
  
  const collections = await getCollections();
  // return <FilterList list={collections} title="Collections" />;
  console.log(collections);
}


const activeAndTitles = "bg-neutral-800";
const items = "bg-neutral-400";

export default async  function Collections() {
  const collections = await getCollections();

  console.log(collections);
  return (
    <Suspense
      fallback={
        <div className="col-span-2 hidden h-[400px] w-full flex-none py-4 lg:block">
          <div className={clsx(<Skeleton />, activeAndTitles)} />
          <div className={clsx(<Skeleton />, activeAndTitles)} />
          <div className={clsx(<Skeleton />, items)} />
          <div className={clsx(<Skeleton />, items)} />
          <div className={clsx(<Skeleton />, items)} />
          <div className={clsx(<Skeleton />, items)} />
          <div className={clsx(<Skeleton />, items)} />
          <div className={clsx(<Skeleton />, items)} />
          <div className={clsx(<Skeleton />, items)} />
          <div className={clsx(<Skeleton />, items)} />
        </div>
      }
    >
      {/* <CollectionList /> */}
    </Suspense>
  );
}
