from fastapi import APIRouter, HTTPException

from app.database import (
    get_predictions,
    delete_prediction,
    clear_history,
)

router = APIRouter(tags=["History"])


# -------------------------------------------------
# Get Prediction History
# -------------------------------------------------
@router.get("/history")
def history():
    return get_predictions()


# -------------------------------------------------
# Delete One Prediction
# -------------------------------------------------
@router.delete("/history/{prediction_id}")
def delete_prediction_api(prediction_id: int):

    history = get_predictions()

    exists = any(item["id"] == prediction_id for item in history)

    if not exists:
        raise HTTPException(
            status_code=404,
            detail="Prediction not found"
        )

    delete_prediction(prediction_id)

    return {
        "success": True,
        "message": f"Prediction {prediction_id} deleted successfully."
    }


# -------------------------------------------------
# Clear All Prediction History
# -------------------------------------------------
@router.delete("/history")
def clear_history_api():

    clear_history()

    return {
        "success": True,
        "message": "Prediction history cleared successfully."
    }