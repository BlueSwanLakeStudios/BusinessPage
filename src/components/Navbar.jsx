import { useEffect, useState } from "react";
import logo from "../assets/logo.svg";

const links = [
  { label: "Home", href: "#home" },
  { label: "What we build", href: "#services" },
  { label: "How we work", href: "#process" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  // Close the menu with the Escape key
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "rgba(7, 21, 37, 0.72)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(95,188,211,0.12)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 6vw",
        }}
      >
        <a
          href="#home"
          onClick={() => setOpen(false)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.65rem",
            textDecoration: "none",
          }}
        >
          <img src={logo} alt="Blue Swan Lake Studios logo" style={{ width: 36 }} />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "1.05rem",
              color: "var(--mist-bright)",
              letterSpacing: "0.01em",
            }}
          >
            Blue Swan Lake Studios
          </span>
        </a>

        {/* Desktop links — hidden on mobile via CSS */}
        <ul
          className="nav-desktop"
          style={{
            display: "flex",
            gap: "2rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
            alignItems: "center",
          }}
        >
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="nav-link">
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="btn btn-primary"
              style={{ padding: "0.55rem 1.4rem", fontSize: "0.85rem" }}
            >
              Start a project
            </a>
          </li>
        </ul>

        {/* Hamburger — shown only on mobile via CSS */}
        <button
          type="button"
          className="nav-hamburger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--mist-bright)"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
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

      {/* Mobile dropdown panel */}
      <div id="mobile-menu" className={`nav-mobile ${open ? "is-open" : ""}`}>
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: "0.5rem 6vw 1.5rem",
            display: "grid",
            gap: "1.1rem",
          }}
        >
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="nav-link"
                style={{ fontSize: "1.05rem" }}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li style={{ marginTop: "0.25rem" }}>
            <a
              href="#contact"
              className="btn btn-primary"
              style={{ padding: "0.7rem 1.6rem", fontSize: "0.9rem" }}
              onClick={() => setOpen(false)}
            >
              Start a project
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;