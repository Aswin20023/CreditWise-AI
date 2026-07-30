from io import StringIO

import pandas as pd

from fastapi import APIRouter, File, HTTPException, UploadFile

from app.batch_predictor import predict_batch

router = APIRouter(
    prefix="/batch",
    tags=["Batch Prediction"],
)


@router.post("/predict")
async def batch_prediction(file: UploadFile = File(...)):
    """
    Upload a CSV file and receive batch predictions.
    """

    if not file.filename.lower().endswith(".csv"):
        raise HTTPException(
            status_code=400,
            detail="Only CSV files are supported.",
        )

    try:
        contents = await file.read()

        df = pd.read_csv(
            StringIO(contents.decode("utf-8"))
        )

        results = predict_batch(df)

        return {
            "rows": len(results),
            "results": results.to_dict(orient="records"),
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )