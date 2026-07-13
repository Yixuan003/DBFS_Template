import os
from dotenv import load_dotenv

load_dotenv()

from flask import Flask, jsonify
from flask_cors import CORS


def create_app():
    app = Flask(__name__)

    CORS(app)

    from app.routes.auth import auth_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")

    @app.get("/api/health")
    def health():
        return jsonify(
            status="ok",
            service="dbfs-template-backend"
        )

    return app