from flask import Blueprint, jsonify, request

crypto_bp = Blueprint("crypto", __name__)

MOCK_PRICES = [
    {"symbol": "BTC", "name": "Bitcoin", "price_usd": 61250.30},
    {"symbol": "ETH", "name": "Ethereum", "price_usd": 3405.10},
    {"symbol": "XRP", "name": "XRP", "price_usd": 0.62},
]

USD_SGD_FIXED_RATE = 1.275


@crypto_bp.get("/prices")
def prices():
    return jsonify(prices=MOCK_PRICES, fx_rate_usd_sgd=USD_SGD_FIXED_RATE)


@crypto_bp.post("/buy")
def buy():
    data = request.get_json(silent=True) or {}
    symbol = data.get("symbol")
    quantity = data.get("quantity")

    return jsonify(
        status="mock_success",
        message=f"(placeholder) would buy {quantity} of {symbol}",
    )
