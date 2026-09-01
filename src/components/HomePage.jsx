import SwanAnimation from "./SwanAnimation";

const services = [
  ["01", "Mobile Apps", "Native-quality iOS and Android, from first prototype to store release — fast to use, stable at scale."],
  ["02", "Web Platforms", "SaaS products, dashboards and customer portals — responsive, accessible, quick under real load."],
  ["03", "Internal Tools", "Admin panels, ops dashboards and automations that end the spreadsheet chaos."],
];

const stats = [
  ["11", " wks", "Figma file to App Store, median across our last six launches."],
  ["weekly", "", "A build on your device every Friday. Progress you can tap."],
  ["99.9", "%", "Uptime on the platforms we host and monitor for clients."],
  ["fixed", "", "Scoped quote after discovery. No vague estimates, no drift."],
];

const work = [
  ["Lumina Co.", "Consumer iOS app · 11 weeks", "app screens", "Lumina · iOS", -1],
  ["NovaTech Ops", "Internal tooling · −47% cycle time", "ops dashboard", "NovaTech · Web", 0.8],
  ["Drift Studio", "Android app · 4.7★ launch week", "android screens", "Drift · Play Store", -0.5],
];

const stack = ["Swift", "Kotlin", "React Native", "Expo", "Node", "Postgres", "Stripe", "Supabase", "Figma"];

const log = [
  ["14:02", "lumina-ios · build 214 → TestFlight", 0],
  ["11:47", "novatech-ops · order flow −310ms p95", 0.9],
  ["09:20", "drift-android · Play review passed", 1.8],
  ["08:05", "design · lotus icon set v3 shipped", 2.7],
];

