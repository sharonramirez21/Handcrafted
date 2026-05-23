import SellersCard from "@/components/SellerCard";
import { Seller } from "@/lib/definitions";

export default async function SellersGrid({
    sellers,
} : {
    sellers : Seller[]
}) {
    return (
        <div>
            {sellers.map((seller) => (
                <SellersCard key={seller.id} seller={seller}/> 
            ))}
        </div>
    )
    
}