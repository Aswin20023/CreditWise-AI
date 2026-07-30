import joblib


def load_model(filepath="models/random_forest_model.pkl"):
    """
    Load a saved machine learning model.
    """

    model = joblib.load(filepath)

    print(f"Model loaded from: {filepath}")

    return model