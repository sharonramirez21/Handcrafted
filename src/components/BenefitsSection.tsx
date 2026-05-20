const benefits = [
  {
    title: "Support Artisans",
    text: "Help local makers thrive",
  },
  {
    title: "Unique & Authentic",
    text: "One-of-a-kind creations",
  },
  {
    title: "Quality You Can Trust",
    text: "Crafted with care",
  },
  {
    title: "Worldwide Community",
    text: "Connect globally",
  },
];

export default function BenefitsSection() {
    
    return (
        <section className="benefits">
            {benefits.map((benefit) => (
                <article key={benefit.title}>
                  <div className="benefit-icon"></div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </article>
            ))}
        </section>
    )
}