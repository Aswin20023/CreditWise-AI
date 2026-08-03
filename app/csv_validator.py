from app.schemas import CustomerData

REQUIRED_COLUMNS = list(
    CustomerData.model_fields.keys()
)


def validate_csv_columns(df):
    """
    Validate that the uploaded CSV contains
    every required column.
    """

    missing = [
        column
        for column in REQUIRED_COLUMNS
        if column not in df.columns
    ]

    if missing:
        raise ValueError(
            "Missing required columns: "
            + ", ".join(missing)
        )