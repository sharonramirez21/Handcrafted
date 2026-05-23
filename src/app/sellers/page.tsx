import { fetchProductsBySellerId, fetchSellers } from "@/lib/data";
import SellersGrid from "./SellersGrid";

export default async function PageSellers() {
    const sellers = await fetchSellers();

    return (
        <main>
            <h1>Sellers</h1>
            <SellersGrid sellers={sellers}/>
        </main>
    )
}