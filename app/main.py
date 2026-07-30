from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import create_tables

# API Routers
from app.api.predict import router as predict_router
from app.api.history import router as history_router
from app.api.health import router as health_router
from app.api.model_info import router as model_info_router
from app.api.explain import router as explain_router
from app.api.dashboard import router as dashboard_router
from app.api.batch_predict import router as batch_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Initialize application resources.
    """
    create_tables()
    yield


app = FastAPI(
    title="CreditWise AI",
    version="1.0.0",
    description="AI-powered Credit Risk Prediction & Explainability API",
    lifespan=lifespan,
)


# -------------------------------------------------
# CORS Configuration
# -------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -------------------------------------------------
# Root Endpoint
# -------------------------------------------------
@app.get(
    "/",
    tags=["Home"],
    summary="API Home",
)
def home():
    return {
        "message": "CreditWise AI API is running",
        "version": "1.0.0",
        "status": "healthy",
        "docs": "/docs",
    }


# -------------------------------------------------
# Register Routers
# -------------------------------------------------
app.include_router(predict_router)
app.include_router(history_router)
app.include_router(health_router)
app.include_router(model_info_router)
app.include_router(explain_router)
app.include_router(dashboard_router)
app.include_router(batch_router)