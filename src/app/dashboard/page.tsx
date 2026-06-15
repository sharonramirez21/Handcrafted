import styles from "./dashboard.module.css"
import {auth} from "@/auth";
import Link from "next/link";
import {fetchProductsBySellerId, fetchReviewsForSellerProducts} from "@/lib/data";

export default async function Page() {
    const session = await auth();
    const sellerName = session!.user!.name;
    const sellerId = session!.user!.userId;

    const products = await fetchProductsBySellerId(sellerId);
    const reviews = await fetchReviewsForSellerProducts(sellerId);

    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

    return (
        <div className={styles.dashboardBody}>
            <div className={styles.titleContaner}>
                <h1>Dashboard</h1>
                <h3>Welcome back, {sellerName}</h3>
            </div>
            <div className={styles.dashboardCardsContainer}>
                <div className={styles.dashboardCards}>
                    <p>Total Products</p>
                    <h2>{products.length}</h2>
                    <Link href={"/dashboard/products"}>View all products</Link>
                </div>
                <div className={styles.dashboardCards}>
                    <p>Total Reviews</p>
                    <h2>{reviews.length}</h2>
                    <Link href={"/dashboard/reviews"}>View all reviews</Link>
                </div>
                <div className={styles.dashboardCards}>
                    <p>Average Rating</p>
                    <h2>{averageRating} ⭐</h2>
                    <p>Across all products</p>
                </div>
            </div>
            <div className={styles.gridContaner}>
                <div className={styles.reviewRows}>
                    <h2>Recent Reviews</h2>
                    {reviews.slice(0, 3).map((review) => (
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
                </div>
                <div className={styles.quickActions}>
                    <h2>Quick Actions</h2>
                    <Link href={"/dashboard/products/create"} className={styles.actionLinks}>Add New Product</Link>
                    <Link href={"/dashboard/seller"} className={styles.actionLinks}>Edit Profile</Link>
                    <Link href={"/dashboard/reviews"} className={styles.actionLinks}>View All Reviews</Link>
                </div>
            </div>
        </div>
    )
}




































