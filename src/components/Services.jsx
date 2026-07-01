const services = [
  {
    emoji: "🎨",
    title: "Brand Identity",
    desc: "We craft visual identities that are unmistakably yours — from logos and palettes to the full brand system.",
  },
  {
    emoji: "🎬",
    title: "Motion & Animation",
    desc: "From micro-interactions to full explainer videos, we bring your brand to life with purposeful motion.",
  },
  {
    emoji: "🌐",
    title: "Web & Digital",
    desc: "Beautiful, fast, and accessible digital experiences built with modern tech and a designer's eye.",
  },
];

function Services() {
  return (
    <section id="services" style={{ background: "#0d2035", padding: "6rem 6vw", color: "#d4ecf5" }}>
      <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#5fbcd3", opacity: 0.8, marginBottom: "0.75rem" }}>
        What We Do
      </p>
      <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, marginBottom: "3rem", color: "#eaf6fb" }}>
        Our Services
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
        {services.map((s) => (
          <div key={s.title} style={{ background: "rgba(95,188,211,0.06)", border: "1px solid rgba(95,188,211,0.15)", borderRadius: 12, padding: "2rem" }}>
            <div style={{ fontSize: "2.2rem", marginBottom: "1rem" }}>{s.emoji}</div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.6rem", color: "#eaf6fb" }}>{s.title}</h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.7, opacity: 0.65 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;