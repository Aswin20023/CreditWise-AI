"""
cleaner.py

Module for cleaning the dataset before feature engineering.
"""

import pandas as pd


def clean_dataset(df: pd.DataFrame) -> pd.DataFrame:
    """
    Clean the dataset.

    Parameters
    ----------
    df : pd.DataFrame

    Returns
    -------
    pd.DataFrame
    """

    cleaned_df = df.copy()

    # Remove ID column
    if "ID" in cleaned_df.columns:
        cleaned_df.drop(columns=["ID"], inplace=True)

    return cleaned_df