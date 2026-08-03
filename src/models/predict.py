from app.risk_config import get_prediction


def predict_default(model, input_data):
    """
    Predict default probability using the trained model.

    Returns
    -------
    predictions : list[int]
        1 = Default
        0 = Safe

    probabilities : ndarray
        Output from model.predict_proba().
    """

    probabilities = model.predict_proba(input_data)

    predictions = [
        get_prediction(probability[1])
        for probability in probabilities
    ]

    return predictions, probabilities