export default function HomePage({ go }) {
  return (
    <>
      {/* hero — above the waterline */}
      <section style={{ position: "relative", background: "linear-gradient(180deg,#0d2740 0%,#123048 46%)", padding: "7.5rem 6vw 0", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 78% 24%, rgba(95,188,211,0.22), transparent 46%)", pointerEvents: "none" }} />
        <div className="wrap" style={{ position: "relative", display: "flex", gap: "3.2rem", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 460px" }}>
            <p className="eyebrow">App development studio · iOS &amp; Android</p>
            <h1 className="h1">Calm on the surface.<br /><em>Relentless</em> underneath.</h1>
            <p className="lede">
              We design and ship mobile apps, web platforms and internal tools — interfaces that feel effortless,
              engineering that holds under load.
            </p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "0.98rem", color: "var(--crest-soft)", opacity: 0.6, margin: "0 0 1.9rem" }}>
              Like the swan: all the hard work happens below the waterline.
            </p>
            <div style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap" }}>
              <button type="button" className="btn btn-primary" onClick={() => go("work")}>See the work</button>
              <button type="button" className="btn btn-ghost" onClick={() => go("booking")}>Book a 20-min call</button>
            </div>
          </div>
          <div style={{ flex: "1 1 380px", display: "flex", justifyContent: "center", animation: "bs-bob 7s ease-in-out infinite" }}>
            <SwanAnimation inline />
          </div>
        </div>

        {/* the waterline */}
        <div style={{ position: "relative", height: 74, marginTop: "1.6rem" }}>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 74, overflow: "hidden" }}>
            <div style={{ width: "200%", height: "100%", animation: "bs-wave 14s linear infinite", background: "repeating-linear-gradient(90deg, transparent 0 60px, rgba(95,188,211,0.1) 60px 120px)", opacity: 0.5 }} />
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 20, height: 2, background: "linear-gradient(90deg, transparent, rgba(126,207,234,0.85), rgba(212,236,245,0.55), rgba(126,207,234,0.85), transparent)" }} />
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 20, background: "linear-gradient(180deg, rgba(126,207,234,0.18), transparent)" }} />
        </div>
      </section>

      {/* below the waterline */}
      <section style={{ position: "relative", background: "linear-gradient(180deg,#0a1c30,#071525)", padding: "3.4rem 6vw 4.6rem", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 220, background: "linear-gradient(180deg, rgba(126,207,234,0.16), transparent)", animation: "bs-caustic 11s ease-in-out infinite", pointerEvents: "none" }} />
        {[["18%", 9, "0s", "9s"], ["47%", 6, "2s", "12s"], ["73%", 11, "4s", "10.5s"]].map(([left, size, delay, dur]) => (
          <div key={left} style={{ position: "absolute", left, bottom: 0, width: size, height: size, borderRadius: "50%", background: "rgba(212,236,245,0.42)", animation: "bs-rise " + dur + " linear " + delay + " infinite" }} />
        ))}
        <div className="wrap" style={{ position: "relative" }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--crest-soft)", opacity: 0.75, margin: "0 0 2.4rem" }}>
            Below the waterline — the part clients never see, and always feel.
          </p>
          <div className="grid g4" style={{ animation: "bs-refract 9s ease-in-out infinite" }}>
            {stats.map(([big, unit, copy]) => (
              <div className="rule" key={copy}>
                <p className="stat">{big}<span>{unit}</span></p>
                <p className="body" style={{ fontSize: "0.86rem" }}>{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="marquee">
        <div className="marquee-track">
          {[0, 1].map((i) => (
            <div key={i}>
              {stack.map((s) => (<span key={s}>{s} ·</span>))}
            </div>
          ))}
        </div>
      </div>

      {/* services */}
      <section className="section" style={{ background: "var(--water-3)" }}>
        <div className="wrap">
          <p className="eyebrow">What we build</p>
          <h2 className="h2">Apps, platforms, and the tools in between</h2>
          <p className="lede" style={{ marginBottom: "2.4rem" }}>
            One studio for the whole product — strategy, design, engineering, launch — so nothing gets lost between agencies.
          </p>
          <div className="grid g3">
            {services.map(([n, title, copy]) => (
              <article className="card" key={n}>
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 20% 108%, rgba(126,207,234,0.15), transparent 62%)", animation: "bs-caustic " + (8 + Number(n)) + "s ease-in-out infinite" }} />
                <p className="mono" style={{ position: "relative", color: "var(--crest)", margin: "0 0 2.4rem" }}>{n}</p>
                <h3 className="h3" style={{ position: "relative" }}>{title}</h3>
                <p className="body" style={{ position: "relative" }}>{copy}</p>
              </article>
            ))}
          </div>
          <div style={{ display: "flex", gap: "1.1rem", alignItems: "center", flexWrap: "wrap", marginTop: "1.5rem" }}>
            <p style={{ fontSize: "0.88rem", color: "var(--crest-soft)", opacity: 0.8, margin: 0 }}>
              + APIs &amp; integrations · Product design · Launch &amp; beyond
            </p>
            <button type="button" className="footer-link mono" style={{ color: "var(--lotus)" }} onClick={() => go("services")}>All services →</button>
          </div>
        </div>
      </section>

      {/* selected work */}
      <section className="section" style={{ background: "var(--water-2)" }}>
        <div className="wrap">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "1.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
            <div>
              <p className="eyebrow">Selected work</p>
              <h2 className="h2" style={{ margin: 0 }}>Shipped, and still shipping</h2>
            </div>
            <button type="button" className="footer-link mono" style={{ color: "var(--lotus)" }} onClick={() => go("work")}>All 14 projects →</button>
          </div>
          <div className="grid g3">
            {work.map(([name, meta, l1, l2, rot]) => (
              <button type="button" className="tile" key={name} onClick={() => go("work")} style={{ transform: "rotate(" + rot + "deg)", background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left" }}>
                <div className="ph" style={{ aspectRatio: "4 / 3" }}>{l1}<br />{l2}</div>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--mist-bright)", margin: "0.85rem 0 0.25rem" }}>{name}</p>
                <p style={{ fontSize: "0.82rem", color: "var(--mist)", opacity: 0.5, margin: 0 }}>{meta}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* testimonial + ship log */}
      <div className="split" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", background: "var(--water)", borderTop: "1px solid rgba(95,188,211,0.12)" }}>
        <div style={{ padding: "4.4rem 6vw", borderRight: "1px solid rgba(95,188,211,0.12)" }}>
          <p className="eyebrow">Kind words</p>
          <blockquote style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.3rem, 2.1vw, 1.75rem)", lineHeight: 1.5, color: "var(--mist-bright)", margin: "0 0 1.25rem" }}>
            “Rare combination: designers who can ship and engineers with taste. They pushed back on our brief where it
            mattered, and the product is better for it.”
          </blockquote>
          <p style={{ fontSize: "0.88rem", opacity: 0.6, margin: 0 }}>Sofia Russo · Founder, Drift Studio</p>
        </div>
        <div style={{ padding: "2.5rem 6vw", display: "flex", alignItems: "center" }}>
          <div style={{ width: "100%", background: "#050d16", border: "1px solid rgba(95,188,211,0.18)", borderRadius: 10, overflow: "hidden" }}>
            <div className="mono" style={{ display: "flex", justifyContent: "space-between", padding: "0.7rem 0.9rem", borderBottom: "1px solid rgba(95,188,211,0.14)", color: "var(--crest-soft)" }}>
              <span>ship log — this week</span><span style={{ color: "var(--leaf)" }}>live</span>
            </div>
            <div style={{ padding: "0.8rem 0.9rem", display: "grid", gap: "0.55rem", fontFamily: "var(--font-mono)", fontSize: "0.76rem", lineHeight: 1.5 }}>
              {log.map(([time, text, delay]) => (
                <p key={time} style={{ margin: 0, opacity: 0.85, animation: "bs-logline 7s ease-out " + delay + "s infinite" }}>
                  <span style={{ color: "var(--crest)" }}>{time}</span> {text}
                </p>
              ))}
              <p style={{ margin: 0, color: "var(--leaf)" }}>▍<span style={{ animation: "bs-blink 1.2s steps(1,end) infinite" }}>_</span></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
