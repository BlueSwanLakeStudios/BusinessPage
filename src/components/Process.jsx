const steps = [
  {
    n: "01",
    title: "Dive",
    desc: "A short discovery sprint: your goals, users, and constraints. We leave with a scoped plan and a fixed quote — no vague estimates.",
  },
  {
    n: "02",
    title: "Design",
    desc: "Clickable prototypes before a line of production code. You react to something real, and we revise until the flow feels right.",
  },
  {
    n: "03",
    title: "Build",
    desc: "Weekly shipped builds you can hold in your hand. Progress you can tap, not slide decks about progress.",
  },
  {
    n: "04",
    title: "Launch & glide",
    desc: "Store submission, monitoring, and a stabilization window included. Then we iterate on real usage data together.",
  },
];

function Process() {
  return (
    <section
      id="process"
      style={{ background: "var(--water)", padding: "6rem 6vw", color: "var(--mist)" }}
    >
      <p className="eyebrow">How We Work</p>
      <h2
        style={{
          fontSize: "clamp(1.9rem, 3.2vw, 2.8rem)",
          fontWeight: 600,
          marginBottom: "3rem",
          color: "var(--mist-bright)",
        }}
      >
        From first call to first release
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {steps.map((step) => (
          <div
            key={step.n}
            style={{
              borderTop: "1px solid rgba(95,188,211,0.3)",
              paddingTop: "1.5rem",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                color: "var(--crest)",
                fontSize: "1rem",
                margin: "0 0 0.75rem",
              }}
            >
              {step.n}
            </p>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                margin: "0 0 0.6rem",
                color: "var(--mist-bright)",
              }}
            >
              {step.title}
            </h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.7, opacity: 0.6, margin: 0 }}>
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Process;