import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

const links = [
  { label: "Work", key: "work" },
  { label: "What we build", key: "services" },
  { label: "Studio", key: "about" },
  { label: "Pricing", key: "pricing" },
  { label: "Journal", key: "journal" },
];

export default function Navbar({ go }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const visit = (key) => { setOpen(false); go(key); };

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: "rgba(7, 21, 37, 0.78)",
        backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(95,188,211,0.12)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.9rem 6vw", gap: "1rem" }}>
        <button type="button" onClick={() => visit("home")} style={{ display: "flex", alignItems: "center", gap: "0.7rem", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <img src={logo} alt="Blue Swan Lake Studios logo" style={{ width: 38, height: 38, borderRadius: "50%", display: "block" }} />
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1rem", color: "var(--mist-bright)" }}>
            Blue Swan Lake Studios
          </span>
          <span className="pill" style={{ marginLeft: "0.5rem" }}><i />2 slots open · Nov</span>
        </button>

        <ul className="nav-desktop" style={{ display: "flex", gap: "1.6rem", listStyle: "none", margin: 0, padding: 0, alignItems: "center" }}>
          {links.map((link) => (
            <li key={link.key}>
              <button type="button" className="nav-link" onClick={() => visit(link.key)}>{link.label}</button>
            </li>
          ))}
          <li>
            <button type="button" className="btn btn-primary" style={{ padding: "0.65rem 1.3rem", fontSize: "0.82rem" }} onClick={() => visit("booking")}>
              Book a call
            </button>
          </li>
        </ul>

        <button
          type="button" className="nav-hamburger"
          aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--mist-bright)" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? (
              <>
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </>
            ) : (
              <>
                <line x1="4" y1="6.5" x2="20" y2="6.5" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17.5" x2="20" y2="17.5" />
              </>
            )}
          </svg>
        </button>
      </div>

      <div id="mobile-menu" className={open ? "nav-mobile is-open" : "nav-mobile"}>
        <ul style={{ listStyle: "none", margin: 0, padding: "0.5rem 6vw 1.5rem", display: "grid", gap: "1.1rem" }}>
          {links.map((link) => (
            <li key={link.key}>
              <button type="button" className="nav-link" style={{ fontSize: "1.05rem" }} onClick={() => visit(link.key)}>{link.label}</button>
            </li>
          ))}
          <li>
            <button type="button" className="btn btn-primary" onClick={() => visit("booking")}>Book a call</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
