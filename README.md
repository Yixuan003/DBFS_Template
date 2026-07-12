# Straits Digital Bank — Shared UI Template

Group project starter for DBFS Assignment 2. Everyone builds their own investment
page (Stocks, FX, Precious Metals, Crypto) on top of the **same look and feel**,
so the four individual web apps still feel like one product when demoed back to back.

This template is deliberately API-free. It has the pages, routing, layout, and
styling wired up with placeholder/mock data so each teammate can drop their own
Open Banking API calls into their own page without touching anyone else's.

## Stack

- **Frontend:** React (Vite) + React Router, plain CSS using design tokens (no
  Tailwind/UI kit, matches the Straits-FX design system exactly)
- **Backend:** Flask, blueprint-per-feature so each teammate owns one route file
- **Docker:** one Dockerfile per app + a docker-compose.yml to run both together

## Project layout

```
straits-fx-template/
├── docker-compose.yml
├── frontend/                 React app (port 5173)
│   ├── src/
│   │   ├── components/       Shared layout: Sidebar, TopBar, PageShell
│   │   ├── pages/            Home, Login, Signup, Stocks, ForeignExchange,
│   │   │                     PreciousMetals, Crypto
│   │   ├── styles/           tokens.css (design system variables) + global.css
│   │   ├── App.jsx           Routes
│   │   └── main.jsx
│   └── Dockerfile
└── backend/                  Flask app (port 5000)
    ├── app/
    │   ├── __init__.py       App factory, registers blueprints
    │   └── routes/           auth.py, stocks.py, fx.py, metals.py, crypto.py
    │                         each returns MOCK data for now
    ├── requirements.txt
    ├── run.py
    └── Dockerfile
```

## Running it

```bash
docker compose up --build
```

- Frontend: http://localhost:5173
- Backend:  http://localhost:5000/api/health

Or run each side natively while developing:

```bash
# frontend
cd frontend && npm install && npm run dev

# backend
cd backend && python -m venv venv && source venv/bin/activate
pip install -r requirements.txt && python run.py
```

## How the team splits the work

1. **Don't touch `src/components/` or `src/styles/tokens.css`** without telling
   the team — that's the shared shell everyone's page lives inside.
2. Each teammate owns exactly one file under `frontend/src/pages/` (their
   investment type) and one file under `backend/app/routes/` (their API calls).
3. When you're ready to add a real Open Banking API, replace the mock data in
   your route file — the page component already calls `fetch('/api/<yours>')`
   and renders whatever comes back, so the UI won't need to change.
4. Keep using the existing button/card/input classes (see `styles/global.css`)
   so every page still reads as one bank, not four different projects glued
   together.

## Design system

Colors, type, spacing, and component rules come straight from the Straits-FX
design system (tinted-paper light surface, single navy accent, tabular-mono
figures, hairline borders, near-zero shadow). All tokens live in
`frontend/src/styles/tokens.css` as CSS custom properties — reference them
instead of hardcoding hex values.
