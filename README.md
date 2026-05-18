# Garage Reboot — Calgary's Cleanout & Moving Service

Landing page for **Garage Reboot**, a Calgary-based residential and commercial garage cleanout, junk removal, and moving service.

**Live site:** [aldo140.github.io/Garage-Reboot](https://aldo140.github.io/Garage-Reboot/)

---

## Stack

| Layer | Tech |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite 6 |
| Styling | Tailwind CSS v4 (`@theme` config, no config file) |
| Animation | Framer Motion (`motion/react`) |
| Icons | Lucide React |
| Deploy | GitHub Pages via `gh-pages` |

---

## Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
```

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Local dev server on port 3000 |
| `npm run build` | Production build → `dist/` |
| `npm run lint` | TypeScript type check |
| `npm run deploy` | Build + push to `gh-pages` branch |

---

## Project Structure

```
src/
  App.tsx            # All components (single-file architecture)
  index.css          # Tailwind @theme, custom CSS (marquee, truck, pricing cards)
  declarations.d.ts  # Image module declarations
images/
  wide-landing.png
  services-card.png
  small-illustration-*.png
public/
  favicon.svg
```

---

## Brand

| Token | Value |
|---|---|
| Navy | `#041B4D` |
| Orange | `#FF6A00` |
| Green | `#6BCB16` |
| Charcoal | `#232323` |
| Soft | `#F2F2F2` |
| Display font | Oswald 700 |
| Body font | Inter |

---

## Sections

- **Hero** — Parallax image, scroll-triggered before → after crossfade (desktop), rotating word badge
- **Gallery** — Side-by-side before/after project panels
- **Process** — 3-step cleanout method
- **Services** — Dark bento grid with branded illustrations
- **Pricing** — 3-tab scenario picker (Haul Away / Just the Muscle / Moving) with FAQ accordion
- **Service Area** — Alberta route list, stats strip, full-width CTA
- **Testimonials** — Google review cards
- **Contact** — Floating-label quote form

---

## Deploying

The site deploys to the `gh-pages` branch automatically:

```bash
npm run deploy
```

GitHub Pages must be configured to serve from the `gh-pages` branch (Settings → Pages → Source → `gh-pages` / root).

---

## Services

- **Garage Cleanouts** — Full junk removal, heavy lifting, and final sweep
- **Junk Removal** — Appliances, clutter, same-day available
- **Student Moving** — Semester transitions, fast turnaround
- **Move-Out** — Clear leftovers, stay on schedule
- **Full Moving** — Packing to delivery, local Alberta
- **Commercial** — Office and retail clear-outs

## Service Area

Calgary and a 3-hour radius — all quadrants of Calgary, Airdrie, Cochrane, Okotoks, High River, Banff, Canmore, Brooks, Lethbridge, and rural Southern Alberta.

---

*100% Calgarian owned. We clear space. You reclaim life.*
