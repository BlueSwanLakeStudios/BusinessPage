```jsx
import { useState } from "react";

const SCRIPT_URL =
  "PASTE_YOUR_GOOGLE_APPS_SCRIPT_EXEC_URL_HERE";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");

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

  const fieldStyle = {
    marginBottom: "1.25rem",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (status === "sending") {
      return;
    }

    if (SCRIPT_URL.includes("PASTE_YOUR")) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    const formData = new FormData(event.currentTarget);
    const requestBody = new URLSearchParams(formData);

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: requestBody,
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
        background: "#0d2035",
        padding: "6rem 6vw",
        color: "#d4ecf5",
      }}
    >
      <p
        style={{
          fontSize: 11,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#5fbcd3",
          opacity: 0.8,
          marginBottom: "0.75rem",
        }}
      >
        Get In Touch
      </p>

      <h2
        style={{
          fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
          fontWeight: 800,
          marginBottom: "0.75rem",
          color: "#eaf6fb",
        }}
      >
        Let&apos;s Work Together
      </h2>

      <p
        style={{
          opacity: 0.55,
          marginBottom: "2.5rem",
          maxWidth: 480,
          lineHeight: 1.7,
        }}
      >
        Have a project in mind? Drop us a message and we&apos;ll get back to
        you within 24 hours.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: 560 }}
      >
        {/* Honeypot field for basic spam protection */}
        <input
          type="text"
          name="website"
          tabIndex="-1"
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
            style={inputStyle}
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
            style={inputStyle}
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
            placeholder="What's this about?"
            style={inputStyle}
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
            placeholder="Tell us about your project..."
            rows={5}
            style={{
              ...inputStyle,
              resize: "vertical",
            }}
            required
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          style={{
            background: "#5fbcd3",
            color: "#071525",
            padding: "0.85rem 2.25rem",
            borderRadius: 8,
            fontWeight: 700,
            fontSize: "0.95rem",
            border: "none",
            cursor:
              status === "sending" ? "not-allowed" : "pointer",
            opacity: status === "sending" ? 0.65 : 1,
          }}
        >
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>

        {status === "success" && (
          <p
            role="status"
            style={{
              color: "#7ed6a5",
              marginTop: "1rem",
              lineHeight: 1.6,
            }}
          >
            Your message has been sent successfully.
          </p>
        )}

        {status === "error" && (
          <p
            role="alert"
            style={{
              color: "#ff9a9a",
              marginTop: "1rem",
              lineHeight: 1.6,
            }}
          >
            The message could not be sent. Check the Google Apps Script URL
            and try again.
          </p>
        )}
      </form>
    </section>
  );
}

export default Contact;
```
