import { useState } from "react";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx4AqLhH011Svtbe8nLSu_tWtbE-pq2MqUmyEOLsNuPlE2eillBEIU1zIrczqhPs5RU/exec";

const next = [
  ["01", "We reply within 24 hours, with a yes, a no, or a question."],
  ["02", "A 20-minute call to hear the shape of the problem."],
  ["03", "A scoped discovery sprint proposal, with a real number."],
];

export default function ContactPage({ go }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");

    const body = new URLSearchParams({ ...form, website: "" });

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      setForm({ name: "", email: "", subject: "", message: "" });
      setStatus("success");
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setStatus("error");
    }
  };

  return (
    <div className="split" style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", background: "var(--water-2)", paddingTop: "4.5rem" }}>
      <div style={{ padding: "3.5rem 6vw 4.5rem", borderRight: "1px solid rgba(95,188,211,0.12)" }}>
        <p className="eyebrow">Get in touch</p>
        <h1 className="h1" style={{ fontSize: "clamp(2.1rem,3.6vw,3.2rem)" }}>Have an app in mind?</h1>
        <p className="lede" style={{ maxWidth: "30rem", marginBottom: "2.2rem" }}>
          Tell us what you're building — a new product, a platform, or a tool your team needs. We reply within 24 hours
          with honest next steps.
        </p>

        <form onSubmit={handleSubmit} style={{ maxWidth: 540 }}>
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} />

          <div style={{ marginBottom: "1.25rem" }}>
            <label className="field-label" htmlFor="contact-name">Name</label>
            <input id="contact-name" className="field-input" type="text" value={form.name} onChange={set("name")} placeholder="Your name" required />
          </div>
          <div style={{ marginBottom: "1.25rem" }}>
            <label className="field-label" htmlFor="contact-email">Email</label>
            <input id="contact-email" className="field-input" type="email" value={form.email} onChange={set("email")} placeholder="yourname@example.com" required />
          </div>
          <div style={{ marginBottom: "1.25rem" }}>
            <label className="field-label" htmlFor="contact-subject">Subject</label>
            <input id="contact-subject" className="field-input" type="text" value={form.subject} onChange={set("subject")} placeholder="What are you building?" required />
          </div>
          <div style={{ marginBottom: "1.6rem" }}>
            <label className="field-label" htmlFor="contact-message">Message</label>
            <textarea id="contact-message" className="field-input" rows={5} value={form.message} onChange={set("message")} placeholder="Tell us about your project, timeline, and budget range..." style={{ resize: "vertical" }} required />
          </div>

          <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
            <button type="submit" className="btn btn-primary" disabled={status === "sending"} style={{ opacity: status === "sending" ? 0.65 : 1, cursor: status === "sending" ? "not-allowed" : "pointer" }}>
              {status === "sending" ? "Sending..." : "Send message"}
            </button>
            <span style={{ fontSize: "0.85rem", opacity: 0.45 }}>
              or <button type="button" className="footer-link" onClick={() => go("booking")}>book a slot directly →</button>
            </span>
          </div>

          {status === "success" && (
            <p role="status" style={{ color: "var(--leaf)", marginTop: "1rem", lineHeight: 1.6 }}>
              Your message has been sent successfully.
            </p>
          )}
          {status === "error" && (
            <p role="alert" style={{ color: "#ff9a9a", marginTop: "1rem", lineHeight: 1.6 }}>
              The message could not be sent. Please try again, or email us directly at hello@blueswanlake.studio.
            </p>
          )}
        </form>
      </div>

      <div style={{ padding: "3.5rem 6vw 4.5rem", background: "var(--water)", display: "flex", flexDirection: "column", gap: "2.2rem" }}>
        <div>
          <p className="eyebrow">Direct</p>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "var(--mist-bright)", margin: "0 0 0.5rem" }}>
            <a href="mailto:hello@blueswanlake.studio" style={{ color: "inherit", textDecoration: "none" }}>hello@blueswanlake.studio</a>
          </p>
          <p style={{ fontSize: "0.92rem", opacity: 0.55, margin: 0 }}>+91 00000 00000 · Mon–Fri, 10:00–19:00 IST</p>
        </div>

        <div>
          <p className="eyebrow">What happens next</p>
          <div style={{ display: "grid", gap: "0.85rem" }}>
            {next.map(([n, copy]) => (
              <p key={n} style={{ fontSize: "0.9rem", lineHeight: 1.7, opacity: 0.65, margin: 0 }}>
                <span className="mono" style={{ color: "var(--crest)", marginRight: "0.6rem" }}>{n}</span>{copy}
              </p>
            ))}
          </div>
        </div>

        <div className="ph" style={{ flex: 1, minHeight: 220, borderRadius: 12 }}>studio photo or map<br />drop image here</div>
      </div>
    </div>
  );
}
