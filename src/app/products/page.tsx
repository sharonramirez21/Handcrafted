import { fetchProducts } from "@/lib/data";
import ProductGrid from "./ProductGrid";
import ProductsFilter from "@/components/ProductsFilter";
import styles from "./products.module.css"

export default async function ProductPage({
    searchParams 
}
: {
    searchParams : Promise<{ category?: string, price?: string }>
}
) {
    const products = await fetchProducts();
    const { category, price } = await searchParams; 

    const filteredProducts = products.filter((product) => {
        if (category && category !== "all-categories") {
            return product.category == category;
        }

        if (price === 'under') {
            return product.price < 2000;
        }

        if (price === '2000-3000') {
            return product.price >= 2000 && product.price <= 3000;
        }

        if (price === 'over-3000') {
            return product.price > 3000;
        }

        return true
    })

    return (
        <div className={styles.productsHead}>
            <h1 className={styles.productCataloge}>Product Catalog</h1>
            <ProductsFilter />
            <ProductGrid products={filteredProducts} /> 
            <hr className={styles.divider} />
        </div>
    )
}