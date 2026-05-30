import Link from "next/link";
import type { FeaturedProduct, ProductWithSeller, SellerProduct } from "@/lib/definitions";
import Image from "next/image";

type ProductCardProps = {
    product: FeaturedProduct | ProductWithSeller | SellerProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
    const rating = "avg_rating" in product && product.avg_rating !== undefined
      ? Math.round(Number(product.avg_rating))
      : null;
    return (
        <article className="product-card">
            <Image src={product.image_url ?? "/placeholder.png"} alt={product.name} width={300} height={300} className="product-image"/>
            <div className="product-info">
                <h3>{product.name}</h3>
                <p className="seller">{product.seller_name}</p>
                <p className="price">${Number(product.price).toFixed(2)}</p>
            </div>

            <div className="product-footer">
                <Link href={`/products/${product.id}`} className="product-link" aria-label={`View details for ${product.name}`}>
                    View details
                </Link>

                 {rating !== null && (
                    <p className="stars">
                        {"★".repeat(rating)}
                        {"☆".repeat(5 - rating)}
                    </p>
                    )}
            </div>
        </article>
    )
}