import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { fetchFeaturedProducts } from "@/lib/data";

export  default async function FeaturedProducts() {
    const featuredProducts = await fetchFeaturedProducts()
    console.log(featuredProducts)
    return (
        <section className="products-section">
            <div className="section-header">
                <h2>Featured Prodcuts</h2>
                <Link href="/products">View all products →</Link>
            </div>

            <div className="product-grid">
                {featuredProducts.map((product) => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>
        </section>
    )
}