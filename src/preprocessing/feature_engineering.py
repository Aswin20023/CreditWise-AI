import pandas as pd


BILL_COLUMNS = (
    "BILL_AMT1",
    "BILL_AMT2",
    "BILL_AMT3",
    "BILL_AMT4",
    "BILL_AMT5",
    "BILL_AMT6",
)

PAYMENT_COLUMNS = (
    "PAY_AMT1",
    "PAY_AMT2",
    "PAY_AMT3",
    "PAY_AMT4",
    "PAY_AMT5",
    "PAY_AMT6",
)


def add_engineered_features(df: pd.DataFrame) -> pd.DataFrame:
    """
    Add all engineered features required by the prediction model.

    Parameters
    ----------
    df : pandas.DataFrame
        Input customer data.

    Returns
    -------
    pandas.DataFrame
        Copy of the dataframe with engineered features added.
    """

    result = df.copy()

    result["avg_bill_amount"] = result.loc[:, BILL_COLUMNS].mean(axis=1)

    result["avg_payment_amount"] = result.loc[
        :, PAYMENT_COLUMNS
    ].mean(axis=1)

    return result