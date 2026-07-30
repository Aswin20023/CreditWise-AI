"""
loader.py

Module for loading datasets used in the CreditWise AI project.
"""

from pathlib import Path
import pandas as pd


def load_dataset(file_path: str) -> pd.DataFrame:
    """
    Load a dataset from a CSV file.

    Args:
        file_path (str): Path to the CSV file.

    Returns:
        pd.DataFrame: Loaded dataset.

    Raises:
        FileNotFoundError: If the file does not exist.
        ValueError: If the dataset is empty.
    """

    path = Path(file_path)

    if not path.exists():
        raise FileNotFoundError(f"File not found: {path}")

    df = pd.read_csv(path)

    if df.empty:
        raise ValueError("The dataset is empty.")

    return df