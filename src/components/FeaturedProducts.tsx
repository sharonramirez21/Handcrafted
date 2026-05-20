import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export default function FeaturedProducts() {
    
    return (
        <section className="products-section">
            <div className="section-header">
                <h2>Featured Prodcuts</h2>
                <Link href="/products">View all products →</Link>
            </div>

            <div className="product-grid">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>
        </section>
    )
}