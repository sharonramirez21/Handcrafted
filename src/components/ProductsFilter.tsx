'use client';

import styles from "../app/products/products.module.css";
import { useRouter } from "next/navigation";

export default function ProductsFilter() {
    const router = useRouter();

    return (
        <div className={styles.filters}>
            <select className={styles.filterSelect}
                onChange={(e) => {
                    router.push(`/products?category=${e.target.value}`)
                }}
            >
                <option value="all-categories">All Categories</option>
                <option value="Jewelry">Jewelry</option>
                <option value="Pottery">Pottery</option>
                <option value="Home Decor">Home Decor</option>
            </select>

            <select className={styles.filterSelect}
                onChange={(e) => {
                    router.push(`/products?price=${e.target.value}`)
                }}
            >
                <option value="All-Prices">All Prices</option>
                <option value="under">Under $2000</option>
                <option value="2000-3000">$2000 - $3000</option>
                <option value="over-3000">Over $3000</option>
            </select>
        </div>

    )
}