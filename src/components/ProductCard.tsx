import Link from "next/link";
import type { ProductWithSeller } from "@/lib/definitions";
import Image from "next/image";

type ProductCardProps = {
    product: ProductWithSeller;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <article className="product-card">
            <Image src={product.image_url ?? "/placeholder.png"} alt={product.name} width={300} height={300}/>
            <div className="product-info">
                <h3>{product.name}</h3>
                <p className="seller">{product.seller_name}</p>
                <p className="price">${product.price.toFixed(2)}</p>
            </div>

            <div className="product-footer">
                <Link href={`/products/${product.id}`} className="product-link">
                    View details
                </Link>

                <p className="stars">★★★★★</p>
            </div>
        </article>
    )
}