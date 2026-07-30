from fastapi import APIRouter

router = APIRouter(
    tags=["Model Information"]
)


@router.get(
    "/model-info",
    summary="Get Model Information"
)
def model_info():

    return {
        "model_name": "Random Forest Classifier",
        "version": "1.0.0",
        "framework": "Scikit-Learn",
        "target": "Default Payment",
        "features": 25,
        "prediction_type": "Binary Classification",
        "status": "Loaded"
    }