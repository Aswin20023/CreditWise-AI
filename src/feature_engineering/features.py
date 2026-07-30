"""
features.py

Feature engineering module for CreditWise AI.
"""

import pandas as pd
import numpy as np


def create_average_bill(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()

    bill_columns = [
        "BILL_AMT1",
        "BILL_AMT2",
        "BILL_AMT3",
        "BILL_AMT4",
        "BILL_AMT5",
        "BILL_AMT6",
    ]

    df["avg_bill_amount"] = df[bill_columns].mean(axis=1)

    return df

def create_average_payment(df: pd.DataFrame) -> pd.DataFrame:
    """
    Create average payment amount feature.
    """

    df = df.copy()

    payment_columns = [
        "PAY_AMT1",
        "PAY_AMT2",
        "PAY_AMT3",
        "PAY_AMT4",
        "PAY_AMT5",
        "PAY_AMT6",
    ]

    df["avg_payment_amount"] = df[payment_columns].mean(axis=1)

    return df