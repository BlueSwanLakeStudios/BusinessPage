const testimonials = [
  {
    quote: "Blue Swan Lake Studios transformed our brand. The attention to detail and creative vision they brought was beyond anything we expected.",
    name: "Priya Sharma",
    role: "CEO, Lumina Co.",
  },
  {
    quote: "The animation work they delivered for our product launch was stunning. Our engagement metrics doubled overnight.",
    name: "Arjun Mehta",
    role: "Marketing Director, NovaTech",
  },
  {
    quote: "Working with Blue Swan felt collaborative and inspired from day one. They don't just execute briefs — they elevate them.",
    name: "Sofia Russo",
    role: "Founder, Drift Studio",
  },
];

function Testimonials() {
  return (
    <section style={{ background: "#0a1c30", padding: "6rem 6vw", color: "#d4ecf5" }}>
      <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#5fbcd3", opacity: 0.8, marginBottom: "0.75rem" }}>
        Kind Words
      </p>
      <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, marginBottom: "3rem", color: "#eaf6fb" }}>
        What Clients Say
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
        {testimonials.map((t) => (
          <div key={t.name} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(95,188,211,0.12)", borderRadius: 12, padding: "2rem" }}>
            <p style={{ fontSize: "1rem", lineHeight: 1.75, opacity: 0.75, marginBottom: "1.5rem", fontStyle: "italic" }}>
              "{t.quote}"
            </p>
            <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "#eaf6fb" }}>{t.name}</p>
            <p style={{ fontSize: "0.85rem", opacity: 0.5, marginTop: 2 }}>{t.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;