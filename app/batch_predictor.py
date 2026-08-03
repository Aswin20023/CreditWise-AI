import pandas as pd

from app.predictor import model
from app.risk_config import get_risk
from src.models.predict import predict_default
from src.preprocessing.feature_engineering import (
    add_engineered_features,
)


def predict_batch(df: pd.DataFrame) -> pd.DataFrame:
    """
    Predict credit default risk for multiple customers.

    Parameters
    ----------
    df : pandas.DataFrame
        Customer records.

    Returns
    -------
    pandas.DataFrame
        Original data with prediction results.
    """

    # Feature Engineering
    result = add_engineered_features(df)

    # Prediction
    predictions, probabilities = predict_default(
        model,
        result,
    )

    result["prediction"] = predictions

    probability_default = probabilities[:, 1]

    result["risk"] = [
        get_risk(probability)
        for probability in probability_default
    ]

    result["probability_default"] = (
        pd.Series(probability_default)
        .mul(100)
        .round(2)
    )

    result["probability_no_default"] = (
        pd.Series(probabilities[:, 0])
        .mul(100)
        .round(2)
    )

    return result