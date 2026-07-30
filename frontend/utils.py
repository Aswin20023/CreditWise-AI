"""
====================================================
CreditWise AI Utility Functions
====================================================
Reusable helper functions for formatting,
API payload creation, validation, and styling.
====================================================
"""

from config import COLORS


# ====================================================
# FORMATTERS
# ====================================================

def format_currency(value):
    """Format a number as currency."""
    try:
        return f"₹ {float(value):,.2f}"
    except (ValueError, TypeError):
        return "₹ 0.00"


def format_percentage(value):
    """Convert decimal probability to percentage."""
    try:
        return f"{float(value) * 100:.2f}%"
    except (ValueError, TypeError):
        return "0.00%"


def round_number(value, digits=2):
    """Round a numeric value safely."""
    try:
        return round(float(value), digits)
    except (ValueError, TypeError):
        return 0


# ====================================================
# RISK HELPERS
# ====================================================

def get_risk_color(probability):
    """
    Return a color based on probability.
    Probability should be between 0 and 1.
    """

    if probability < 0.30:
        return COLORS["success"]

    elif probability < 0.70:
        return COLORS["warning"]

    return COLORS["danger"]


def get_risk_label(probability):
    """Return a human-readable risk label."""

    if probability < 0.30:
        return "Low Risk"

    elif probability < 0.70:
        return "Medium Risk"

    return "High Risk"


# ====================================================
# API PAYLOAD
# ====================================================

def create_payload(data):
    """
    Convert form values into API payload.
    """

    payload = {
        "LIMIT_BAL": data["LIMIT_BAL"],
        "SEX": data["SEX"],
        "EDUCATION": data["EDUCATION"],
        "MARRIAGE": data["MARRIAGE"],
        "AGE": data["AGE"],

        "PAY_0": data["PAY_0"],
        "PAY_2": data["PAY_2"],
        "PAY_3": data["PAY_3"],
        "PAY_4": data["PAY_4"],
        "PAY_5": data["PAY_5"],
        "PAY_6": data["PAY_6"],

        "BILL_AMT1": data["BILL_AMT1"],
        "BILL_AMT2": data["BILL_AMT2"],
        "BILL_AMT3": data["BILL_AMT3"],
        "BILL_AMT4": data["BILL_AMT4"],
        "BILL_AMT5": data["BILL_AMT5"],
        "BILL_AMT6": data["BILL_AMT6"],

        "PAY_AMT1": data["PAY_AMT1"],
        "PAY_AMT2": data["PAY_AMT2"],
        "PAY_AMT3": data["PAY_AMT3"],
        "PAY_AMT4": data["PAY_AMT4"],
        "PAY_AMT5": data["PAY_AMT5"],
        "PAY_AMT6": data["PAY_AMT6"],
    }

    return payload


# ====================================================
# RESPONSE PARSER
# ====================================================

def parse_prediction(response):
    """
    Extract values returned by FastAPI.
    """

    return {
        "prediction": response.get("prediction", 0),
        "probability_default": response.get("probability_default", 0.0),
        "probability_no_default": response.get("probability_no_default", 0.0),
    }


# ====================================================
# VALIDATION
# ====================================================

def is_positive(value):
    try:
        return float(value) >= 0
    except Exception:
        return False


def validate_age(age):
    return 18 <= age <= 100


def validate_credit_limit(limit):
    return limit > 0


# ====================================================
# RECOMMENDATION
# ====================================================

def recommendation(probability):
    """
    Return recommendation text based on prediction.
    """

    if probability < 0.30:
        return (
            "Customer has a low estimated default risk. "
            "Credit approval is generally acceptable."
        )

    elif probability < 0.70:
        return (
            "Customer presents a moderate level of risk. "
            "Additional verification is recommended."
        )

    return (
        "Customer shows a high probability of default. "
        "Careful review is recommended before approval."
    )