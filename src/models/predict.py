import pandas as pd


def predict_default(model, input_data):
    """
    Predict whether customer(s) will default.

    Parameters
    ----------
    model : Trained ML model

    input_data : DataFrame or dictionary

    Returns
    -------
    prediction(s), probability/probabilities
    """

    if isinstance(input_data, dict):
        input_data = pd.DataFrame([input_data])

    predictions = model.predict(input_data)

    probabilities = model.predict_proba(input_data)

    # Single customer
    if len(input_data) == 1:
        return predictions[0], probabilities[0]

    # Batch prediction
    return predictions, probabilities