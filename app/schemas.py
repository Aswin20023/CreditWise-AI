from pydantic import BaseModel
from typing import List


class CustomerData(BaseModel):
    LIMIT_BAL: float
    SEX: int
    EDUCATION: int
    MARRIAGE: int
    AGE: int

    PAY_0: int
    PAY_2: int
    PAY_3: int
    PAY_4: int
    PAY_5: int
    PAY_6: int

    BILL_AMT1: float
    BILL_AMT2: float
    BILL_AMT3: float
    BILL_AMT4: float
    BILL_AMT5: float
    BILL_AMT6: float

    PAY_AMT1: float
    PAY_AMT2: float
    PAY_AMT3: float
    PAY_AMT4: float
    PAY_AMT5: float
    PAY_AMT6: float


class FeatureExplanation(BaseModel):
    feature: str
    value: float
    impact: float


class PredictionResponse(BaseModel):
    prediction: int
    probability_default: float
    probability_no_default: float
    summary: str
    top_features: List[FeatureExplanation]


class ExplainResponse(BaseModel):
    prediction: int
    probability_default: float
    probability_no_default: float
    summary: str
    top_features: List[FeatureExplanation]