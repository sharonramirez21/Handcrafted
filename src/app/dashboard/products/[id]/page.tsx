import { fetchProductById, fetchReviewsByProductId } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./ReviewForm.module.css";


export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const product = await fetchProductById(id);
  const reviews = await fetchReviewsByProductId(id);

  if (!product) {
    notFound();
  }

  return (
    <main className={styles.productPage}>
      <div className={styles.productDetail}>
        <Image
          src={product.image_url ?? "/products/placeholder.png"}
          alt={product.name}
          width={300}
          height={300}
          loading="eager"
          className={styles.productImage}
        />

        <div className={styles.productDetailInfo}>
          <h1>{product.name}</h1>

          <Link className={styles.sellerName} href={`/sellers/${product.seller_id}`}>
            {product.seller_name}
          </Link>

          <p>Description: {product.description}</p>
          <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
          {"stock" in product && <p className="stock">Stock: {product.stock}</p>}
          <p>Category: {product.category}</p>

          <Link
            href={`/dashboard/products/${product.id}/edit`}
            className={styles.editProductButton}
          >
            Edit Product
          </Link>
        </div>
      </div>

      <section className={styles.reviewsSection}>
        <h2>Reviews</h2>

        {reviews.length === 0 ? (
          <p className={styles.noReviews}>This product has no reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <h3>{review.guest_name}</h3>
              <p>{new Date(review.created_at).toLocaleDateString()}</p>
              <p>{"⭐".repeat(review.rating)}</p>
              <p>{review.comment}</p>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
