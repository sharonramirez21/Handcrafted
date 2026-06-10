import {auth} from "@/auth";
import {fetchReviewsForSellerProducts} from "@/lib/data";
import Link from "next/link";

export default async function ReviewRows({}){
    const session = await auth();
    const sellerId = session!.user!.userId;
    const reviews = await fetchReviewsForSellerProducts(sellerId);

    return (
        <section className="reviews-section">
            <h2>Reviews</h2>
            {reviews.map((review) => (
                <div key={review.id} className="review-card">
                    <h3>{review.guest_name}</h3>
                    <p>{new Date(review.created_at).toLocaleDateString()}</p>
                    <p>{"⭐".repeat(review.rating)}</p>
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
    )
}