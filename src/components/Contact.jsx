import { useState } from "react";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx4AqLhH011Svtbe8nLSu_tWtbE-pq2MqUmyEOLsNuPlE2eillBEIU1zIrczqhPs5RU/exec";

const labelStyle = {
  display: "block",
  fontSize: "0.8rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  opacity: 0.55,
  marginBottom: "0.5rem",
  color: "var(--crest-soft)",
};

const fieldStyle = { marginBottom: "1.25rem" };

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (status === "sending") return;

    setStatus("sending");

    const requestBody = new URLSearchParams({
      name,
      email,
      subject,
      message,
      website: "",
    });

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: requestBody.toString(),
      });

      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setStatus("success");
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      style={{
        background: "var(--water-2)",
        padding: "6rem 6vw",
        color: "var(--mist)",
      }}
    >
      <p className="eyebrow">Get In Touch</p>

      <h2
        style={{
          fontSize: "clamp(1.9rem, 3.2vw, 2.8rem)",
          fontWeight: 600,
          marginBottom: "0.75rem",
          color: "var(--mist-bright)",
        }}
      >
        Have an app in mind?
      </h2>

      <p
        style={{
          opacity: 0.55,
          marginBottom: "2.5rem",
          maxWidth: 480,
          lineHeight: 1.7,
        }}
      >
        Tell us what you're building — a new product, a platform, or a tool
        your team needs. We reply within 24 hours with honest next steps.
      </p>

      <form onSubmit={handleSubmit} style={{ maxWidth: 560 }}>
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ display: "none" }}
        />

        <div style={fieldStyle}>
          <label htmlFor="contact-name" style={labelStyle}>
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
            className="field-input"
            required
          />
        </div>

        <div style={fieldStyle}>
          <label htmlFor="contact-email" style={labelStyle}>
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="yourname@example.com"
            className="field-input"
            required
          />
        </div>

        <div style={fieldStyle}>
          <label htmlFor="contact-subject" style={labelStyle}>
            Subject
          </label>
          <input
            id="contact-subject"
            type="text"
            name="subject"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            placeholder="What are you building?"
            className="field-input"
            required
          />
        </div>

        <div style={{ marginBottom: "1.75rem" }}>
          <label htmlFor="contact-message" style={labelStyle}>
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Tell us about your project, timeline, and budget range..."
            rows={5}
            className="field-input"
            style={{ resize: "vertical" }}
            required
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="btn btn-primary"
          style={{
            border: "none",
            cursor: status === "sending" ? "not-allowed" : "pointer",
            opacity: status === "sending" ? 0.65 : 1,
          }}
        >
          {status === "sending" ? "Sending..." : "Send message"}
        </button>

        {status === "success" && (
          <p
            role="status"
            style={{ color: "#7ed6a5", marginTop: "1rem", lineHeight: 1.6 }}
          >
            Message sent. We'll reply within 24 hours.
          </p>
        )}

        {status === "error" && (
          <p
            role="alert"
            style={{ color: "#ff9a9a", marginTop: "1rem", lineHeight: 1.6 }}
          >
            The message could not be sent. Please try again, or email us
            directly at hello@blueswanlake.studio.
          </p>
        )}
      </form>
    </section>
  );
}