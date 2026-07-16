const testimonials = [
  {
    quote:
      "Blue Swan took our app from a rough Figma file to the App Store in eleven weeks. The weekly builds meant zero surprises — we always knew exactly where things stood.",
    name: "Priya Sharma",
    role: "CEO, Lumina Co.",
  },
  {
    quote:
      "They rebuilt our internal ops tools and cut order processing time nearly in half. Our team stopped fighting spreadsheets and started actually using the software.",
    name: "Arjun Mehta",
    role: "Operations Director, NovaTech",
  },
  {
    quote:
      "Rare combination: designers who can ship and engineers with taste. They pushed back on our brief where it mattered, and the product is better for it.",
    name: "Sofia Russo",
    role: "Founder, Drift Studio",
  },
];

function Testimonials() {
  return (
    <section
      style={{ background: "var(--ink)", padding: "6rem 6vw", color: "var(--mist)" }}
    >
      <p className="eyebrow">Kind Words</p>
      <h2
        style={{
          fontSize: "clamp(1.9rem, 3.2vw, 2.8rem)",
          fontWeight: 600,
          marginBottom: "3rem",
          color: "var(--mist-bright)",
        }}
      >
        What clients say
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {testimonials.map((t) => (
          <figure key={t.name} className="card" style={{ margin: 0 }}>
            <blockquote
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "1.05rem",
                lineHeight: 1.75,
                opacity: 0.8,
                margin: "0 0 1.5rem",
              }}
            >
              “{t.quote}”
            </blockquote>
            <figcaption>
              <p
                style={{
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  color: "var(--mist-bright)",
                  margin: 0,
                }}
              >
                {t.name}
              </p>
              <p style={{ fontSize: "0.85rem", opacity: 0.5, margin: "2px 0 0" }}>
                {t.role}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;