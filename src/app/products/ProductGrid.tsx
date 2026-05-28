import ProductCard from "@/components/ProductCard";
import { ProductWithSeller } from "@/lib/definitions";
import styles from "./products.module.css";

export default function ProductGrid({
    products,
}: {
    products : ProductWithSeller[]
}){
    return (
        <div className={styles.productsGrid}>
            {products.length === 0 ? (
                <p>There are no products</p>
            ) : (
                products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))
            )}
        </div>
    )
}