import styles from "../sellers.module.css";

export default function Loading() {
  return (
    <main>
      <div className="seller-profile-page">
        <section className="seller-hero">
          <div className="seller-image-wrapper">
            <div className={styles.sellerProfileSkeletonImage} />
          </div>

          <div className="seller-info">
            <div className={styles.sellerProfileSkeletonLabel} />
            <div className={styles.sellerProfileSkeletonTitle} />
            <div className={styles.sellerProfileSkeletonBio} />

            <div className="seller-story">
              <div className={styles.sellerProfileSkeletonStoryTitle} />
              <div className={styles.sellerProfileSkeletonStoryText} />
              <div className={styles.sellerProfileSkeletonStoryTextShort} />
            </div>
          </div>
        </section>

        <section className="seller-products-section">
          <div className="section-header">
            <div>
              <div className={styles.sellerProfileSkeletonSectionTitle} />
              <div className={styles.sellerProfileSkeletonSectionText} />
            </div>
          </div>

          <div className="product-grid">
            {[...Array(4)].map((_, index) => (
              <article className="product-card" key={index}>
                <div className={styles.sellerProductSkeletonImage} />

                <div className="product-info">
                  <div className={styles.sellerProductSkeletonTitle} />
                  <div className={styles.sellerProductSkeletonText} />
                  <div className={styles.sellerProductSkeletonTextSmall} />
                </div>

                <div className="product-footer">
                  <div className={styles.sellerProductSkeletonLink} />
                  <div className={styles.sellerProductSkeletonRating} />
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

    </main>
  );
}
