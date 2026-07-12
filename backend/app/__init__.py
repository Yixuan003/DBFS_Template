import os
from dotenv import load_dotenv

load_dotenv()

from flask import Flask, jsonify
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    CORS(app)  # open for local dev; tighten this before anyone deploys it

    # Each teammate owns one blueprint below. Add your Open Banking API calls
    # inside your own routes/<file>.py — nothing else needs to change.
    from app.routes.auth import auth_bp
    from app.routes.stocks import stocks_bp
    from app.routes.fx import fx_bp
    from app.routes.metals import metals_bp
    from app.routes.crypto import crypto_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(stocks_bp, url_prefix="/api/stocks")
    app.register_blueprint(fx_bp, url_prefix="/api/fx")
    app.register_blueprint(metals_bp, url_prefix="/api/metals")
    app.register_blueprint(crypto_bp, url_prefix="/api/crypto")

    @app.get("/api/health")
    def health():
        return jsonify(status="ok", service="straits-fx-backend")

    return app