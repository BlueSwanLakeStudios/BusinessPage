import { useState } from "react";

function Contact() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const inputStyle = {
    width: "100%",
    background: "rgba(95,188,211,0.06)",
    border: "1px solid rgba(95,188,211,0.2)",
    borderRadius: 8,
    padding: "0.85rem 1rem",
    color: "#d4ecf5",
    fontSize: "0.95rem",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.82rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    opacity: 0.55,
    marginBottom: "0.5rem",
    color: "#7ecfea",
  };

  return (
    <section id="contact" style={{ background: "#0d2035", padding: "6rem 6vw", color: "#d4ecf5" }}>
      <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#5fbcd3", opacity: 0.8, marginBottom: "0.75rem" }}>
        Get In Touch
      </p>
      <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, marginBottom: "0.75rem", color: "#eaf6fb" }}>
        Let's Work Together
      </h2>
      <p style={{ opacity: 0.55, marginBottom: "2.5rem", maxWidth: 480, lineHeight: 1.7 }}>
        Have a project in mind? Drop us a message and we'll get back to you within 24 hours.
      </p>
      <div style={{ maxWidth: 560 }}>
        <div style={{ marginBottom: "1.25rem" }}>
          <label style={labelStyle}>Subject</label>
          <input
            type="text"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            placeholder="What's this about?"
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: "1.75rem" }}>
          <label style={labelStyle}>Message</label>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Tell us about your project..."
            rows={5}
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </div>
        <button style={{ background: "#5fbcd3", color: "#071525", padding: "0.85rem 2.25rem", borderRadius: 8, fontWeight: 700, fontSize: "0.95rem", border: "none", cursor: "pointer" }}>
          Send Message
        </button>
      </div>
    </section>
  );
}

export default Contact;