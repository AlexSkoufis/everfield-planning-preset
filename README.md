# Everfield Advisors — Financial Planning Preset

A warm, reassuring homepage for a **fictional** flat-fee financial planning firm. Paper and cream with deep spruce, teal and a gold sun; Newsreader (optical sizes, italic accents) + Manrope. No photography: every visual is drawn in code.

Next.js 16 (static export) · GSAP 3 + ScrollTrigger · Lenis · CSS Modules. No UI libraries.

```bash
npm install
npm run dev
npm run build     # static site in ./out
```

## Sections

| Section | What it does |
|---|---|
| Hero | Two-line headline with an italic accent line, and an interactive "one plan" chart: pick a life milestone and the plan areas it touches light up. |
| Marquee | Everything the membership covers, scrolling. |
| Problem | Three common money problems, each with a question to ask yourself, and a resolution. |
| Services | Eight services as a numbered list. |
| Who we help | Four life stages as tabs, each with its own focus points. |
| Process | Three steps to start, then a quarterly review ring: select a quarter to see what it covers. |
| Membership | Tabs for what's included, promises, and a comparison table against traditional advisors. |
| Investing | Bars showing money organised by time horizon, and an illustrative client dashboard (balance, growth line, allocation, activity chips) drawn in HTML and SVG. |
| Stats | Count-up figures. |
| FAQ | Accordion of seven questions. |
| Final call to action | Booking prompt plus a resource-library teaser. |

## Re-skin

- **Copy & data**: `content/site.json` (brand, navigation, footer, social) and `content/home.json` (every section, including the dashboard figures under `investing.dashboard`).
- **Logo**: `components/Logo.js` (sun-over-field mark and serif wordmark, drawn in `currentColor`) and `app/icon.svg`.
- **Colour**: tokens at the top of `app/globals.css` (`--navy-900`, `--navy`, `--ink`, `--blue`, `--sky`, `--gold`, `--coral`, `--sage`, `--cream`, `--paper`). The token names are kept from the base design; their values are the Everfield palette.
- **Type**: `app/layout.js`.

## Accessibility & motion

Smooth scrolling and reveal animations respect `prefers-reduced-motion`. Tabs, the accordion, the milestone chart and the quarterly ring all work from the keyboard.

## Demo content

Everfield Advisors, its fees, figures, team and testimonials are fictional, and the domain is the reserved `everfield.example`. A real firm must replace them, and have its fee disclosures and regulatory wording reviewed, before launch.
