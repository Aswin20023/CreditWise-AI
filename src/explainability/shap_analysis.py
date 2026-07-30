import shap
import pandas as pd


class SHAPExplainer:
    """
    Generates SHAP explanations for tree-based models.
    """

    def __init__(self, model):
        self.model = model
        self.explainer = shap.TreeExplainer(model)

    def explain(self, input_df: pd.DataFrame, top_n: int = 5):
        """
        Explain a single prediction.

        Parameters
        ----------
        input_df : pd.DataFrame
            Customer features.

        top_n : int
            Number of important features to return.

        Returns
        -------
        List[dict]
        """

        # SHAP values
        shap_values = self.explainer.shap_values(input_df)

        # Random Forest binary classifier
        if isinstance(shap_values, list):
            values = shap_values[1][0]
        else:
            values = shap_values[0]

        feature_names = input_df.columns.tolist()

        feature_values = input_df.iloc[0].tolist()

        explanation = []

        for feature, value, impact in zip(
            feature_names,
            feature_values,
            values,
        ):
            explanation.append(
                {
                    "feature": feature,
                    "value": float(value),
                    "impact": float(impact),
                }
            )

        explanation.sort(
            key=lambda x: abs(x["impact"]),
            reverse=True,
        )

        return explanation[:top_n]