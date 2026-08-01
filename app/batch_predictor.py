import pandas as pd

from src.models.predict import predict_default
from app.predictor import model


def predict_batch(df: pd.DataFrame):
    """
    Predict credit default risk for multiple customers.
    Returns probabilities as percentages while calculating
    risk using the original probability values.
    """

    bill_cols = [
        "BILL_AMT1",
        "BILL_AMT2",
        "BILL_AMT3",
        "BILL_AMT4",
        "BILL_AMT5",
        "BILL_AMT6",
    ]

    payment_cols = [
        "PAY_AMT1",
        "PAY_AMT2",
        "PAY_AMT3",
        "PAY_AMT4",
        "PAY_AMT5",
        "PAY_AMT6",
    ]

    result = df.copy()

    # Feature Engineering
    result["avg_bill_amount"] = result[bill_cols].mean(axis=1)
    result["avg_payment_amount"] = result[payment_cols].mean(axis=1)

    # Prediction
    predictions, probabilities = predict_default(model, result)

    result["prediction"] = predictions

    # Keep original probabilities (0-1) for risk calculation
    probability_default = probabilities[:, 1]

    # Risk Classification
    result["risk"] = pd.Series(probability_default).apply(
        lambda x: (
            "High"
            if x >= 0.70
            else "Medium"
            if x >= 0.40
            else "Low"
        )
    )

    # Return probability as percentage (0-100)
    result["probability_default"] = (
        pd.Series(probability_default) * 100
    ).round(2)

    return result