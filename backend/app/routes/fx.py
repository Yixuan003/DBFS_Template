"""
Foreign Exchange routes — owned by whoever is building the FX page.

TODO: replace MOCK_RATES with a live FX API call, and wire /buy into PayPal.
"""
from flask import Blueprint, jsonify, request

fx_bp = Blueprint("fx", __name__)

MOCK_RATES = [
    {"pair": "EUR/SGD", "rate": 1.462},
    {"pair": "GBP/SGD", "rate": 1.706},
    {"pair": "USD/SGD", "rate": 1.275},
]


@fx_bp.get("/rates")
def rates():
    # TODO: call your FX data API here instead of returning mock data.
    return jsonify(rates=MOCK_RATES)


@fx_bp.post("/buy")
def buy():
    data = request.get_json(silent=True) or {}
    pair = data.get("pair")
    amount = data.get("amount")

    # TODO: call PayPal to move funds, then confirm the conversion.
    return jsonify(
        status="mock_success",
        message=f"(placeholder) would buy {amount} of {pair}",
    )
