import { HomePage } from "@/components/shared/home/home-page";
import React from "react";


export const metadata = {
  description:
    'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default function Home() {
  return (
    <>
      <HomePage />
    </>
  );
}
