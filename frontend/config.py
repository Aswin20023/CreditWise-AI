"""
====================================================
CreditWise AI Configuration
====================================================
Central configuration file for the Streamlit frontend.
Contains application settings, API configuration,
theme colors, mappings, and page configuration.
====================================================
"""

import streamlit as st

# ====================================================
# API CONFIGURATION
# ====================================================

API_URL = "http://127.0.0.1:8000/predict"

# ====================================================
# APPLICATION
# ====================================================

APP_NAME = "CreditWise AI"
APP_TITLE = "Smart Credit Risk Intelligence"
APP_VERSION = "2.0"

# ====================================================
# STREAMLIT PAGE
# ====================================================

PAGE_TITLE = APP_NAME
LAYOUT = "wide"
SIDEBAR_STATE = "expanded"

# ====================================================
# THEME COLORS
# ====================================================

COLORS = {
    "primary": "#2563EB",
    "secondary": "#3B82F6",
    "success": "#10B981",
    "warning": "#F59E0B",
    "danger": "#EF4444",
    "background": "#F5F7FB",
    "card": "#FFFFFF",
    "text": "#111827",
    "text_light": "#6B7280",
    "border": "#E5E7EB",
}

# ====================================================
# CARD SETTINGS
# ====================================================

CARD_RADIUS = 18
CARD_PADDING = 20

# ====================================================
# DROPDOWN OPTIONS
# ====================================================

SEX = {
    "Male": 1,
    "Female": 2,
}

EDUCATION = {
    "Graduate School": 1,
    "University": 2,
    "High School": 3,
    "Others": 4,
}

MARRIAGE = {
    "Married": 1,
    "Single": 2,
    "Others": 3,
}

PAY_STATUS = {
    "Paid Duly": -1,
    "No Consumption": 0,
    "1 Month Delay": 1,
    "2 Months Delay": 2,
    "3 Months Delay": 3,
    "4 Months Delay": 4,
    "5 Months Delay": 5,
    "6 Months Delay": 6,
    "7 Months Delay": 7,
    "8 Months Delay": 8,
}

# ====================================================
# RISK LABELS
# ====================================================

RISK_LEVEL = {
    0: "Low Risk",
    1: "High Risk",
}

# ====================================================
# FEATURE ORDER
# Must match the order used when training the model.
# ====================================================

MODEL_FEATURES = [
    "LIMIT_BAL",
    "SEX",
    "EDUCATION",
    "MARRIAGE",
    "AGE",
    "PAY_0",
    "PAY_2",
    "PAY_3",
    "PAY_4",
    "PAY_5",
    "PAY_6",
    "BILL_AMT1",
    "BILL_AMT2",
    "BILL_AMT3",
    "BILL_AMT4",
    "BILL_AMT5",
    "BILL_AMT6",
    "PAY_AMT1",
    "PAY_AMT2",
    "PAY_AMT3",
    "PAY_AMT4",
    "PAY_AMT5",
    "PAY_AMT6",
]

# ====================================================
# PAGE CONFIGURATION
# ====================================================

def configure_page():
    """Configure the Streamlit page."""
    st.set_page_config(
        page_title=PAGE_TITLE,
        layout=LAYOUT,
        initial_sidebar_state=SIDEBAR_STATE,
    )