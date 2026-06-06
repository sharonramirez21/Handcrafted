import styles from "@/app/sellers/sellers.module.css";
function SellerSkeletonCard() {
    return (
        <article className={styles.sellerSkeletonCard}>
            <div className={styles.sellerSkeletonImage} />

                <div className={styles.sellerSkeletonContent}>
                <div className={styles.sellerSkeletonTitle} />
                <div className={styles.sellerSkeletonBio} />
                <div className={styles.sellerSkeletonStory} />
            </div>

            <div className={styles.sellerSkeletonFooter} />
        </article>
    );
}

export default function SellersCardSkeleton() {
    return (
        <div className={styles.sellersGrid}>
            {[...Array(4)].map((_, index) => (
            <SellerSkeletonCard key={index} />
            ))}
        </div>
    );
}
