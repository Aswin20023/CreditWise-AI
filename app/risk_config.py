"""
Centralized risk configuration.

Every prediction and risk label in the application
must use these thresholds.
"""

# Probability thresholds

DEFAULT_THRESHOLD = 0.40

HIGH_RISK_THRESHOLD = 0.70
MEDIUM_RISK_THRESHOLD = 0.40


def get_prediction(probability: float) -> int:
    """
    Returns:

    1 = Default
    0 = Safe
    """

    return int(probability >= DEFAULT_THRESHOLD)


def get_prediction_label(probability: float) -> str:
    """
    Human-readable prediction.
    """

    return (
        "Default"
        if probability >= DEFAULT_THRESHOLD
        else "Safe"
    )


def get_risk(probability: float) -> str:
    """
    Human-readable risk level.
    """

    if probability >= HIGH_RISK_THRESHOLD:
        return "High"

    if probability >= MEDIUM_RISK_THRESHOLD:
        return "Medium"

    return "Low"