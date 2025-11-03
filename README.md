# EZRANGER

EZRANGER is a range-based estimation playground inspired by Atomic Object's buffer formula (ΣABP + √Σ(HP−ABP)²). The 2025 rewrite replaces the legacy jQuery page with a React + Tailwind + Vite stack so you can capture realistic project ranges on any device.

## Features

- **Dual estimates per task** – capture Aggressive-but-Possible and Highly-Probable numbers (decimals welcome) with inline validation and color feedback.
- **Atomic math baked in** – totals the ABP baseline and computes the shared buffer from per-task spreads while preventing HP < ABP mistakes.
- **Local persistence** – every edit syncs to `localStorage`, so projects survive refreshes.
- **Modern UI** – hero summary, glassmorphism task cards, and projection readouts that explain how the estimate is composed.
- **Tests** – Vitest keeps the estimator logic honest as you tweak the algorithm.

## Tech Stack

- React 19 with Vite 7
- Tailwind CSS 3 + PostCSS
- Vitest for unit tests

## Quick Start

```bash
npm install       # install deps (use npm_config_cache if permissions are locked down)
npm run dev       # start the Vite dev server on http://localhost:5173
npm run build     # produce the static bundle in dist/
npm test          # run estimator unit tests
```

## Deployment

`npm run build` emits static assets under `dist/`. Deploy that folder to any static host (Netlify, Vercel, S3 + CloudFront, etc.). If you later add routing, configure your host to fall back to `index.html`.

## Credits

- Estimation formula adapted from [Atomic Object’s guide](https://atomicobject.com/client-resources/better-custom-software-estimates).
- Original concept by @mykepreuss, rebuilt with ❤️ in 2025.

