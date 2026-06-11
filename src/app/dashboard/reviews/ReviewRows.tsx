import { auth } from "@/auth";
import { fetchReviewsForSellerProducts } from "@/lib/data";
import Link from "next/link";
import styles from "./review.module.css";
import Footer from "@/components/Footer";

export default async function ReviewRows({ }) {
    const session = await auth();
    const sellerId = session!.user!.userId;
    const reviews = await fetchReviewsForSellerProducts(sellerId);

    const averageRaiting = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    const starPercetage = (averageRaiting / 5) * 100;

    const filledStars = Math.round(averageRaiting);
    const emptyStars = 5 - filledStars;

    const ratings : Record<number, number> = {
        5: reviews.filter(r => r.rating === 5).length,
        4: reviews.filter(r => r.rating === 4).length,
        3: reviews.filter(r => r.rating === 3).length,
        2: reviews.filter(r => r.rating === 2).length,
        1: reviews.filter(r => r.rating === 1).length,
    }

    const totalReviews = reviews.length;

    return (
        <>
            <section className={styles.reviewSection}>
                <h2>Your Reviews</h2>
                <div className={styles.divRewviewsTotal}>
                    <div className={styles.porcentReviews}>
                        <p className={styles.averageRaiting}>{averageRaiting.toFixed(1)}</p>
                        <p className={styles.starsText}>
                            {"⭐".repeat(filledStars)}
                            {"☆".repeat(emptyStars)}
                        </p>
                        <p className={styles.starPercetage}>{starPercetage}%</p>
                    </div>
                    <div className={styles.ratingOneyOne}>
                        {[5, 4, 3, 2, 1].map((stars) => (
                            <div key={stars} className={styles.raitingDiv}>
                                <span className="rating-label">{stars}.0</span>

                                <div className={styles.bar}>
                                    <div
                                        className={styles.fill}
                                        style={{
                                            width: `${(ratings[stars] / totalReviews) * 100}%`,
                                        }}
                                    />
                                </div>

                                <span className="rating-count">
                                    {ratings[stars]} Reviews
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {reviews.map((review) => (
                    <div key={review.id} className={styles.reviewCard}>
                        <div className={styles.reviewDivCard}>
                            <div>
                                <h3 className={styles.guestnameReview}>{review.guest_name}</h3>
                                <p className={styles.dateReview}>{new Date(review.created_at).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className={styles.reviewStar}>{"⭐".repeat(review.rating)}</p>
                            </div>
                        </div>
                        <p className={styles.commentReview}>{review.comment}</p>
                        <div className={styles.reviewProductLik}>
                            <Link
                                href={`/dashboard/products/${review.product_id}`}
                                className={styles.productLink}
                                aria-label={`View details for ${review.product_name}`}
                            >
                                {review.product_name}
                            </Link>
                        </div>
                    </div>
                ))}
            </section>
            <Footer />
        </>
    )
}