import { fetchSellerByEmail } from "@/lib/data";
import Image from "next/image";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import styles from "./sellers.module.css";
import ProfileForm from "./ProfileForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seller Dashboard",
  description:
    "Manage your artisan profile, showcase your story, and connect with customers on Handcrafted Haven.",
};

export default async function Page() {
  const session = await auth();
  const sellerEmail = session?.user?.email;


  if (!sellerEmail) {
        throw new Error("Seller email was not found in the session.");
  }
  
  const seller = await fetchSellerByEmail(sellerEmail);

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

        <section className={styles.sellerEditSection}>
          <div className={styles.sellerEditHeader}>
          <h3>Manage your public seller information. These details will appear on
              your public artisan profile.</h3>
          </div>
          <ProfileForm seller={seller} />
        </section>
      </div>
    </main>
  );
}