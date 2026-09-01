const principles = [
  ["Calm on the surface", "You get one point of contact, one weekly build, one changelog. No account-manager telephone game, no status decks about status."],
  ["Relentless underneath", "Typed codebases, tests on the money paths, crash budgets, and a stabilisation window baked into every quote — not sold as an extra."],
  ["We say no", "If your idea needs a bigger team, a different stack, or six more months than you have, we will tell you on the first call."],
];

const team = [
  ["Studio lead", "Discovery, scope, your one contact"],
  ["Product designer", "Flows, prototypes, motion"],
  ["Mobile engineers ×2", "Swift, Kotlin, React Native"],
  ["Platform + QA", "Backends, releases, monitoring"],
];

const timeline = [
  ["2019", "Two of us start taking on app builds nights and weekends. First Play Store release in November."],
  ["2021", "Studio goes full time. Weekly-build rule introduced after one project drifts three months."],
  ["2023", "Internal-tools practice added — the spreadsheets clients kept apologising for became half our work."],
  ["Today", "Fourteen apps shipped, six people, three or four products in the water at a time. Two slots open for November."],
];

export default function AboutPage() {
  return (
    <>
      <section style={{ position: "relative", background: "linear-gradient(180deg,#0d2740,#0a1c30)", padding: "8rem 6vw 4rem", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -40, right: -60, width: 600, height: 460, background: "rgba(95,188,211,0.1)", clipPath: "polygon(24% 0, 100% 16%, 84% 100%, 0 62%)", animation: "bs-facet 13s ease-in-out infinite" }} />
        <div className="wrap" style={{ position: "relative" }}>
          <p className="eyebrow">The studio</p>
          <h1 className="h1" style={{ maxWidth: "52rem" }}>A small studio that would rather ship than pitch.</h1>
          <p className="lede" style={{ maxWidth: "40rem" }}>
            Blue Swan Lake Studios is six people who have shipped fourteen apps together. We take on three or four
            products at a time, which is the only honest way to promise a build in your hand every Friday.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: "var(--water)" }}>
        <div className="wrap grid g3">
          {principles.map(([title, copy], i) => (
            <div key={title} className="rule" style={i === 2 ? { borderTopColor: "rgba(240,160,180,0.4)" } : undefined}>
              <h3 className="h3">{title}</h3>
              <p className="body">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" style={{ background: "var(--water-3)" }}>
        <div className="wrap">
          <p className="eyebrow">Who you work with</p>
          <h2 className="h2" style={{ marginBottom: "2.2rem" }}>Six people, no bench</h2>
          <div className="grid g4">
            {team.map(([role, what]) => (
              <div key={role}>
                <div className="ph" style={{ aspectRatio: "1 / 1", borderRadius: "50%" }}>portrait</div>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "var(--mist-bright)", margin: "0.85rem 0 0.2rem" }}>{role}</p>
                <p style={{ fontSize: "0.79rem", opacity: 0.5, margin: 0 }}>{what}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--water)" }}>
        <div className="wrap">
          <h2 className="h2" style={{ marginBottom: "2.2rem" }}>How we got here</h2>
          {timeline.map(([year, copy], i) => (
            <div key={year} style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "1.6rem", padding: "1.25rem 0", borderTop: "1px solid " + (i === 3 ? "rgba(240,160,180,0.4)" : "rgba(95,188,211,0.16)") }}>
              <p className="mono" style={{ color: i === 3 ? "var(--lotus)" : "var(--crest)", margin: 0 }}>{year}</p>
              <p className="body" style={{ fontSize: "0.94rem" }}>{copy}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
