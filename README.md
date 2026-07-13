# DBFS Assignment 2 — Straits Digital Bank

Shared starter for the team's Assignment 2 web apps. Each teammate builds one
investment page (Stocks, FX, Precious Metals, Crypto) on top of the same
layout, routing, and login flow.

## Getting Started for Frontend

Clone the repo and create your branch:
git clone https://github.com/Yixuan003/DBFS_Template.git
cd DBFS_Template
git checkout -b feature/your-page

Set up your env file:
cd frontend
copy .env.example .env

Fill in `VITE_PAYPAL_CLIENT_ID` in `.env` (ask the team for the shared sandbox
Client ID).

Install dependencies:
npm install

Start the frontend:
npm run dev

Open the local URL shown in the terminal:
http://localhost:5173

### Useful Commands
npm run dev
npm run build

### Main Files

- `src/pages` — Login, AuthSuccess, Home, Stocks, ForeignExchange, PreciousMetals, Crypto
- `src/components` — shared layout: Sidebar, PageShell, PageHeader
- `src/styles` — tokens.css (design system variables) + global.css
- `src/utils/auth.js` — saves/reads the logged-in user, used by route protection
- `src/App.jsx` — routes

### Project Notes

- Login is real, not mocked — "Log in with PayPal" redirects through the
  Flask backend's OAuth2 flow and pulls back the actual PayPal profile.
- There is no separate signup page. PayPal handles both new and returning
  users through the same login button.
- All pages except `/login` and `/auth/success` are protected — visiting
  them directly without logging in redirects back to `/login`.
- Stocks, ForeignExchange, PreciousMetals, and Crypto pages are intentionally
  blank (title only). Build your price table and buy form in your own page
  file — don't touch anyone else's.
- Don't edit `src/components/` or `src/styles/` without checking with the
  team first — every page depends on that shared shell staying consistent.

## Getting Started for Backend
cd backend
python -m venv venv
venv\Scripts\activate

Set up your env file:
copy .env.example .env

Fill in `PAYPAL_CLIENT_ID` and `PAYPAL_CLIENT_SECRET` (ask the team for the
shared sandbox credentials).

Install dependencies:
pip install -r requirements.txt

Start the backend:
python run.py

The API runs at:
http://127.0.0.1:5000

## Test Endpoint

Open this in your browser:
http://127.0.0.1:5000/api/health

Expected response:
{
"service": "dbfs-backend",
"status": "ok"
}

## Main Files (Backend)

- `app/__init__.py` — app factory, loads `.env`, registers blueprints
- `app/routes/auth.py` — PayPal login/callback (done)
- `app/routes/<yours>.py` — create this for your investment type; see
  `auth.py` for the pattern

## Project Notes (Backend)

- Never commit real API keys. `.env` is gitignored — use `.env.example` as
  the template for what values are needed.
- PayPal's Return URL must exactly match `PAYPAL_REDIRECT_URI` in `.env`,
  including `127.0.0.1` vs `localhost` — PayPal treats these as different
  hosts.
- Log in with a **Personal** sandbox test account, not Business — PayPal's
  profile endpoint rejects Business account tokens.
- When adding your own route file, keep response shapes as
  `{"prices": [...]}` for GET and `{"status": ..., "message": ...}` for
  POST — the frontend already expects this shape.

## Running with Docker (optional)
docker compose up --build

- Frontend: http://localhost:5173
- Backend health check: http://localhost:5000/api/health

Requires `backend/.env` and `frontend/.env` to already exist locally — Docker
mounts your project folder, so it uses the same `.env` files as native setup.