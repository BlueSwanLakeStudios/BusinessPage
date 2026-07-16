import SwanAnimation from "./SwanAnimation";

function HeroSection() {
  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg,#0a1c30,#123048)",
        display: "flex",
        alignItems: "center",
        padding: "7rem 6vw 4rem",
        gap: "4rem",
        flexWrap: "wrap",
      }}
    >
      <div style={{ flex: "1 1 420px", color: "var(--mist)" }}>
        <p className="eyebrow" style={{ marginBottom: "1.4rem" }}>
          App Development Studio
        </p>

        <h1
          style={{
            fontSize: "clamp(2.4rem, 4.4vw, 4rem)",
            fontWeight: 600,
            lineHeight: 1.08,
            marginBottom: "1.5rem",
            color: "var(--mist-bright)",
            letterSpacing: "-0.01em",
          }}
        >
          Calm on the surface.{" "}
          <em style={{ color: "var(--crest)", fontStyle: "italic" }}>
            Relentless
          </em>{" "}
          underneath.
        </h1>

        <p
          style={{
            fontSize: "1.05rem",
            lineHeight: 1.8,
            opacity: 0.72,
            maxWidth: 460,
            marginBottom: "0.9rem",
          }}
        >
          Blue Swan Lake Studios designs and builds mobile apps, web
          platforms, and internal tools — interfaces that feel effortless,
          backed by engineering that holds up under pressure.
        </p>

        <p
          style={{
            fontSize: "0.95rem",
            opacity: 0.45,
            marginBottom: "2.5rem",
            fontStyle: "italic",
            fontFamily: "var(--font-display)",
          }}
        >
          Like the swan: all the hard work happens below the waterline.
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a href="#services" className="btn btn-primary">
            See what we build
          </a>
          <a href="#contact" className="btn btn-ghost">
            Start a project
          </a>
        </div>
      </div>

      <div
        style={{
          flex: "1 1 380px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SwanAnimation inline />
      </div>
    </section>
  );
}

export default HeroSection;