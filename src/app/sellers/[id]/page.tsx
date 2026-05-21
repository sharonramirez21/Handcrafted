import ProductCard from "@/components/ProductCard";
import { fetchProductsBySellerId, fetchSellerById } from "@/lib/data";

export default async function Page({
    params,
} : {
    params : { id : string }
}
) { 
    const { id } = await params;
    const seller = await fetchSellerById(id);
    const productsbySeller = await fetchProductsBySellerId(id);
    return (
        <main>
            <div className="info-seller-id">
                <div className="img-seller">
                    <p>{seller.image_url}</p>
                </div>
                <h1>{seller.name}</h1>
                <p>{seller.bio}</p>
                <p>{seller.story}</p>
            </div>

            <div className="products-by-seller">
                {productsbySeller.map((product) => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>
        </main>
    )
}