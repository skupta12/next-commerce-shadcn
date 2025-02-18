import { Container } from "@/components/shared";
import { Suspense } from "react";
import ChildrenWrapper from "./children-wrapper";
import { sorting } from "@/lib/constants";
import { FilterList } from "@/components/shared/search/filter";
import Collections from "@/components/shared/search/collections";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Container>
        <div className="flex flex-col gap-8 px-4 pb-4 text-black md:flex-row mt-12">
          <div className="order-first w-full flex-none md:max-w-[125px]">
            <Collections />
          </div>
          <div className="order-last min-h-screen w-full md:order-none">
            <Suspense fallback={null}>
              <ChildrenWrapper>{children}</ChildrenWrapper>
            </Suspense>
          </div>
          <div className="order-none flex-none md:order-last md:w-[125px]">
            <FilterList list={sorting} title="Sort by" />
          </div>
        </div>
      </Container>
    </section>
  );
}
