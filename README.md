# DBFS Assignment 2 — Straits Digital Bank

A starter template for the Straits Digital Bank project. The template provides the shared frontend layout, routing, PayPal authentication flow, and project structure. Each team member is responsible for implementing their own investment API and backend logic.

---

# Project Setup

## 1. Download the Project

Download and extract the project.

```
Straits-Digital-Bank-Template/
```

Open **two terminals**:

- Terminal 1 → Frontend
- Terminal 2 → Backend

---

## 2. Frontend

Navigate to the frontend folder.

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at:

```
http://localhost:5173
```

---

## 3. Backend

Navigate to the backend folder.

```bash
cd backend
```

Create and activate a virtual environment.

**Windows**

```bash
python -m venv venv
venv\Scripts\activate
```

**macOS / Linux**

```bash
python3 -m venv venv
source venv/bin/activate
```

Install the required packages.

```bash
pip install -r requirements.txt
```

---

## 4. Environment Variables

Create a `.env` file inside the **backend** folder.

```env
PAYPAL_CLIENT_ID=YOUR_PAYPAL_CLIENT_ID
PAYPAL_CLIENT_SECRET=YOUR_PAYPAL_CLIENT_SECRET
PAYPAL_REDIRECT_URI=http://localhost:5000/api/auth/paypal/callback
PAYPAL_API_BASE=https://api-m.sandbox.paypal.com
FRONTEND_URL=http://localhost:5173
```

---

## 5. Run the Backend

```bash
python run.py
```

The backend runs at:

```
http://localhost:5000
```

Health check:

```
http://localhost:5000/api/health
```

---

## 6. Open the Application

Open your browser and visit:

```
http://localhost:5173
```

Log in using your **PayPal Sandbox Personal Account**.

---

# Project Structure

## Frontend

```
src/
├── pages/
│   ├── Login.jsx
│   ├── AuthSuccess.jsx
│   ├── Home.jsx
│   ├── Stocks.jsx
│   ├── ForeignExchange.jsx
│   ├── PreciousMetals.jsx
│   └── Crypto.jsx
│
├── components/
│   ├── Sidebar.jsx
│   ├── PageShell.jsx
│   └── PageHeader.jsx
│
├── styles/
│   ├── global.css
│   └── tokens.css
│
└── utils/
    └── auth.js
```

### Notes

- Implement only your assigned investment page.
- Shared components should not be modified without informing the team.
- Login, navigation, and route protection are already configured.
- No signup page is required. PayPal handles both new and returning users.

---

## Backend

```
app/
├── routes/
│   ├── auth.py
│   ├── stocks.py
│   ├── fx.py
│   ├── metals.py
│   └── crypto.py
│
└── __init__.py

run.py
```

### Notes

- `auth.py` contains the PayPal authentication routes.
- Each member should implement only their assigned investment route.
- The backend template intentionally contains minimal business logic.

---

# PayPal Sandbox Setup

Each team member should create their own PayPal Sandbox application.

1. Sign in to the PayPal Developer Dashboard.
2. Create a Sandbox App.
3. Copy the **Client ID** and **Client Secret** into your `.env`.
4. Enable **Log in with PayPal**.
5. Set the **Return URL** to exactly match:

```
http://localhost:5000/api/auth/paypal/callback
```

> Ensure the URL matches exactly. `localhost` and `127.0.0.1` are treated as different addresses.

Use a **Sandbox Personal Account** when testing authentication.

---

# API Contract

Keep the following routes unchanged so the frontend continues to work.

### Authentication

```
GET /api/auth/paypal/login
```

Redirects the user to PayPal.

```
GET /api/auth/paypal/callback
```

Redirects back to:

```
/auth/success?paypal_name=...&paypal_email=...
```

### Investment APIs

Each investment feature should implement:

```
GET
```

```json
{
  "prices": []
}
```

```
POST
```

```json
{
  "status": "...",
  "message": "..."
}
```

---

# Docker (Optional)

Start both frontend and backend.

```bash
docker compose up --build
```

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:5000/api/health
```

> Ensure your `.env` file has been created before running Docker.

---

# Important

- Do **not** commit your `.env` file.
- Each member should use their own PayPal Sandbox credentials.
- Only implement the pages and backend routes assigned to you.