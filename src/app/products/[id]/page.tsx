import { fetchProductById } from "@/lib/data";

export default async function ProductPage({
    params,
}: {
    params: { id: string }
}) {
    const { id } = await params;
    const product = await fetchProductById(id);
    return (
        <main>
            <h1>{product.name}</h1>
            <p>{product.seller_name}</p>
            <div className="product-image">×</div>
            <p>{product.description}</p>
            <p>${product.price.toFixed(2)}</p>
            <p>{product.category}</p>


            <button disabled>Buy</button>
        </main>
    )
}