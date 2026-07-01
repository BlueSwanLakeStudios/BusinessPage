import SwanAnimation from "./SwanAnimation";

function HeroSection() {
  return (
    <section
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg,#0a1c30,#123048)",
        display: "flex",
        alignItems: "center",
        padding: "6rem 6vw 4rem",
        gap: "4rem",
        flexWrap: "wrap",
      }}
    >
      <div style={{ flex: "1 1 380px", color: "#d4ecf5" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", opacity: 0.55, marginBottom: "1.4rem", color: "#7ecfea" }}>
          Creative Agency
        </p>
        <h1 style={{ fontSize: "clamp(2.2rem, 4vw, 3.6rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: "1.4rem", color: "#eaf6fb" }}>
          We Craft <span style={{ color: "#5fbcd3" }}>Stories</span> That Move the World
        </h1>
        <p style={{ fontSize: "1rem", lineHeight: 1.8, opacity: 0.7, maxWidth: 400, marginBottom: "0.75rem" }}>
          Blue Swan Lake Studios is a creative agency blending design, motion, and storytelling to build brands that leave a lasting impression.
        </p>
        <p style={{ fontSize: "0.95rem", opacity: 0.45, marginBottom: "2.5rem", fontStyle: "italic" }}>
          Think Blue Swan Lake Studios.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a href="#services" style={{ background: "#5fbcd3", color: "#071525", padding: "0.85rem 2rem", borderRadius: 8, fontWeight: 700, fontSize: "0.9rem", textDecoration: "none" }}>
            Our Work
          </a>
          <a href="#contact" style={{ border: "1.5px solid rgba(95,188,211,0.4)", color: "#7ecfea", padding: "0.85rem 2rem", borderRadius: 8, fontWeight: 600, fontSize: "0.9rem", textDecoration: "none" }}>
            Contact Us
          </a>
        </div>
      </div>

      <div style={{ flex: "1 1 380px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <SwanAnimation inline />
      </div>
    </section>
  );
}

export default HeroSection;