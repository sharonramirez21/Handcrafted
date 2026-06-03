import SellersCard from "@/components/SellerCard";
import { Seller } from "@/lib/definitions";
import styles from "./sellers.module.css"

export default function SellersGrid({ sellers }: { sellers: Seller[] }) {
if (sellers.length === 0) {
return (
<div className={styles.emptyState}>
<p>No sellers available yet.</p>
</div>
);
}

return (
<div className={styles.sellersGrid}>
{sellers.map((seller) => (
<SellersCard key={seller.id} seller={seller} />
))}
</div>
);
}
