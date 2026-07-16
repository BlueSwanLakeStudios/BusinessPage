const navLinks = [
  { label: "Home", href: "#home" },
  { label: "What we build", href: "#services" },
  { label: "How we work", href: "#process" },
  { label: "Contact", href: "#contact" },
];

function Footer() {
  return (
    <footer
      style={{
        background: "var(--ink)",
        color: "var(--mist)",
        padding: "3rem 6vw",
        borderTop: "1px solid rgba(95,188,211,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          justifyContent: "space-between",
          marginBottom: "2rem",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "1.15rem",
              color: "var(--mist-bright)",
              margin: "0 0 0.5rem",
            }}
          >
            Blue Swan Lake Studios
          </p>
          <p style={{ opacity: 0.45, fontSize: "0.88rem", lineHeight: 1.7, margin: 0 }}>
            App development studio — mobile, web,
            <br />
            and the tools in between.
          </p>
        </div>

        <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
          <div>
            <p
              style={{
                fontSize: "0.78rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                opacity: 0.4,
                margin: "0 0 0.75rem",
              }}
            >
              Navigation
            </p>
            {navLinks.map((link) => (
              <p key={link.href} style={{ margin: "0 0 0.4rem" }}>
                <a href={link.href} className="footer-link">
                  {link.label}
                </a>
              </p>
            ))}
          </div>

          <div>
            <p
              style={{
                fontSize: "0.78rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                opacity: 0.4,
                margin: "0 0 0.75rem",
              }}
            >
              Contact
            </p>
            <p style={{ opacity: 0.55, fontSize: "0.9rem", margin: "0 0 0.4rem" }}>
              hello@blueswanlake.studio
            </p>
            <p style={{ opacity: 0.55, fontSize: "0.9rem", margin: 0 }}>
              +91 00000 00000
            </p>
          </div>
        </div>
      </div>

      <p
        style={{
          opacity: 0.3,
          fontSize: "0.82rem",
          borderTop: "1px solid rgba(95,188,211,0.08)",
          paddingTop: "1.5rem",
          margin: 0,
        }}
      >
        © {new Date().getFullYear()} Blue Swan Lake Studios. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;