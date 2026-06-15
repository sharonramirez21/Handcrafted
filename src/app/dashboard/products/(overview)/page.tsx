import ProductGrid from "../ProductGrid";
import Search from "@/components/Search";
import { auth } from "@/auth";
import Link from "next/link";
import styles from "../products.module.css"
import { fetchProductsBySellerEmail } from "@/lib/data";

export default async function ProductPage(
    props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}
) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';

    const session = await auth();
    const sellerEmail = session!.user!.email;

    if (!sellerEmail) {
        throw new Error("Seller email was not found in the session")
    }


    const products = await fetchProductsBySellerEmail(sellerEmail, query);
    
    return (
        <main >
            <div className={styles.dashboardHeader}>
                <div>
                    <h1>Your Products</h1>
                    <p>Manage the products you sell in Handcrafted Haven.</p>
                </div>
                
                <Link href="/dashboard/products/create" className={styles.addButton}>
                    Add New Product
                </Link>
            </div>
            <Search placeholder="Search products..." />
            <ProductGrid products={products} />
        </main>
    )
}