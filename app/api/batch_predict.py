from io import StringIO
import logging

import pandas as pd
from fastapi import (
    APIRouter,
    File,
    HTTPException,
    UploadFile,
)

from app.batch_predictor import predict_batch
from app.csv_validator import validate_csv_columns

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/batch",
    tags=["Batch Prediction"],
)


@router.post(
    "/predict",
    summary="Batch Credit Risk Prediction",
)
async def batch_prediction(
    file: UploadFile = File(...)
):
    """
    Upload a CSV file and receive batch predictions.
    """

    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="No file was uploaded.",
        )

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

        # Validate required columns
        validate_csv_columns(df)

        results = predict_batch(df)

        return {
            "rows": len(results),
            "results": results.to_dict(
                orient="records"
            ),
        }

    except HTTPException:
        raise

    except ValueError as exc:
        raise HTTPException(
            status_code=400,
            detail=str(exc),
        )

    except UnicodeDecodeError:
        raise HTTPException(
            status_code=400,
            detail="The uploaded file is not a valid UTF-8 CSV.",
        )

    except pd.errors.EmptyDataError:
        raise HTTPException(
            status_code=400,
            detail="The uploaded CSV file is empty.",
        )

    except pd.errors.ParserError:
        raise HTTPException(
            status_code=400,
            detail="Unable to parse the CSV file.",
        )

    except Exception:
        logger.exception(
            "Unexpected error during batch prediction."
        )

        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred while processing the batch prediction.",
        )