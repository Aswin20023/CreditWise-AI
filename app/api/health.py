from datetime import datetime

from fastapi import APIRouter

router = APIRouter(
    tags=["Health"]
)


@router.get(
    "/health",
    summary="API Health Check"
)
def health():

    return {
        "status": "healthy",
        "api": "CreditWise AI",
        "version": "1.0.0",
        "timestamp": datetime.utcnow().isoformat() + "Z",
    }