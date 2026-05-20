import Image from "next/image";
import PublicSidebar from "@/components/PublicSidebar";
import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import SellerCallToAction from "@/components/SellerCallToAction";
import Footer from "@/components/Footer";


export default function HomePage() {
  return (
    <div className = "page">
      <PublicSidebar />
      <main className="main">
        <HeroSection />
        <BenefitsSection />
        <FeaturedProducts />
        <SellerCallToAction />
        <Footer /> 
      </main>
    </div>
  );
}
