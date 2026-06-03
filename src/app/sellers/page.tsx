import { fetchProductsBySellerId, fetchSellers } from "@/lib/data";
import SellersGrid from "./SellersGrid";
import Footer from "@/components/Footer";
import styles from "./sellers.module.css"


export default async function PageSellers() {
    const sellers = await fetchSellers();

    return (
        <main>
            <div className={styles.sellersPage}>
                <section className={styles.sellersHero}>
                    <p className={styles.sellersLabel}>Meet our artisans</p>
                    <h1>Sellers</h1>
                    <p>Discover talented makers and explore the handmade products they create with care, creativity, and purpose.</p>
                </section>
            

            <section className={styles.sellersSection}>
                <div className={styles.sellersHeader}>
                    <div>
                        <h2>Artisan shops</h2>
                        <p>{sellers.length} sellers avaiable</p>
                    </div>
                </div>
                   <SellersGrid sellers={sellers} />
            </section>
            </div>
        </main>
    )
}