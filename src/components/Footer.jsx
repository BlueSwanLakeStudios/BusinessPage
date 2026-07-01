function Footer() {
  return (
    <footer style={{ background: "#071525", color: "#d4ecf5", padding: "3rem 6vw", borderTop: "1px solid rgba(95,188,211,0.1)" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div>
          <p style={{ fontWeight: 800, fontSize: "1.1rem", color: "#eaf6fb", marginBottom: "0.5rem" }}>
            Blue Swan Lake Studios
          </p>
          <p style={{ opacity: 0.45, fontSize: "0.88rem", lineHeight: 1.7 }}>
            Creative agency blending design,<br />motion, and storytelling.
          </p>
        </div>
        <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
          <div>
            <p style={{ fontSize: "0.78rem", letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.4, marginBottom: "0.75rem" }}>
              Navigation
            </p>
            {["Home", "About", "Services", "Contact"].map(link => (
              <p key={link} style={{ marginBottom: "0.4rem" }}>
                <a href={`#${link.toLowerCase()}`} style={{ color: "#7ecfea", opacity: 0.7, textDecoration: "none", fontSize: "0.9rem" }}>
                  {link}
                </a>
              </p>
            ))}
          </div>
          <div>
            <p style={{ fontSize: "0.78rem", letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.4, marginBottom: "0.75rem" }}>
              Contact
            </p>
            <p style={{ opacity: 0.55, fontSize: "0.9rem", marginBottom: "0.4rem" }}>hello@blueswanlake.studio</p>
            <p style={{ opacity: 0.55, fontSize: "0.9rem" }}>+91 00000 00000</p>
          </div>
        </div>
      </div>
      <p style={{ opacity: 0.3, fontSize: "0.82rem", borderTop: "1px solid rgba(95,188,211,0.08)", paddingTop: "1.5rem" }}>
        © {new Date().getFullYear()} Blue Swan Lake Studios. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;