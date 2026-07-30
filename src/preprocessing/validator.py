"""
validator.py

Module for validating datasets before preprocessing.
"""

import pandas as pd


def validate_dataset(df: pd.DataFrame) -> dict:
    """
    Validate the dataset and return a validation report.

    Parameters
    ----------
    df : pd.DataFrame
        Input dataset.

    Returns
    -------
    dict
        Validation report.
    """

    report = {
        "rows": df.shape[0],
        "columns": df.shape[1],
        "missing_values": int(df.isnull().sum().sum()),
        "duplicate_rows": int(df.duplicated().sum()),
        "is_empty": df.empty,
        "target_column_exists": "default.payment.next.month" in df.columns,
        "dataset_valid": True
    }

    # Validation checks
    if report["is_empty"]:
        report["dataset_valid"] = False

    if not report["target_column_exists"]:
        report["dataset_valid"] = False

    return report