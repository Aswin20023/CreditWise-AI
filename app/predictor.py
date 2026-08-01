import pandas as pd

from src.models.load_model import load_model
from src.models.predict import predict_default
from src.explainability.shap_analysis import SHAPExplainer

from app.config import MODEL_PATH

# Load model once when the application starts
model = load_model(MODEL_PATH)

# Initialize SHAP explainer
explainer = SHAPExplainer(model)


def predict_customer(input_data: dict):
    """
    Predict credit default risk for a single customer.
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

    # Feature Engineering
    input_data["avg_bill_amount"] = (
        sum(input_data[col] for col in bill_cols)
        / len(bill_cols)
    )

    input_data["avg_payment_amount"] = (
        sum(input_data[col] for col in payment_cols)
        / len(payment_cols)
    )

    # Convert to DataFrame
    input_df = pd.DataFrame([input_data])

    # Prediction
    prediction, probability = predict_default(
        model,
        input_df,
    )

    # SHAP Explanation
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