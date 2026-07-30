from fastapi import APIRouter

from app.schemas import CustomerData, PredictionResponse
from app.predictor import predict_customer
from app.database import save_prediction

router = APIRouter(
    prefix="",
    tags=["Prediction"],
)


@router.post(
    "/predict",
    response_model=PredictionResponse,
    summary="Predict Customer Credit Risk",
    description="Predict whether a customer is likely to default on credit card payments.",
)
def predict(data: CustomerData):

    # Convert Pydantic model to dictionary
    customer = data.dict()

    # Run prediction
    result = predict_customer(customer)

    # Save prediction to database
    save_prediction(customer, result)

    # Return prediction response
    return result