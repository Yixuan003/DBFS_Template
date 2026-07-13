from flask import Blueprint, jsonify, request

stocks_bp = Blueprint("stocks", __name__)

MOCK_PRICES = [
    {"symbol": "INTC", "name": "Intel Corp", "price": 23.41, "currency": "USD"},
    {"symbol": "GOOG", "name": "Alphabet Inc", "price": 178.62, "currency": "USD"},
    {"symbol": "NVDA", "name": "NVIDIA Corp", "price": 132.05, "currency": "USD"},
]

USD_SGD_FIXED_RATE = 1.275


@stocks_bp.get("/prices")
def prices():
    return jsonify(prices=MOCK_PRICES, fx_rate_usd_sgd=USD_SGD_FIXED_RATE)


@stocks_bp.post("/buy")
def buy():
    data = request.get_json(silent=True) or {}
    symbol = data.get("symbol")
    quantity = data.get("quantity")

    return jsonify(
        status="mock_success",
        message=f"(placeholder) would buy {quantity} of {symbol}",
    )
