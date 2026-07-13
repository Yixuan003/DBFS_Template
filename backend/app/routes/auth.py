import os
import requests
from flask import Blueprint, request, redirect

auth_bp = Blueprint("auth", __name__)

# Environment Variables
PAYPAL_API_BASE = os.getenv(
    "PAYPAL_API_BASE",
    "https://api-m.sandbox.paypal.com"
)
PAYPAL_WEB_BASE = "https://www.sandbox.paypal.com"

PAYPAL_CLIENT_ID = os.getenv("PAYPAL_CLIENT_ID")
PAYPAL_CLIENT_SECRET = os.getenv("PAYPAL_CLIENT_SECRET")
PAYPAL_REDIRECT_URI = os.getenv("PAYPAL_REDIRECT_URI")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")


@auth_bp.get("/paypal/login")
def paypal_login():
    """
    Redirect user to PayPal OAuth login.
    """

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
    """
    Handle PayPal OAuth callback.
    Exchange authorization code for an access token,
    then retrieve the user's profile.
    """

    code = request.args.get("code")

    if not code:
        return redirect(f"{FRONTEND_URL}/login?paypal_error=missing_code")

    token_response = requests.post(
        f"{PAYPAL_API_BASE}/v1/oauth2/token",
        auth=(PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET),
        headers={
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data={
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": PAYPAL_REDIRECT_URI,
        },
    )

    if token_response.status_code != 200:
        return redirect(
            f"{FRONTEND_URL}/login?paypal_error=token_exchange_failed"
        )

    access_token = token_response.json().get("access_token")

    profile_response = requests.get(
        f"{PAYPAL_API_BASE}/v1/identity/openidconnect/userinfo",
        params={"schema": "openid"},
        headers={
            "Authorization": f"Bearer {access_token}"
        },
    )

    if profile_response.status_code != 200:
        return redirect(
            f"{FRONTEND_URL}/login?paypal_error=profile_fetch_failed"
        )

    user = profile_response.json()

    return redirect(
        f"{FRONTEND_URL}/auth/success"
        f"?paypal_name={user.get('name', '')}"
        f"&paypal_email={user.get('email', '')}"
    )