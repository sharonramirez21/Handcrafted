export default function FeaturedProductsSkeleton() {
    return (
        <section className="products-section">
      <div className="section-header">
        <h2>Featured Products</h2>
        <div className="skeleton skeleton-text" />
      </div>

      <div className="product-grid">
        {[...Array(4)].map((_, index) => (
          <article className="product-card" key={index}>
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
        ))}
      </div>
    </section>
    )
}