const iconProps = {
  width: 30,
  height: 30,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "var(--crest)",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const services = [
  {
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
        <line x1="10.5" y1="18.5" x2="13.5" y2="18.5" />
      </svg>
    ),
    title: "Mobile Apps",
    desc: "Native-quality iOS and Android apps, from first prototype to App Store release — built to feel fast and stay stable at scale.",
  },
  {
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <rect x="2.5" y="4" width="19" height="15" rx="2" />
        <line x1="2.5" y1="8.5" x2="21.5" y2="8.5" />
        <circle cx="5.5" cy="6.25" r="0.4" />
        <circle cx="8" cy="6.25" r="0.4" />
      </svg>
    ),
    title: "Web Platforms",
    desc: "SaaS products, dashboards, and customer portals with modern stacks — responsive, accessible, and quick under real load.",
  },
  {
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <path d="M14.5 6.5l3-3 3 3-3 3z" />
        <path d="M3.5 20.5l7-7" />
        <path d="M13 8l3 3-8.5 8.5a2.12 2.12 0 01-3-3z" />
      </svg>
    ),
    title: "Internal Tools",
    desc: "Admin panels, operations dashboards, and automations that replace the spreadsheet chaos and give your team hours back.",
  },
  {
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <path d="M8 9l-4 3 4 3" />
        <path d="M16 9l4 3-4 3" />
        <line x1="13" y1="5.5" x2="11" y2="18.5" />
      </svg>
    ),
    title: "APIs & Integrations",
    desc: "Solid backends and clean integrations — payments, auth, CRMs, and third-party services wired together without the duct tape.",
  },
  {
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a15 15 0 010 18M3.5 9.5h17M3.5 14.5h17" />
      </svg>
    ),
    title: "Product Design",
    desc: "UX research, interface design, and motion — the polish above the waterline that makes complex software feel simple.",
  },
  {
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <path d="M4.5 16.5L3 21l4.5-1.5" />
        <path d="M12 15l-3-3 7.5-7.5c1.5-1.5 4-1.5 4.5-1 .5.5.5 3-1 4.5z" />
        <path d="M9 12l-3.5 1L3 15.5M12 15l-1 3.5L8.5 21" />
      </svg>
    ),
    title: "Launch & Beyond",
    desc: "Release management, monitoring, and ongoing iteration — we stay in the water with you after shipping day.",
  },
];

function Services() {
  return (
    <section
      id="services"
      style={{ background: "var(--water-2)", padding: "6rem 6vw", color: "var(--mist)" }}
    >
      <p className="eyebrow">What We Build</p>
      <h2
        style={{
          fontSize: "clamp(1.9rem, 3.2vw, 2.8rem)",
          fontWeight: 600,
          marginBottom: "1rem",
          color: "var(--mist-bright)",
        }}
      >
        Apps, platforms, and the tools in between
      </h2>
      <p style={{ opacity: 0.6, maxWidth: 560, lineHeight: 1.7, marginBottom: "3rem" }}>
        One studio for the whole product — strategy, design, engineering, and
        launch — so nothing gets lost between agencies.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {services.map((s) => (
          <div key={s.title} className="card">
            <div style={{ marginBottom: "1.1rem" }}>{s.icon}</div>
            <h3
              style={{
                fontSize: "1.2rem",
                fontWeight: 600,
                marginBottom: "0.6rem",
                color: "var(--mist-bright)",
              }}
            >
              {s.title}
            </h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.7, opacity: 0.65, margin: 0 }}>
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;