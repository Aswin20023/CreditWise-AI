import pandas as pd
from fastapi import APIRouter

from app.schemas import CustomerData, ExplainResponse
from app.predictor import model, predict_customer
from src.explainability.shap_analysis import SHAPExplainer

router = APIRouter(
    tags=["Explainability"]
)

# Create the SHAP explainer once when the API starts
explainer = SHAPExplainer(model)


@router.post(
    "/explain",
    response_model=ExplainResponse,
    summary="Explain Prediction"
)
def explain(data: CustomerData):

    # Convert request to dictionary
    customer = data.dict()

    # Get prediction from existing prediction logic
    prediction = predict_customer(customer.copy())

    # Feature Engineering (must match predictor.py)
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

    customer["avg_bill_amount"] = (
        sum(customer[col] for col in bill_cols) / len(bill_cols)
    )

    customer["avg_payment_amount"] = (
        sum(customer[col] for col in payment_cols) / len(payment_cols)
    )

    input_df = pd.DataFrame([customer])

    # Generate SHAP explanation
    top_features = explainer.explain(input_df)

    return {
        **prediction,
        "top_features": top_features,
    }