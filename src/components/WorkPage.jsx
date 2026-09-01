const filters = ["All", "iOS", "Android", "Web platform", "Internal tools"];

const projects = [
  ["NovaTech Ops", "Internal tooling · −47% cycle time", "ops dashboard", "NovaTech · Web", -1],
  ["Drift Studio", "Android app · 4.7★ launch week", "android screens", "Drift · Play Store", 0.9],
  ["Harbour Logistics", "Customer portal · 9 weeks", "portal screens", "Harbour · Web", -0.6],
  ["Kettle", "Cross-platform app · 60k installs", "app screens", "Kettle · iOS + Android", 1.1],
  ["Meridian Admin", "Ops dashboard · 40 hrs/mo saved", "dashboard", "Meridian · Internal", -1.3],
  ["In the water now", "Fintech platform · NDA until Q4", "case study", "coming soon", 0.7],
];

export default function WorkPage() {
  return (
    <>
      <section style={{ position: "relative", background: "linear-gradient(180deg,#0d2740,#0a1c30)", padding: "8rem 6vw 3.6rem", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -30, left: -80, width: 620, height: 480, background: "rgba(240,160,180,0.08)", clipPath: "polygon(0 0, 100% 20%, 60% 100%, 0 74%)", animation: "bs-facet 15s ease-in-out infinite" }} />
        <div className="wrap" style={{ position: "relative" }}>
          <p className="eyebrow">Work · 14 projects</p>
          <h1 className="h1" style={{ maxWidth: "44rem" }}>Things people use every day.</h1>
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
            {filters.map((f, i) => (
              <button key={f} type="button" className="mono" style={{ padding: "0.55rem 1rem", borderRadius: 999, cursor: "pointer", fontFamily: "var(--font-mono)", background: i === 0 ? "var(--mist-bright)" : "none", color: i === 0 ? "var(--water)" : "var(--crest-soft)", border: i === 0 ? "1px solid var(--mist-bright)" : "1px solid rgba(95,188,211,0.3)" }}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--water)", padding: "3.4rem 6vw 4.6rem" }}>
        <div className="wrap">
          <article className="card split" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "1.9rem", alignItems: "center", padding: "1.9rem", marginBottom: "2rem" }}>
            <div className="ph" style={{ aspectRatio: "16 / 9", borderRadius: 10 }}>hero case-study image · Lumina iOS</div>
            <div>
              <p className="eyebrow lotus">Featured case study</p>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", color: "var(--mist-bright)", margin: "0 0 0.7rem" }}>
                Lumina Co. — Figma file to App Store in 11 weeks
              </h2>
              <p className="body" style={{ fontSize: "0.92rem", marginBottom: "1.1rem" }}>
                A consumer habit app with offline sync and a paywall. Eleven weekly builds, zero scope surprises, 4.8★ at launch.
              </p>
              <div style={{ display: "flex", gap: "1.6rem", flexWrap: "wrap" }}>
                {[["11 wks", "to release"], ["4.8★", "launch rating"], ["0.1%", "crash rate"]].map(([big, small]) => (
                  <div key={small}>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--mist-bright)", margin: 0 }}>{big}</p>
                    <p className="mono" style={{ opacity: 0.45, margin: "0.25rem 0 0" }}>{small}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <div className="grid g3">
            {projects.map(([name, meta, l1, l2, rot], i) => (
              <div className="tile" key={name} style={{ transform: "rotate(" + rot + "deg)" }}>
                <div className="ph" style={{ aspectRatio: "3 / 4", ...(i === 5 ? { background: "repeating-linear-gradient(135deg,#1a1b2e 0 10px,#232445 10px 20px)", borderColor: "rgba(240,160,180,0.22)", color: "var(--lotus)" } : null) }}>
                  {l1}<br />{l2}
                </div>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--mist-bright)", margin: "0.85rem 0 0.25rem" }}>{name}</p>
                <p style={{ fontSize: "0.82rem", opacity: 0.5, margin: 0 }}>{meta}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
