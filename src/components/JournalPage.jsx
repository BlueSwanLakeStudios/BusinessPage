const posts = [
  ["Jul 2026 · Design", "Motion that survives code review", "How we spec animation so engineers can build it without guessing at easing curves.", "5 min"],
  ["Jun 2026 · Process", "We published our prices. Here's what happened", "Fewer calls, better calls. A breakdown of six months of inbound before and after.", "6 min"],
  ["May 2026 · Engineering", "Offline sync without the 3am pages", "The conflict-resolution rules we now apply to every consumer app we build.", "9 min"],
  ["Apr 2026 · Studio", "Why we cap at four projects", "The maths behind saying no, and what happens to quality when we don't.", "4 min"],
  ["Mar 2026 · Teardown", "Five onboarding flows, ranked honestly", "What the best consumer apps do in their first sixty seconds — and what we stole.", "8 min"],
];

export default function JournalPage() {
  return (
    <>
      <section style={{ background: "linear-gradient(180deg,#0d2740,#0a1c30)", padding: "8rem 6vw 3.6rem" }}>
        <div className="wrap">
          <p className="eyebrow">Journal</p>
          <h1 className="h1" style={{ maxWidth: "46rem" }}>Notes from below the waterline.</h1>
          <p className="lede">What we learned shipping, what we got wrong, and the occasional teardown. Roughly monthly.</p>
        </div>
      </section>

      <section style={{ background: "var(--water)", padding: "3.4rem 6vw 4.6rem" }}>
        <div className="wrap">
          <article className="card split" style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: "2rem", alignItems: "center", padding: "1.9rem", marginBottom: "2.6rem" }}>
            <div className="ph" style={{ aspectRatio: "16 / 10", borderRadius: 10 }}>article image</div>
            <div>
              <p className="eyebrow lotus">Aug 2026 · Engineering</p>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", color: "var(--mist-bright)", margin: "0 0 0.7rem" }}>
                The Friday build rule, three years on
              </h2>
              <p className="body" style={{ fontSize: "0.92rem", marginBottom: "1rem" }}>
                We promised every client a real build every Friday. It has cost us two projects, saved us five, and
                changed how we scope everything.
              </p>
              <a className="mono" href="#/journal" style={{ color: "var(--crest-soft)" }}>Read · 7 min →</a>
            </div>
          </article>

          {posts.map(([meta, title, copy, mins], i) => (
            <a key={title} href="#/journal" className="split" style={{ display: "grid", gridTemplateColumns: "150px 1fr 90px", gap: "1.6rem", alignItems: "baseline", padding: "1.35rem 0", borderTop: "1px solid rgba(95,188,211,0.16)", borderBottom: i === 4 ? "1px solid rgba(240,160,180,0.4)" : "none", textDecoration: "none" }}>
              <p className="mono" style={{ color: i === 4 ? "var(--lotus)" : "var(--crest)", margin: 0, letterSpacing: "0.1em" }}>{meta}</p>
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", color: "var(--mist-bright)", margin: "0 0 0.35rem" }}>{title}</h3>
                <p className="body" style={{ fontSize: "0.86rem", opacity: 0.55 }}>{copy}</p>
              </div>
              <p className="mono" style={{ opacity: 0.45, margin: 0, textAlign: "right" }}>{mins}</p>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
