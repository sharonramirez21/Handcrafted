export const dynamic = "force-dynamic";

import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import SellerCallToAction from "@/components/SellerCallToAction";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import FeaturedProductsSkeleton from "@/components/FeaturedProductsSkeleton";


export default function HomePage() {
  return (
      <div className="main">
        <HeroSection />
      <BenefitsSection />
      <Suspense fallback={<FeaturedProductsSkeleton/>}>
        <FeaturedProducts />
      </Suspense>
        <SellerCallToAction />
        
      </div>
  );
}