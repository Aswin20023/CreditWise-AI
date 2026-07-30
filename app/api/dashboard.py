from fastapi import APIRouter

from app.database import (
    get_dashboard_stats,
    get_risk_distribution,
    get_recent_predictions,
)

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get("/stats")
def dashboard_stats():
    return get_dashboard_stats()


@router.get("/risk-distribution")
def risk_distribution():
    return get_risk_distribution()


@router.get("/recent")
def recent_predictions():
    return get_recent_predictions()