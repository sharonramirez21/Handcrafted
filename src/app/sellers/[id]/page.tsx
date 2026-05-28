import ProductCard from "@/components/ProductCard";
import { fetchProductsBySellerId, fetchSellerById } from "@/lib/data";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Page({
    params,
} : {
    params : { id : string }
}
) { 
    const { id } = await params;
    const seller = await fetchSellerById(id);
    const productsbySeller = await fetchProductsBySellerId(id);

    if (!seller) {
        notFound();
    }

    return (
        <main>
            <div className="info-seller-id">
                {/**For hero img in sellers profile */}
                <div style={{ position: "relative", width: "100%", height: "300px" }}>
                    <Image
                        src={seller.image_url}
                        alt={seller.name}
                        fill
                        style={{ objectFit: "cover" }}
                        loading="eager"
                    />
                </div>
                <h1>{seller.name}</h1>
                <p>{seller.bio}</p>
                <p>{seller.story}</p>
            </div>

            <div className="products-by-seller">
                <h3>Items available</h3>
                {productsbySeller.map((product) => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>
        </main>
    )
}