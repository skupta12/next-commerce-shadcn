import { Skeleton } from "@/components/ui";

export default function Loading() {
  return (
    <>
      <div className="grid grid-cols-12 gap-5">
        {Array(12)
          .fill(0)
          .map((_, index) => {
            return (
              <Skeleton className="bg-neutral-200 aspect-[3/2] w-full lg:col-span-4 sm:col-span-6 col-span-12" key={index}/>
            );
          })}
      </div>
    </>
  );
}
