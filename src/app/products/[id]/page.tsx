import { fetchProductById } from "@/lib/data";
import Image from "next/image";

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
            <Image src={product.image_url ?? "/placeholder.png"} alt={product.name} width={300} height={300} loading="eager"/>
            <p>{product.description}</p>
            <p>${product.price.toFixed(2)}</p>
            <p>{product.category}</p>


            <button disabled>Buy</button>
        </main>
    )
}