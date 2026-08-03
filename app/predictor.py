import pandas as pd

from app.config import MODEL_PATH
from src.explainability.shap_analysis import SHAPExplainer
from src.models.load_model import load_model
from src.models.predict import predict_default
from src.preprocessing.feature_engineering import (
    add_engineered_features,
)

# --------------------------------------------------
# Load model once when the application starts
# --------------------------------------------------

model = load_model(MODEL_PATH)

# --------------------------------------------------
# Initialize SHAP explainer once
# --------------------------------------------------

explainer = SHAPExplainer(model)


def predict_customer(input_data: dict):
    """
    Predict credit default risk for a single customer.
    """

    # Convert request to DataFrame
    input_df = pd.DataFrame([input_data])

    # Feature Engineering
    input_df = add_engineered_features(input_df)

    # Prediction
    predictions, probabilities = predict_default(
        model,
        input_df,
    )

    prediction = predictions[0]
    probability = probabilities[0]

    # SHAP explanation
    top_features = explainer.explain(input_df)

    # Human-readable summary
    if prediction == 1:
        summary = (
            "The customer has a high predicted risk of default. "
            "Recent repayment behaviour is the strongest contributor "
            "to this prediction."
        )
    else:
        summary = (
            "The customer has a low predicted risk of default. "
            "Repayment history and financial behaviour indicate "
            "relatively lower credit risk."
        )

    return {
        "prediction": int(prediction),
        "probability_default": round(float(probability[1]) * 100, 2),
        "probability_no_default": round(float(probability[0]) * 100, 2),
        "summary": summary,
        "top_features": top_features,
    }