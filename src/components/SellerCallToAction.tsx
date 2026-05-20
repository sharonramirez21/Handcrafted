import Link from "next/link";

export default function SellerCallToAction() {
  return (
    <section className="seller-cta-section">
      <div className="cta-box">
        <h2>Are you an artisan?</h2>

        <p>
          Sign in to manage your seller profile, list handcrafted products, and
          share your work with customers who value handmade products.
        </p>

        <Link href="/login" className="text-link">
          Seller Login
        </Link>
      </div>
    </section>
  );
}
