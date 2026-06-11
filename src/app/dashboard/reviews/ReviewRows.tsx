import {auth} from "@/auth";
import {fetchReviewsForSellerProducts} from "@/lib/data";
import Link from "next/link";
import styles from "./review.module.css";
import Footer from "@/components/Footer";

export default async function ReviewRows({}){
    const session = await auth();
    const sellerId = session!.user!.userId;
    const reviews = await fetchReviewsForSellerProducts(sellerId);

    return (
        <>
            <section className={styles.reviewSection}>
                <h2>Reviews</h2>
                {reviews.map((review) => (
                    <div key={review.id} className={styles.reviewCard}>
                        <div className={styles.reviewDivCard}>
                            <div>
                                <h3>{review.guest_name}</h3>
                                <p>{new Date(review.created_at).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className={styles.reviewStar}>{"⭐".repeat(review.rating)}</p>
                            </div>
                        </div>
                        <p>{review.comment}</p>
                        <Link
                            href={`/dashboard/products/${review.product_id}`}
                            className="product-link"
                            aria-label={`View details for ${review.product_name}`}
                        >
                            {review.product_name}
                        </Link>
                    </div>
                ))}
            </section>
            <Footer />
        </>
    )
}