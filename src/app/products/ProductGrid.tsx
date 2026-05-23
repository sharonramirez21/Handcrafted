import ProductCard from "@/components/ProductCard";
import { ProductWithSeller } from "@/lib/definitions";

export default function ProductGrid({
    products,
}: {
    products : ProductWithSeller[]
}){
    return (
        <div>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}