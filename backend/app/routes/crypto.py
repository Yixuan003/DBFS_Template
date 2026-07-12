"""
Cryptocurrency routes — owned by whoever is building the crypto page.

TODO: replace MOCK_PRICES with a live crypto data API call (e.g. EODHD crypto
feed or a crypto exchange API), and wire /buy into PayPal.
"""
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
    # TODO: call your crypto data API here instead of returning mock data.
    return jsonify(prices=MOCK_PRICES, fx_rate_usd_sgd=USD_SGD_FIXED_RATE)


@crypto_bp.post("/buy")
def buy():
    data = request.get_json(silent=True) or {}
    symbol = data.get("symbol")
    quantity = data.get("quantity")

    # TODO: convert to SGD, call PayPal to move funds, then confirm the trade.
    return jsonify(
        status="mock_success",
        message=f"(placeholder) would buy {quantity} of {symbol}",
    )
