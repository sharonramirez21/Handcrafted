import { ProductWithSeller } from "@/lib/definitions";
import styles from "./products.module.css";
import DashboardProductCard from "@/components/DashboardProductCard";

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
                    <DashboardProductCard key={product.id} product={product} />
                ))
            )}
        </div>
    )
}