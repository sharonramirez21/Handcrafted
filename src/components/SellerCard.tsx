import { Seller } from "@/lib/definitions"
import Link from "next/link";

type SellersCardProps = {
    seller : Seller;
}

export default async function SellersCard( { seller }:SellersCardProps) {
    return (
        <article className="seller-card">
            <div className="seller-img">x</div>
            <h3>{seller.name}</h3>
            <div className="seller-info">
                <p>{seller.bio}</p>
                <p>{seller.story?.slice(0, 50)}...</p>
            </div>
            <div className="seller-footer">
                <Link href={`/sellers/${seller.id}`} className="seller-lik">
                    View More
                </Link>
            </div>
        </article>
    )
}
