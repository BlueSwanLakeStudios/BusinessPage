const services = [
  ["01", "Mobile Apps", "Native-quality iOS and Android, from first prototype to store release — built to feel fast and stay stable at scale.", ["Swift · Kotlin · React Native", "TestFlight & Play internal tracks", "Store listing, screenshots, review handling"]],
  ["02", "Web Platforms", "SaaS products, dashboards and customer portals with modern stacks — responsive, accessible and quick under real load.", ["React · Node · Postgres", "Auth, roles, billing wired in", "Lighthouse + a11y pass before launch"]],
  ["03", "Internal Tools", "Admin panels, operations dashboards and automations that replace spreadsheet chaos and give your team hours back.", ["Ops workflow mapping", "Role-based admin panels", "Automations + audit trails"]],
  ["04", "APIs & Integrations", "Solid backends and clean integrations — payments, auth, CRMs and third-party services wired together without the duct tape.", ["Stripe · Razorpay · Twilio", "Webhook + retry hygiene", "Documented, versioned endpoints"]],
  ["05", "Product Design", "UX research, interface design and motion — the polish above the waterline that makes complex software feel simple.", ["Clickable prototypes first", "Design system + icon set", "Motion specs engineers can build"]],
  ["06", "Launch & Beyond", "Release management, monitoring and ongoing iteration — we stay in the water with you after shipping day.", ["Crash + performance budgets", "4-week stabilisation window", "Monthly iteration option"]],
];

export default function ServicesPage({ go }) {
  return (
    <>
      <section style={{ background: "linear-gradient(180deg,#0d2740,#0a1c30)", padding: "8rem 6vw 3.6rem" }}>
        <div className="wrap">
          <p className="eyebrow">What we build</p>
          <h1 className="h1" style={{ maxWidth: "50rem" }}>Six things we do, and what you actually get.</h1>
          <p className="lede">Every engagement includes design, engineering and release work. These are the shapes it usually takes.</p>
        </div>
      </section>

      <section style={{ background: "var(--water)", padding: "3.6rem 6vw 4.6rem" }}>
        <div className="wrap">
          {services.map(([n, title, copy, includes], i) => (
            <div key={n} className="split" style={{ display: "grid", gridTemplateColumns: "70px 1.1fr 1fr", gap: "1.9rem", padding: "1.9rem 0", borderTop: "1px solid rgba(95,188,211,0.16)", borderBottom: i === 5 ? "1px solid rgba(240,160,180,0.4)" : "none" }}>
              <p className="mono" style={{ color: i === 5 ? "var(--lotus)" : "var(--crest)", margin: 0 }}>{n}</p>
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "var(--mist-bright)", margin: "0 0 0.6rem" }}>{title}</h3>
                <p className="body" style={{ fontSize: "0.94rem" }}>{copy}</p>
              </div>
              <div style={{ display: "grid", gap: "0.5rem", fontSize: "0.85rem", color: "var(--crest-soft)", opacity: 0.8 }}>
                {includes.map((x) => (<p key={x} style={{ margin: 0 }}>{x}</p>))}
              </div>
            </div>
          ))}
          <div style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap", marginTop: "2rem" }}>
            <button type="button" className="btn btn-primary" onClick={() => go("pricing")}>See what it costs</button>
            <button type="button" className="btn btn-ghost" onClick={() => go("booking")}>Book a call</button>
          </div>
        </div>
      </section>
    </>
  );
}
