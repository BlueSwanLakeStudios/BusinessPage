import { useState } from "react";

const PROJECTS = [
  ["mobile", "A mobile app", "iOS, Android, or both — new build or rescue."],
  ["web", "A web platform", "SaaS product, dashboard, or customer portal."],
  ["tools", "Internal tools", "Admin panels and automations for your team."],
  ["unsure", "Not sure yet", "You have a problem, not a spec. That's fine."],
];

const BUDGETS = [["a", "Under ₹5L"], ["b", "₹5L – ₹12L"], ["c", "₹12L – ₹30L"], ["d", "₹30L+"]];
const TIMINGS = [["a", "Yesterday"], ["b", "Next quarter"], ["c", "This year"], ["d", "Exploring"]];

const DAYS = [
  ["Mon 7 Sep", [["a", "10:30", true], ["b", "14:00", true]]],
  ["Tue 8 Sep", [["c", "11:00", true], ["d", "16:30", true]]],
  ["Wed 9 Sep", [["e", "09:30", true], ["x", "15:00", false]]],
  ["Thu 10 Sep", [["f", "12:00", true], ["g", "17:30", true]]],
];

const SLOT_LABELS = {
  a: "Mon 7 Sep · 10:30 IST", b: "Mon 7 Sep · 14:00 IST",
  c: "Tue 8 Sep · 11:00 IST", d: "Tue 8 Sep · 16:30 IST",
  e: "Wed 9 Sep · 09:30 IST", f: "Thu 10 Sep · 12:00 IST", g: "Thu 10 Sep · 17:30 IST",
};

