import logging

from fastapi import APIRouter, HTTPException

from app.schemas import (
    CustomerData,
    ExplainResponse,
)
from app.predictor import predict_customer

logger = logging.getLogger(__name__)

router = APIRouter(
    tags=["Explainability"],
)


@router.post(
    "/explain",
    response_model=ExplainResponse,
    summary="Explain Prediction",
)
def explain(data: CustomerData):
    """
    Generate a prediction together with its SHAP explanation.
    """

    try:
        customer = data.dict()

        # predict_customer() already:
        # - performs feature engineering
        # - generates SHAP values
        # - creates the AI summary
        # - returns top_features
        return predict_customer(customer)

    except HTTPException:
        raise

    except Exception:
        logger.exception(
            "Unexpected error while generating explanation."
        )

        raise HTTPException(
            status_code=500,
            detail="Unable to generate the prediction explanation.",
        )