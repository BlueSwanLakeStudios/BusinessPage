const tiers = [
  {
    name: "Sprint", price: "from ₹2.4L", meta: "2 weeks · prototype in hand",
    items: ["Discovery + scoped plan", "Clickable prototype", "Technical feasibility review", "Fixed quote for the build"],
    cta: "Start with a sprint", to: "booking", featured: false, lotus: false,
  },
  {
    name: "Ship it", price: "from ₹12L", meta: "8–12 weeks · store release",
    items: ["Design + iOS & Android build", "Weekly TestFlight / Play builds", "Backend, auth, payments", "Store submission handled", "4-week stabilisation included"],
    cta: "Book a call", to: "booking", featured: true, lotus: false,
  },
  {
    name: "Glide", price: "₹1.8L / mo", meta: "Retained · rolling monthly",
    items: ["Ongoing iteration + releases", "Monitoring & on-call", "Quarterly roadmap session", "Cancel with 30 days notice"],
    cta: "Ask about retainers", to: "contact", featured: false, lotus: true,
  },
];

const always = [
  "Weekly build on your device, every Friday",
  "One point of contact, not an account team",
  "Source code and design files are yours",
  "Open changelog you can read any time",
];

const faqs = [
  ["What if scope changes?", "New scope gets its own small quote before we build it. The original number never moves quietly."],
  ["Do you do equity or rev-share?", "Occasionally, alongside a reduced fee, for products in categories we already know well."],
  ["Who owns the code?", "You do, from the first commit. Repos live in your organisation, not ours."],
  ["How fast can you start?", "Two slots are open for November. A discovery sprint can usually begin within two weeks."],
];

export default function PricingPage({ go }) {
  return (
    <>
      <section style={{ background: "linear-gradient(180deg,#0d2740,#0a1c30)", padding: "8rem 6vw 3.6rem" }}>
        <div className="wrap">
          <p className="eyebrow">Pricing</p>
          <h1 className="h1" style={{ maxWidth: "44rem" }}>Published prices, fixed after discovery.</h1>
          <p className="lede">
            Most studios make you book a call to hear a number. Here it is. The discovery sprint turns the “from” into a
            fixed quote.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--water)", padding: "3.4rem 6vw 2rem" }}>
        <div className="wrap grid g3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className="card"
              style={{
                padding: "2rem",
                borderRadius: 16,
                background: t.featured ? "rgba(95,188,211,0.09)" : t.lotus ? "rgba(240,160,180,0.06)" : undefined,
                border: t.featured ? "1.5px solid var(--crest)" : t.lotus ? "1px solid rgba(240,160,180,0.22)" : undefined,
              }}
            >
              {t.featured && (
                <span className="mono" style={{ position: "absolute", top: -11, left: "2rem", background: "var(--crest)", color: "var(--water)", padding: "4px 10px", borderRadius: 999, fontSize: 10 }}>
                  most chosen
                </span>
              )}
              <p className="mono" style={{ color: t.lotus ? "var(--lotus)" : "var(--crest-soft)", margin: "0 0 1.1rem" }}>{t.name}</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", color: "var(--mist-bright)", margin: "0 0 0.35rem" }}>{t.price}</p>
              <p style={{ fontSize: "0.84rem", opacity: 0.5, margin: "0 0 1.5rem" }}>{t.meta}</p>
              <div style={{ display: "grid", gap: "0.6rem", fontSize: "0.9rem", lineHeight: 1.6, opacity: 0.72, marginBottom: "1.6rem" }}>
                {t.items.map((x) => (<p key={x} style={{ margin: 0 }}>{x}</p>))}
              </div>
              <button
                type="button"
                className={t.featured ? "btn btn-primary" : t.lotus ? "btn btn-lotus" : "btn btn-ghost"}
                style={{ width: "100%" }}
                onClick={() => go(t.to)}
              >
                {t.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "var(--water)", padding: "2rem 6vw 4.6rem" }}>
        <div className="wrap">
          <p className="eyebrow">Always included</p>
          <div className="grid g4" style={{ marginBottom: "3.2rem" }}>
            {always.map((x) => (
              <div key={x} style={{ borderTop: "1px solid rgba(95,188,211,0.24)", paddingTop: "1rem" }}>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.7, opacity: 0.7, margin: 0 }}>{x}</p>
              </div>
            ))}
          </div>

          <h2 className="h2" style={{ marginBottom: "1.6rem" }}>Questions we get asked first</h2>
          <div className="grid g2" style={{ gap: "1.6rem 2.5rem" }}>
            {faqs.map(([q, a]) => (
              <div key={q}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", color: "var(--mist-bright)", margin: "0 0 0.5rem" }}>{q}</h3>
                <p className="body" style={{ fontSize: "0.9rem" }}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
