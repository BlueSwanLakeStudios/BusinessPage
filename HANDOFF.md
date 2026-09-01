# Blue Swan Lake Studios — site rebuild

A complete Vite + React app implementing the approved mockup (Home, About, Services, Work,
Pricing, Journal, Contact, Booking flow). No Tailwind, no router dependency — routing is
hash-based, styling lives in \`src/index.css\` + inline styles.

## Install into the repo

1. Copy everything in this folder into the repo root, so you get:

   \`\`\`
   index.html
   package.json
   vite.config.js
   .github/workflows/deploy.yml
   src/
     main.jsx
     index.css
     App.jsx
     assets/logo.png          <- keep your existing file
     components/
       Navbar.jsx  Footer.jsx
       HomePage.jsx  AboutPage.jsx  ServicesPage.jsx  WorkPage.jsx
       PricingPage.jsx  JournalPage.jsx  ContactPage.jsx  BookingPage.jsx
       SwanAnimation.jsx      <- unchanged, GSAP swan
   \`\`\`

2. \`npm install\` then \`npm run dev\`.
3. Commit and push to \`main\` — the included workflow builds and deploys to GitHub Pages.

## Two things that broke the old build

- The old \`Navbar.jsx\` imported \`../assets/logo.svg\`, which does not exist in the repo
  (only \`logo.png\`). Vite fails the build on a missing asset import — that alone is enough
  to leave the deployed page blank. This version imports \`logo.png\`.
- \`src/index.css\` had \`@import "tailwindcss"\` without the Tailwind v4 Vite plugin
  installed. Tailwind is gone here; nothing in the markup needed it.

## What changed in the design

- Display face is **Newsreader** (Fraunces' wonky f/l glyphs are gone), body **Instrument Sans**,
  labels **JetBrains Mono**.
- Palette extends the original tokens: added \`--lotus\` (#f0a0b4) and \`--leaf\` (#7ed6a5) —
  both pulled from the swan artwork — for accents and live status.
- New: the animated waterline in the hero, the "below the waterline" stats band, the tech
  marquee, the ship-log module, and the About / Work / Pricing / Journal / Booking pages.
- The swan animation and logo are untouched.

## Placeholders to replace

Anything using the \`.ph\` class is a striped placeholder with a label (app screens, portraits,
case-study images, studio photo). Drop real images in and delete the class.

## Contact form

\`ContactPage.jsx\` still posts to your existing Google Apps Script endpoint, unchanged.
The booking form is UI-only — wire step 4 to Cal.com / Google Calendar when you're ready.
