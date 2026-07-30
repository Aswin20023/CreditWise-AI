"""
Random Forest model for CreditWise AI
"""

from sklearn.ensemble import RandomForestClassifier


def train_random_forest(X_train, y_train):
    """
    Train a Random Forest classifier.
    """

    model = RandomForestClassifier(
        n_estimators=200,
        max_depth=10,
        random_state=42,
        n_jobs=-1,
        class_weight="balanced"
    )

    model.fit(X_train, y_train)

    return model