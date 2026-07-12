"""
Precious Metals routes — owned by whoever is building the metals page.

TODO: replace MOCK_PRICES with a live metals API call (e.g. Metals API), and
wire /buy into PayPal. Prices are quoted in USD per troy ounce; convert to SGD
using either a live FX rate or the fixed 1.275 rate before charging.
"""
from flask import Blueprint, jsonify, request

metals_bp = Blueprint("metals", __name__)

MOCK_PRICES = [
    {"metal": "Platinum", "price_usd_oz": 985.20},
    {"metal": "Gold", "price_usd_oz": 2412.50},
    {"metal": "Silver", "price_usd_oz": 28.75},
]

USD_SGD_FIXED_RATE = 1.275


@metals_bp.get("/prices")
def prices():
    # TODO: call your precious metals data API here instead of mock data.
    return jsonify(prices=MOCK_PRICES, fx_rate_usd_sgd=USD_SGD_FIXED_RATE)


@metals_bp.post("/buy")
def buy():
    data = request.get_json(silent=True) or {}
    metal = data.get("metal")
    quantity_oz = data.get("quantity_oz")

    # TODO: convert to SGD, call PayPal to move funds, then confirm the trade.
    return jsonify(
        status="mock_success",
        message=f"(placeholder) would buy {quantity_oz} oz of {metal}",
    )
