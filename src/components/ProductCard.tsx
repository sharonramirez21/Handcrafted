import Link from "next/link";
import type { Product } from "@/lib/products";

type ProductCardProps = {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <article className="product-card">
            <div className="product-image">×</div>

            <div className="product-info">
                <h3>{product.name}</h3>
                <p className="seller">{product.seller}</p>
                <p className="price">${product.price.toFixed(2) }</p>
            </div>

            <div className="product-footer">
                <Link href={`/products/${product.id}`} className="product-link">
                    View details
                </Link>

                <p className="stars">{"★".repeat(product.rating)}</p>
            </div>
        </article>
    )
}