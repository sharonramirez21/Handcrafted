
import SellersGrid from "./SellersGrid";
import styles from "./sellers.module.css"
import { Suspense } from "react";
import SellersCardSkeleton from "@/components/SellersCardSkeleton";



export default async function PageSellers() {
    

    return (
        <main>
            <div className={styles.sellersPage}>
                <section className={styles.sellersHero}>
                    <p className={styles.sellersLabel}>Meet our artisans</p>
                    <h1>Sellers</h1>
                    <p>Discover talented makers and explore the handmade products they create with care, creativity, and purpose.</p>
                </section>
            
            
            <section className={styles.sellersSection}>
               <Suspense fallback={<SellersCardSkeleton/>}>
                    <SellersGrid />
                </Suspense>
            </section>
            </div>
        </main>
    )
}