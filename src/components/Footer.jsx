import logo from "../assets/logo.png";

const groups = [
  { title: "Pages", items: [["Work", "work"], ["Services", "services"], ["Pricing", "pricing"], ["Journal", "journal"]] },
  { title: "Studio", items: [["About", "about"], ["Contact", "contact"], ["Book a call", "booking"]] },
];

export default function Footer({ go }) {
  return (
    <footer style={{ background: "var(--ink)", padding: "3.2rem 6vw", borderTop: "1px solid rgba(95,188,211,0.12)" }}>
      <div className="wrap">
        <div style={{ display: "flex", justifyContent: "space-between", gap: "2.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
          <div style={{ maxWidth: 300 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "0.85rem" }}>
              <img src={logo} alt="" style={{ width: 34, height: 34, borderRadius: "50%", display: "block" }} />
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.05rem", color: "var(--mist-bright)", margin: 0 }}>
                Blue Swan Lake Studios
              </p>
            </div>
            <p style={{ fontSize: "0.84rem", lineHeight: 1.75, opacity: 0.45, margin: 0 }}>
              App development studio — mobile, web, and the tools in between.
            </p>
          </div>

          <div style={{ display: "flex", gap: "3.5rem", flexWrap: "wrap" }}>
            {groups.map((g) => (
              <div key={g.title}>
                <p className="mono" style={{ opacity: 0.4, margin: "0 0 0.85rem" }}>{g.title}</p>
                <div style={{ display: "grid", gap: "0.55rem" }}>
                  {g.items.map(([label, key]) => (
                    <button key={key} type="button" className="footer-link" onClick={() => go(key)}>{label}</button>
                  ))}
                </div>
              </div>
            ))}
            <div>
              <p className="mono" style={{ opacity: 0.4, margin: "0 0 0.85rem" }}>Contact</p>
              <div style={{ display: "grid", gap: "0.55rem", fontSize: "0.85rem", opacity: 0.55 }}>
                <a className="footer-link" href="mailto:support@blueswanlakestudios.com">support@blueswanlakestudios.com</a>
                <span>+91 00000 00000</span>
              </div>
            </div>
          </div>
        </div>

        <p style={{ fontSize: "0.78rem", opacity: 0.3, borderTop: "1px solid rgba(95,188,211,0.08)", paddingTop: "1.25rem", margin: 0 }}>
          © {new Date().getFullYear()} Blue Swan Lake Studios. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
