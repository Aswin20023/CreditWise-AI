import sqlite3

DATABASE = "creditwise.db"


def get_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


def create_tables():
    conn = get_connection()

    conn.execute("""
    CREATE TABLE IF NOT EXISTS predictions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,

        limit_bal REAL,
        age INTEGER,
        education INTEGER,
        marriage INTEGER,

        prediction INTEGER,
        probability_default REAL,
        probability_no_default REAL
    )
    """)

    conn.commit()
    conn.close()


def save_prediction(customer, result):
    conn = get_connection()

    conn.execute(
        """
        INSERT INTO predictions
        (
            limit_bal,
            age,
            education,
            marriage,
            prediction,
            probability_default,
            probability_no_default
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        (
            customer["LIMIT_BAL"],
            customer["AGE"],
            customer["EDUCATION"],
            customer["MARRIAGE"],
            result["prediction"],
            result["probability_default"],
            result["probability_no_default"],
        ),
    )

    conn.commit()
    conn.close()


def get_predictions():
    conn = get_connection()

    rows = conn.execute(
        """
        SELECT *
        FROM predictions
        ORDER BY timestamp DESC
        """
    ).fetchall()

    conn.close()

    return [dict(row) for row in rows]


# -------------------------------------------------
# Delete a single prediction
# -------------------------------------------------
def delete_prediction(prediction_id: int):
    conn = get_connection()

    conn.execute(
        """
        DELETE FROM predictions
        WHERE id = ?
        """,
        (prediction_id,),
    )

    conn.commit()
    conn.close()


# -------------------------------------------------
# Clear entire prediction history
# -------------------------------------------------
def clear_history():
    conn = get_connection()

    conn.execute("DELETE FROM predictions")

    conn.commit()
    conn.close()
# -------------------------------------------------
# Dashboard Statistics
# -------------------------------------------------

def get_dashboard_stats():
    conn = get_connection()

    total_predictions = conn.execute("""
        SELECT COUNT(*) FROM predictions
    """).fetchone()[0]

    high_risk = conn.execute("""
        SELECT COUNT(*)
        FROM predictions
        WHERE probability_default >= 0.70
    """).fetchone()[0]

    medium_risk = conn.execute("""
        SELECT COUNT(*)
        FROM predictions
        WHERE probability_default >= 0.40
          AND probability_default < 0.70
    """).fetchone()[0]

    low_risk = conn.execute("""
        SELECT COUNT(*)
        FROM predictions
        WHERE probability_default < 0.40
    """).fetchone()[0]

    average_probability = conn.execute("""
        SELECT AVG(probability_default)
        FROM predictions
    """).fetchone()[0]

    average_limit = conn.execute("""
        SELECT AVG(limit_bal)
        FROM predictions
    """).fetchone()[0]

    conn.close()

    return {
        "total_predictions": total_predictions,
        "high_risk": high_risk,
        "medium_risk": medium_risk,
        "low_risk": low_risk,
        "average_probability": round((average_probability or 0) * 100, 2),
        "average_limit": round(average_limit or 0, 2),
    }


# -------------------------------------------------
# Risk Distribution
# -------------------------------------------------

def get_risk_distribution():
    conn = get_connection()

    rows = conn.execute("""
        SELECT
            CASE
                WHEN probability_default >= 0.70 THEN 'High'
                WHEN probability_default >= 0.40 THEN 'Medium'
                ELSE 'Low'
            END AS risk,
            COUNT(*) AS count
        FROM predictions
        GROUP BY risk
    """).fetchall()

    conn.close()

    return [dict(row) for row in rows]


# -------------------------------------------------
# Recent Predictions
# -------------------------------------------------

def get_recent_predictions(limit=10):
    conn = get_connection()

    rows = conn.execute("""
        SELECT *
        FROM predictions
        ORDER BY timestamp DESC
        LIMIT ?
    """, (limit,)).fetchall()

    conn.close()

    return [dict(row) for row in rows]