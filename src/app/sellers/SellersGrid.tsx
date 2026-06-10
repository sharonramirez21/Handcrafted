import SellersCard from "@/components/SellerCard";
import styles from "./sellers.module.css"
import { fetchSellers } from "@/lib/data";


export default async function SellersGrid() {
    const sellers = await fetchSellers();
    if (sellers.length === 0) {
        return (
            <div className={styles.emptyState}>
                 <p>No sellers available yet.</p>
            </div>
                 );
    }

    return (
        <>
        <div className={styles.sellersHeader}>
            <div>
                <h2>Artisan shops</h2>
                <p>{sellers.length} sellers avaiable</p>
            </div>
        </div>
        <div className={styles.sellersGrid}>
            {sellers.map((seller) => (
            <SellersCard key={seller.id} seller={seller} />
             ))}
        </div>
        </>
    );
}
