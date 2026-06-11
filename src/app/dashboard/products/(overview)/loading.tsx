import styles from "../products.module.css";

function ProductCardSkeleton() {
    return (
        <article className="product-card">
            <div className="skeleton skeleton-image" />
            <div className="product-info">
                <div className="skeleton skeleton-title" />
                <div className="skeleton skeleton-text" />
                <div className="skeleton skeleton-text" />
            </div>
            <div className="product-footer">
                <div className="skeleton skeleton-text" />
            </div>
        </article>
    );
}

export default function Loading() {
    return (
        <div className={styles.productsGrid}>
            {[...Array(6)].map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
    )
}