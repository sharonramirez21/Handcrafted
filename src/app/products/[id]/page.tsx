import { fetchProductById, fetchReviewsByProductId } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import ReviewForm from "./ReviewForm";
import { notFound } from "next/navigation";
import styles from "../products.module.css";
import Footer from "@/components/Footer";

export default async function ProductPage({
    params,
}: {
    params: { id: string }
}) {
    const { id } = await params;
    const product = await fetchProductById(id);
    const reviews = await fetchReviewsByProductId(id);

    if (!product) {
        notFound();
    }
    
    return (
        <main className="product-page">
            <div className={styles.productDetail}>
                <Image src={product.image_url ?? "/placeholder.png"} alt={product.name} width={300} height={300} loading="eager"/>
                <div className="product-detail-info">
                    <h1>{product.name}</h1>
                    <Link className="seller-name" href={`/sellers/${product.seller_id}`}>{product.seller_name}</Link>
                    <p>Description: {product.description}</p>
                    <p className="product-price">${product.price.toFixed(2)}</p>
                    <p>Category: {product.category}</p>
                    <button className="buy-btn">Buy</button>
                </div>
            </div>

            <section className="reviews-section">
                <h2>Reviews</h2>
                {reviews.map((review) => (
                    <div key={review.id} className="review-card">
                        <h3>{review.guest_name}</h3>
                        <p>{new Date(review.created_at).toLocaleDateString()}</p>
                        <p>{"⭐".repeat(review.rating)}</p>
                        <p>{review.comment}</p>
                    </div>
                ))}
                <ReviewForm productId={id} />
            </section>
            <Footer />
        </main>
    )
}