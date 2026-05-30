import { fetchProductsBySellerId, fetchSellers } from "@/lib/data";
import SellersGrid from "./SellersGrid";
import Footer from "@/components/Footer";

export default async function PageSellers() {
    const sellers = await fetchSellers();

    return (
        <main>
            <h1>Sellers</h1>
            <SellersGrid sellers={sellers} />
        </main>
    )
}