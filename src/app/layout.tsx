import { Inter } from "next/font/google";
import "../app/globals.css";
import { Header } from "@/components/shared/header";
import { CartProvider } from "@/components/shared/cart";
import { getCart } from "@/lib/shopify";
import { cookies } from "next/headers";
import { Footer } from "@/components/shared";
import { Toaster } from "sonner";
import { WelcomeToast } from "@/components/shared/welcome-toast";
import { baseUrl } from "@/lib/utils";

const inter = Inter({
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const { SITE_NAME } = process.env;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  }
};


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Don't await the fetch, pass the Promise to the context provider
  const cartId = (await cookies()).get("cartId")?.value;
  const cart = getCart(cartId);

  return (
    <html lang="en" className={`${inter.className} antialiased`}>
      <body className="bg-neutral-50 text-black selection:bg-teal-300">
        <CartProvider cartPromise={cart}>
          <Header />
          <main>
            {children}
            <Toaster closeButton />
            <WelcomeToast />
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
