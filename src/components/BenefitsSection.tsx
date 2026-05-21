import Image from "next/image";
const benefits = [
  {
    title: "Support Artisans",
    text: "Help local makers thrive",
    img: "support.webp"
  },
  {
    title: "Unique & Authentic",
    text: "One-of-a-kind creations",
    img: "unique.webp"
  },
  {
    title: "Quality You Can Trust",
    text: "Crafted with care",
    img: "quality.webp"
  },
  {
    title: "Worldwide Community",
    text: "Connect globally",
    img: "world.webp"
  },
];

export default function BenefitsSection() {
    
    return (
        <section className="benefits">
            {benefits.map((benefit) => (
                <article key={benefit.title}>
                <div className="benefit-icon">
                  <Image
                    src={`/${benefit.img}`}
                    width={52}
                    height={52}
                    alt="Handcrafted ceramic vase and wooden bowls on a rustic table"
                    loading="eager" />
                  </div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </article>
            ))}
        </section>
    )
}