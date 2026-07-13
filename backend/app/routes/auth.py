import os
import requests
from flask import Blueprint, jsonify, request, redirect

auth_bp = Blueprint("auth", __name__)

PAYPAL_API_BASE = os.environ.get("PAYPAL_API_BASE", "https://api-m.sandbox.paypal.com")
PAYPAL_WEB_BASE = "https://www.sandbox.paypal.com"
PAYPAL_CLIENT_ID = os.environ.get("PAYPAL_CLIENT_ID")
PAYPAL_CLIENT_SECRET = os.environ.get("PAYPAL_CLIENT_SECRET")
PAYPAL_REDIRECT_URI = os.environ.get("PAYPAL_REDIRECT_URI")
FRONTEND_URL = os.environ.get("FRONTEND_URL", "http://localhost:5173")


@auth_bp.get("/paypal/login")
def paypal_login():
    """Sends the browser to PayPal's consent screen."""
    authorize_url = (
        f"{PAYPAL_WEB_BASE}/connect"
        f"?flowEntry=static"
        f"&client_id={PAYPAL_CLIENT_ID}"
        f"&response_type=code"
        f"&scope=openid profile email"
        f"&redirect_uri={PAYPAL_REDIRECT_URI}"
    )
    return redirect(authorize_url)


@auth_bp.get("/paypal/callback")
def paypal_callback():
    """PayPal redirects here after the user logs in and approves."""
    code = request.args.get("code")
    if not code:
        return redirect(f"{FRONTEND_URL}/login?paypal_error=missing_code")

    token_res = requests.post(
        f"{PAYPAL_API_BASE}/v1/oauth2/token",
        auth=(PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET),
        headers={"Content-Type": "application/x-www-form-urlencoded"},
        data={
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": PAYPAL_REDIRECT_URI,
        },
    )
    if token_res.status_code != 200:
        return redirect(f"{FRONTEND_URL}/login?paypal_error=token_exchange_failed")

    access_token = token_res.json().get("access_token")

    profile_res = requests.get(
        f"{PAYPAL_API_BASE}/v1/identity/openidconnect/userinfo",
        params={"schema": "openid"},
        headers={"Authorization": f"Bearer {access_token}"},
    )
    if profile_res.status_code != 200:
        return redirect(f"{FRONTEND_URL}/login?paypal_error=profile_fetch_failed")

    profile = profile_res.json()
    return redirect(
        f"{FRONTEND_URL}/home"
        f"?paypal_name={profile.get('name', '')}"
        f"&paypal_email={profile.get('email', '')}"
    )


@auth_bp.post("/login")
def login():
    data = request.get_json(silent=True) or {}
    email = data.get("email", "")
    return jsonify(token="mock-token-123", user={"email": email, "name": "New Customer"})


@auth_bp.post("/signup")
def signup():
    data = request.get_json(silent=True) or {}
    name = data.get("name", "New Customer")
    email = data.get("email", "")
    return jsonify(token="mock-token-123", user={"name": name, "email": email})