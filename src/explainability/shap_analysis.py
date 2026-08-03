import numpy as np
import pandas as pd
import shap


class SHAPExplainer:
    """
    Generates SHAP explanations for tree-based models.

    Compatible with both older and newer SHAP versions.
    """

    def __init__(self, model):
        self.model = model
        self.explainer = shap.TreeExplainer(model)

    def explain(
        self,
        input_df: pd.DataFrame,
        top_n: int = 5,
    ):
        """
        Explain a single prediction.

        Parameters
        ----------
        input_df : pandas.DataFrame
            Customer features.

        top_n : int
            Number of important features to return.

        Returns
        -------
        List[dict]
        """

        shap_output = self.explainer(input_df)

        # -------------------------------
        # SHAP >= 0.45 (Explanation object)
        # -------------------------------
        if hasattr(shap_output, "values"):

            values = shap_output.values

            if values.ndim == 3:
                # Binary / multiclass classifier
                values = values[0, :, 1]
            elif values.ndim == 2:
                values = values[0]
            else:
                values = np.ravel(values)

        # -------------------------------
        # Older SHAP versions
        # -------------------------------
        else:

            values = self.explainer.shap_values(input_df)

            if isinstance(values, list):
                values = values[1][0]
            else:
                values = values[0]

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
            key=lambda item: abs(item["impact"]),
            reverse=True,
        )

        return explanation[:top_n]