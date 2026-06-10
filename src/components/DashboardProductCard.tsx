import Link from "next/link";
import type {
  FeaturedProduct,
  ProductWithSeller,
  SellerProduct,
} from "@/lib/definitions";
import Image from "next/image";

type ProductCardProps = {
  product: FeaturedProduct | ProductWithSeller | SellerProduct;
};

export default function DashboardProductCard({ product }: ProductCardProps) {
  const avg_rating =
    "avg_rating" in product && product.avg_rating !== undefined
      ? Math.round(Number(product.avg_rating))
      : null;

  return (
    <article className="product-card">
      <Image
        src={product.image_url ?? "/placeholder.png"}
        alt={product.name}
        width={300}
        height={300}
        className="product-image"
        loading="eager"
        sizes="(max-width: 900px) 100vw, 400px"
      />

      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="seller">{product.seller_name}</p>
        <p className="price">${Number(product.price).toFixed(2)}</p>
        <p className="stock">Stock: {product.stock}</p>
      </div>

      <div className="product-footer">
        <Link
          href={`/dashboard/products/${product.id}`}
          className="product-link"
          aria-label={`View details for ${product.name}`}
        >
          View details
        </Link>

        {avg_rating !== null && (
          <p className="stars">
            {"★".repeat(avg_rating)}
            {"☆".repeat(5 - avg_rating)}
          </p>
        )}
      </div>
    </article>
  );
}