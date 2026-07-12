"""
Stocks routes — owned by whoever is building the U.S. Equities page.

TODO: replace MOCK_PRICES with a real call to your data provider (e.g. EODHD)
and wire /buy into PayPal's payment API. Keep the JSON shapes the same and the
frontend page won't need any changes.
"""
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
    # TODO: call your stock data API here instead of returning mock data.
    return jsonify(prices=MOCK_PRICES, fx_rate_usd_sgd=USD_SGD_FIXED_RATE)


@stocks_bp.post("/buy")
def buy():
    data = request.get_json(silent=True) or {}
    symbol = data.get("symbol")
    quantity = data.get("quantity")

    # TODO: convert to SGD, call PayPal to move funds, then confirm the trade.
    return jsonify(
        status="mock_success",
        message=f"(placeholder) would buy {quantity} of {symbol}",
    )
