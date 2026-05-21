import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
    
    return (
        <section className="hero">
            <div className="hero-content">
                <h1>
                    Handmade. Heartfelt. Made for you.
                </h1>

                <p>
                    Discover unique handmade products crafted by talented artisans around the world.
                </p>

                <Link href="/products" className="text-link">
                    Browse Products
                </Link>

            </div>

            <div className="image-placeholder">
                <Image
                src="/hero-desktop.jpg"
                width={593}
                height={310}
                className="hero-image"
                    alt="Handcrafted ceramic vase and wooden bowls on a rustic table"
                    loading="eager"
                    />
            </div>
        </section>
    );
}