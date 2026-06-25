# Pulseboard Dashboard

Command-center style dashboard built with Vite + React. It opens on a branded welcome screen and transitions into a revenue, customer-experience, and deployment control room designed to deploy cleanly on Railway.

## Features
- **Welcome page** rendered by a dedicated `WelcomePage` component with CTA buttons that gate access to the dashboard experience (`src/App.tsx`).
- **Railway-ready deploy panel** that mirrors pipeline status and links into live logs.
- **Insight cards** for revenue, retention, roadmap, and operational signals backed by configurable data arrays.
- **Custom aesthetic** using Space Grotesk / IBM Plex fonts, neon gradients, and badge components defined in `src/styles.css`.

## Project Layout
- `src/App.tsx` – UI composition, sample data arrays, sparkline component.
- `src/styles.css` – Global tokens, welcome screen treatments, dashboard grid system.
- `vite.config.ts` / `tsconfig.json` – Vite + TypeScript configuration.
- `railway.json` and `railway.toml` – Railway deployment descriptors (JSON uses Vite preview, TOML serves the built `dist/` bundle).

## Prerequisites
- Node.js 20+ (Railway Nixpacks default) and npm 10+.
- Railway CLI (`npm i -g @railway/cli`) if you plan to deploy.

## How to Use

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the dev server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser. The app loads on the welcome screen first.

3. **Enter the dashboard**
   Click **Enter Dashboard** on the welcome page to open the command center. Use the **Welcome Page** button in the dashboard header to return to the welcome screen at any time.

4. **Explore the dashboard**
   - **Hero section** — high-level pulses (NPS, expansion, trial-to-paid) and a Railway deploy status panel.
   - **Metrics grid** — revenue, customers, churn, and support response time.
   - **Panels** — retention sparkline, roadmap queue, revenue pipeline, and ops activity signals.

5. **Customize the data**
   Edit the arrays at the top of `src/App.tsx` (`metrics`, `pulses`, `roadmap`, `activities`, `welcomeFeatures`, `welcomeStats`, `welcomeMilestones`, and the trend arrays) to swap in your own copy and telemetry. Adjust colors and layout tokens in `src/styles.css` to match your brand.

6. **Build and preview locally**
   ```bash
   npm run build
   npm run preview
   ```
   Confirm the production bundle looks correct before deploying.

7. **Deploy to Railway**
   ```bash
   railway login
   railway init        # or railway link to an existing project
   railway up
   ```
   See [Deploying on Railway](#deploying-on-railway) below for manifest options.

## Local Development
```bash
npm install
npm run dev
```
Vite serves the app at `http://localhost:5173`. The welcome CTA toggles into the dashboard view; use the “Welcome Page” button in the header to return.

### Build & Preview
```bash
npm run build    # outputs production assets to dist/
npm run preview  # serves dist/ with Vite preview
```

## Welcome Page

The app opens on a branded welcome screen before revealing the dashboard. The `WelcomePage` component (`src/App.tsx`) renders a centered card with:

- An eyebrow label, headline, and intro copy describing Pulseboard.
- A feature grid driven by the `welcomeFeatures` array — three cards highlighting revenue intelligence, customer signals, and deploy health by default.
- Two CTA buttons: **Enter Dashboard** (primary) continues into the command center, and **View Product Tour** (ghost) is a placeholder for a guided walkthrough.

### Navigation behavior
The `isWelcomeVisible` state in `App` gates the dashboard. The welcome screen shows first; clicking **Enter Dashboard** flips the state to render the command center. A **Welcome Page** button in the dashboard top bar restores the welcome screen at any time.

### Styling
The welcome layout uses the `.welcome`, `.welcome-card`, `.welcome-features`, and `.welcome-actions` classes in `src/styles.css`, with a `card-enter` keyframe animation on the card. The action row stacks vertically below 600px via the responsive media query.

## Deploying on Railway

You can use either manifest that ships with the repo:

1. **`railway.json` (Vite preview server)** – default Nixpacks builder with `npm run preview -- --host 0.0.0.0 --port $PORT` as the start command. Works well if you want to keep using Vite’s preview server in production.
2. **`railway.toml` (static dist server)** – installs, builds, and then runs `serve@14` against `dist/`. Use this if you prefer a static file server for the compiled bundle.

Typical deploy flow:
```bash
railway login
railway init        # or railway link to existing project
railway up          # builds with Nixpacks and deploys using the configured startCommand
```

## Customizing Data & Styling
- Update the `metrics`, `pulses`, `roadmap`, `activities`, `welcomeFeatures`, and trend arrays at the top of `src/App.tsx` to swap in your live telemetry and welcome-page copy.
- Adjust colors, gradients, and layout tokens inside `src/styles.css` to align with your brand system.
- Replace or augment the deployment steps in the hero card with live status pulled from your own APIs once you integrate data fetching.

## Troubleshooting
- Ensure `npm run build` succeeds locally before deploying; Railway surfaces the same build output.
- If you mix both Railway manifests, Railway prioritizes `railway.toml`. Delete the unused file or align both start commands for consistency.
