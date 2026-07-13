# DBFS Assignment 2 — Straits Digital Bank

Shared starter for the team's investment pages (Stocks, FX, Precious Metals, Crypto). Common layout, routing, and page structure — each teammate implements their own PayPal login and API logic.

## Frontend
cd frontend
copy .env.example .env    # fill in your own VITE_PAYPAL_CLIENT_ID
npm install
npm run dev
Runs at http://localhost:5173

**Files:**
- `src/pages` — Login, AuthSuccess, Home, Stocks, ForeignExchange, PreciousMetals, Crypto
- `src/components` — shared layout (Sidebar, PageShell, PageHeader) — don't edit without checking with the team
- `src/styles` — design tokens + global CSS
- `src/utils/auth.js` — login state, used by route protection

**Notes:**
- Login button and route protection are wired up; backend behind them is a stub — implement `backend/app/routes/auth.py` to make it work.
- No signup page — PayPal handles new and returning users through the same button.
- Your investment page is blank on purpose. Build in your own page file only.

## Backend
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env    # fill in your own PayPal credentials
python run.py
Runs at http://127.0.0.1:5000 — health check at `/api/health`

**Files:**
- `app/__init__.py` — app factory, loads `.env`, registers blueprints
- `app/routes/auth.py` — PayPal login/callback stub, implement this
- `app/routes/<yours>.py` — create for your investment type

**PayPal setup (each person creates their own app):**
1. developer.paypal.com → Sandbox app → get Client ID/Secret
2. Enable "Log in with PayPal" → set Return URL to match `PAYPAL_REDIRECT_URI` in your `.env` exactly (`127.0.0.1` ≠ `localhost`)
3. Testing Tools → Sandbox Accounts → use a **Personal** account to log in (Business accounts fail the profile fetch)

**Contract to preserve** so the frontend doesn't need changes:
- `GET /paypal/login` → redirect to PayPal
- `GET /paypal/callback` → redirect to `{FRONTEND_URL}/auth/success?paypal_name=...&paypal_email=...`
- Your investment routes: `{"prices": [...]}` for GET, `{"status": ..., "message": ...}` for POST

**Never commit `.env`** — it's gitignored; `.env.example` is the template.

## Docker (optional)
docker compose up --build
Frontend: http://localhost:5173 · Backend: http://localhost:5000/api/health
Requires `.env` files to exist locally first.