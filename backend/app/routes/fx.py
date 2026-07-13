from flask import Blueprint, jsonify, request

fx_bp = Blueprint("fx", __name__)

MOCK_RATES = [
    {"pair": "EUR/SGD", "rate": 1.462},
    {"pair": "GBP/SGD", "rate": 1.706},
    {"pair": "USD/SGD", "rate": 1.275},
]


@fx_bp.get("/rates")
def rates():
    return jsonify(rates=MOCK_RATES)


@fx_bp.post("/buy")
def buy():
    data = request.get_json(silent=True) or {}
    pair = data.get("pair")
    amount = data.get("amount")

    return jsonify(
        status="mock_success",
        message=f"(placeholder) would buy {amount} of {pair}",
    )
