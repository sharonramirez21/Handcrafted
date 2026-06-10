import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { fetchProductsBySellerId, fetchSellerById } from "@/lib/data";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } =await params;

  const seller = await fetchSellerById(id);

  if (!seller) {
    notFound();
  }

  const productsBySeller = await fetchProductsBySellerId(id);

  return (
    <main>
      <div className="seller-profile-page">
        <section className="seller-hero">
          <div className="seller-image-wrapper">
            <Image
              src={seller.image_url ?? "/seller/placeholder-seller.png"}
              alt={seller.name}
              fill
              className="seller-image"
              loading="eager"
              sizes="(max-width: 768px) 100vw, 300px"
            />
          </div>

          <div className="seller-info">
            <p className="seller-label">Artisan Profile</p>

            <h1>{seller.name}</h1>

            {seller.bio && <p className="seller-bio">{seller.bio}</p>}

            {seller.story && (
              <div className="seller-story">
                <h2>Our Story</h2>
                <p>{seller.story}</p>
              </div>
            )}
          </div>
        </section>
        <section className="seller-products-section">
          <div className="section-header">
            <div>
              <h2>Items available</h2>
              <p>{productsBySeller.length} handmade products</p>
            </div>
          </div>

          {productsBySeller.length === 0 ? (
            <div className="empty-state">
              <p>This seller does not have products available yet.</p>
            </div>
          ) : (
            <div className="product-grid">
              {productsBySeller.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>

      <Footer />
    </main>
  );
}