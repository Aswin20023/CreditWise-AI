import joblib
from pathlib import Path


def save_model(model, filepath="models/random_forest_model.pkl"):
    """
    Save a trained model to disk.
    """

    filepath = Path(filepath)

    # Create folder if it doesn't exist
    filepath.parent.mkdir(parents=True, exist_ok=True)

    joblib.dump(model, filepath)

    print(f"Model saved to: {filepath}")