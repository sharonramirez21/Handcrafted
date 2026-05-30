import ProductCard from "@/components/ProductCard";
import { fetchProductsBySellerId, fetchSellerById } from "@/lib/data";
import Image from "next/image";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";

export default async function Page({
    params,
} : {
    params : { id : string }
}
) { 
    const { id } = await params;
    const seller = await fetchSellerById(id);
    if (!seller) {
        notFound()
    }
    
    const productsbySeller = await fetchProductsBySellerId(id);

    
    return (
        <main>
            <div className="seller-profile-page">
                <section className="seller-hero">
                    <div className="seller-image-wrapper">
                        <Image
                        src={seller.image_url}
                        alt={seller.name}
                        fill
                        className="seller-image"
                        loading="eager"
                        />
                    </div>

                    <div className="seller-info">
                        <p className="seller-laber">Artisan Profile</p>
                        <h1>{seller.name}</h1>

                        {seller.bio && <p className="seller-bio">{seller.bio}</p>}

                        {seller.story && (
                            <div className="seller-story">
                                <h2>Our story</h2>
                                <p>{seller.story}</p>
                            </div>
                        )}
                    </div>
                </section>


                <section className="seller-products-section">
                    <div className="section-header">
                        <div>
                            <h2>Items available</h2>
                            <p>{productsbySeller.length} handmade products</p>
                        </div>
                    </div>

                    {productsbySeller.length === 0 ? (
                        <div className="empty-state">
                            <p>This seller does not have products available yet.</p>
                        </div>
                    ) : (
                            <div className="product-grid">
                                {productsbySeller.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                    )}

                </section>
            </div>
        <Footer/>
        </main>
        

    );
}