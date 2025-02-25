import { getCollectionProducts } from "@/lib/shopify";
import { HomePageItem } from "./home-page-item";
import { Container } from "../container";

export async function HomePage() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const homepageItems = await getCollectionProducts({
    collection: "mens-collection",
  });

  if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null;

  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  return (
    <section>
      <Container className="sm:max-w-[1440px]">
        <div className="grid gap-4 pb-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)] mt-5">
          <HomePageItem size="full" item={firstProduct} priority={true} />
          <HomePageItem size="half" item={secondProduct} priority={true} />
          <HomePageItem size="half" item={thirdProduct} />
        </div>
      </Container>
    </section>
  );
}