const STEPS = ["Project", "Scope", "Slot", "Confirm"];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [proj, setProj] = useState("mobile");
  const [budget, setBudget] = useState("b");
  const [timing, setTiming] = useState("b");
  const [slot, setSlot] = useState("c");
  const [done, setDone] = useState(false);

  const dot = (n) => ({
    display: "grid", placeItems: "center", width: 28, height: 28, borderRadius: "50%", flex: "none",
    background: step === n ? "var(--crest)" : step > n ? "rgba(95,188,211,0.35)" : "rgba(95,188,211,0.12)",
    color: step === n ? "var(--water)" : "var(--mist)",
    fontFamily: "var(--font-mono)", fontSize: 12,
  });

  const summary = [
    ["Project", PROJECTS.find((p) => p[0] === proj)[1]],
    ["Budget", BUDGETS.find((b) => b[0] === budget)[1]],
    ["Timing", TIMINGS.find((t) => t[0] === timing)[1]],
    ["Slot", SLOT_LABELS[slot]],
  ];

  return (
    <>
      <section style={{ position: "relative", background: "linear-gradient(180deg,#0d2740,#0a1c30)", padding: "7rem 6vw 2.5rem", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, transparent 30%, rgba(95,188,211,0.08) 50%, transparent 70%)", backgroundSize: "200% 100%", animation: "bs-shimmer 9s linear infinite" }} />
        <div style={{ position: "relative", maxWidth: 1000, margin: "0 auto" }}>
          <p className="eyebrow">Book a call · 20 minutes · free</p>
          <h1 className="h1" style={{ fontSize: "clamp(1.9rem,3.2vw,2.9rem)", marginBottom: "1.8rem" }}>Four questions, then a slot.</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "0.9rem", flexWrap: "wrap" }}>
            {STEPS.map((label, i) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.6rem", flex: i === 3 ? "none" : 1, minWidth: 130 }}>
                <span style={dot(i + 1)}>{i + 1}</span>
                <span style={{ fontSize: "0.82rem", opacity: 0.7 }}>{label}</span>
                {i < 3 && <span style={{ flex: 1, height: 1, background: "rgba(95,188,211,0.24)" }} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--water)", padding: "2.8rem 6vw 4.6rem" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>

          {step === 1 && (
            <div>
              <h2 className="h2" style={{ fontSize: "1.75rem" }}>What are you building?</h2>
              <p className="body" style={{ marginBottom: "1.8rem" }}>Pick the closest one — we'll get into detail on the call.</p>
              <div className="grid g2" style={{ marginBottom: "2rem" }}>
                {PROJECTS.map(([key, title, copy]) => (
                  <button
                    key={key} type="button" onClick={() => setProj(key)}
                    style={{
                      display: "flex", flexDirection: "column", gap: "0.5rem", textAlign: "left", padding: "1.4rem",
                      borderRadius: 14, cursor: "pointer", fontFamily: "var(--font-body)",
                      background: proj === key ? "rgba(95,188,211,0.1)" : "rgba(95,188,211,0.04)",
                      border: "1.5px solid " + (proj === key ? "var(--crest)" : "rgba(95,188,211,0.16)"),
                    }}
                  >
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "var(--mist-bright)" }}>{title}</span>
                    <span style={{ fontSize: "0.85rem", lineHeight: 1.6, color: "var(--mist)", opacity: 0.55 }}>{copy}</span>
                  </button>
                ))}
              </div>
              <button type="button" className="btn btn-primary" onClick={() => setStep(2)}>Continue →</button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="h2" style={{ fontSize: "1.75rem" }}>Rough budget and timing</h2>
              <p className="body" style={{ marginBottom: "1.8rem" }}>Honest ranges save everyone a meeting. Nothing here is binding.</p>

              <p className="eyebrow">Budget range</p>
              <div style={{ display: "flex", gap: "0.7rem", flexWrap: "wrap", marginBottom: "1.9rem" }}>
                {BUDGETS.map(([key, label]) => (
                  <button key={key} type="button" className={budget === key ? "chip on" : "chip"} onClick={() => setBudget(key)}>{label}</button>
                ))}
              </div>

              <p className="eyebrow">When do you want it live?</p>
              <div style={{ display: "flex", gap: "0.7rem", flexWrap: "wrap", marginBottom: "2rem" }}>
                {TIMINGS.map(([key, label]) => (
                  <button key={key} type="button" className={timing === key ? "chip on" : "chip"} onClick={() => setTiming(key)}>{label}</button>
                ))}
              </div>

              <div style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap" }}>
                <button type="button" className="btn btn-ghost" onClick={() => setStep(1)}>← Back</button>
                <button type="button" className="btn btn-primary" onClick={() => setStep(3)}>Continue →</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="h2" style={{ fontSize: "1.75rem" }}>Pick a slot</h2>
              <p className="body" style={{ marginBottom: "1.8rem" }}>20 minutes with the studio lead. Times shown in IST.</p>
              <div className="grid g4" style={{ marginBottom: "2rem" }}>
                {DAYS.map(([day, slots], i) => (
                  <div key={day}>
                    <p className="mono" style={{ color: i === 3 ? "var(--lotus)" : "var(--crest-soft)", margin: "0 0 0.75rem" }}>{day}</p>
                    <div style={{ display: "grid", gap: "0.6rem" }}>
                      {slots.map(([key, time, open]) =>
                        open ? (
                          <button
                            key={key} type="button" onClick={() => setSlot(key)}
                            style={{
                              padding: "0.85rem 0", borderRadius: 9, cursor: "pointer", fontSize: "0.88rem",
                              fontFamily: "var(--font-body)", textAlign: "center",
                              background: slot === key ? "var(--crest)" : "none",
                              color: slot === key ? "var(--water)" : "var(--mist)",
                              fontWeight: slot === key ? 700 : 500,
                              border: "1.5px solid " + (slot === key ? "var(--crest)" : "rgba(95,188,211,0.28)"),
                            }}
                          >
                            {time}
                          </button>
                        ) : (
                          <span key={key} style={{ padding: "0.85rem 0", borderRadius: 9, textAlign: "center", fontSize: "0.88rem", border: "1px dashed rgba(95,188,211,0.18)", color: "rgba(212,236,245,0.28)" }}>
                            {time}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap" }}>
                <button type="button" className="btn btn-ghost" onClick={() => setStep(2)}>← Back</button>
                <button type="button" className="btn btn-primary" onClick={() => setStep(4)}>Confirm slot →</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="split" style={{ display: "grid", gridTemplateColumns: "1fr 0.8fr", gap: "2.2rem", alignItems: "start" }}>
              <div>
                <p className="eyebrow" style={{ color: "var(--leaf)" }}>Slot held for 10 minutes</p>
                <h2 className="h2" style={{ fontSize: "1.8rem" }}>Almost done — where do we send the invite?</h2>
                <p className="body" style={{ fontSize: "0.94rem", marginBottom: "1.6rem" }}>
                  You'll get a calendar invite with a short agenda, and a one-page prep note so the call isn't spent on
                  background.
                </p>
                <form style={{ maxWidth: 460 }} onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
                  <div style={{ marginBottom: "1.1rem" }}>
                    <label className="field-label" htmlFor="b-name">Name</label>
                    <input id="b-name" className="field-input" type="text" placeholder="Your name" required />
                  </div>
                  <div style={{ marginBottom: "1.1rem" }}>
                    <label className="field-label" htmlFor="b-email">Work email</label>
                    <input id="b-email" className="field-input" type="email" placeholder="you@company.com" required />
                  </div>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <label className="field-label" htmlFor="b-notes">Anything we should read first?</label>
                    <textarea id="b-notes" className="field-input" rows={3} placeholder="A link to your deck, Figma file, or current app…" style={{ resize: "vertical" }} />
                  </div>
                  <div style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap" }}>
                    <button type="button" className="btn btn-ghost" onClick={() => setStep(3)}>← Back</button>
                    <button type="submit" className="btn btn-primary">Book the call</button>
                  </div>
                  {done && (
                    <p role="status" style={{ color: "var(--leaf)", marginTop: "1rem", lineHeight: 1.6 }}>
                      Booked — the invite is on its way. (Wire this up to your calendar tool.)
                    </p>
                  )}
                </form>
              </div>

              <aside className="card" style={{ padding: "1.6rem" }}>
                <p className="eyebrow">Your summary</p>
                <div style={{ display: "grid", gap: "1rem" }}>
                  {summary.map(([label, value]) => (
                    <div key={label}>
                      <p className="mono" style={{ opacity: 0.45, margin: "0 0 0.3rem" }}>{label}</p>
                      <p style={{ fontSize: "0.94rem", color: "var(--mist-bright)", margin: 0 }}>{value}</p>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: "0.8rem", lineHeight: 1.7, opacity: 0.45, margin: "1.4rem 0 0", borderTop: "1px solid rgba(95,188,211,0.14)", paddingTop: "1rem" }}>
                  No sales sequence, no CRM drip. One reply from a person who will be on the call.
                </p>
              </aside>
            </div>
          )}

        </div>
      </section>
    </>
  );
}
