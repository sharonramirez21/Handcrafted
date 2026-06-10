import { fetchSellerById } from "@/lib/data";
import Image from "next/image";
import { notFound } from "next/navigation";
import {auth} from "@/auth";

export default async function Page() {
  const session = await auth();
  const sellerId = session!.user!.userId;

  const seller = await fetchSellerById(sellerId);

  if (!seller) {
    notFound();
  }

  return (
    <main>
      <div className="seller-profile-page">
        <section className="seller-hero">
          <div className="seller-image-wrapper">
            <Image
              src={seller.image_url ?? "/seller/placeholder-seller.png"}
              alt={seller.name}
              fill
              className="seller-image"
              loading="eager"
            />
          </div>

          <div className="seller-info">
            <p className="seller-label">Your Profile</p>

            <h1>{seller.name}</h1>

            {seller.bio && <p className="seller-bio">{seller.bio}</p>}

            {seller.story && (
              <div className="seller-story">
                <h2>Our Story</h2>
                <p>{seller.story}</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}