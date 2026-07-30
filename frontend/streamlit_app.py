"""
=========================================================
CreditWise AI
Professional FinTech Dashboard
Version 2
=========================================================
"""

import streamlit as st
from pathlib import Path
from config import configure_page

# --------------------------------------------------------
# PAGE CONFIGURATION
# --------------------------------------------------------

configure_page()

# --------------------------------------------------------
# LOAD CSS
# --------------------------------------------------------

css_path = Path(__file__).parent / "assets" / "style.css"

if css_path.exists():
    with open(css_path) as f:
        st.markdown(
            f"<style>{f.read()}</style>",
            unsafe_allow_html=True
        )

# --------------------------------------------------------
# PAGE TITLE
# --------------------------------------------------------

st.markdown(
    """
    <h1 style='margin-bottom:0;color:#2563EB;'>
        CreditWise AI
    </h1>
    """,
    unsafe_allow_html=True
)

st.markdown(
    """
    <p style="
        color:#6B7280;
        font-size:17px;
        margin-top:-8px;
        margin-bottom:30px;
    ">
        Smart Credit Risk Intelligence Platform
    </p>
    """,
    unsafe_allow_html=True
)

# --------------------------------------------------------
# KPI CARDS
# --------------------------------------------------------

kpi1, kpi2, kpi3, kpi4 = st.columns(4)

with kpi1:
    st.metric(
        "Predictions",
        "1,248",
        "+42"
    )

with kpi2:
    st.metric(
        "Average Risk",
        "36%",
        "-3%"
    )

with kpi3:
    st.metric(
        "High Risk",
        "412",
        "+12"
    )

with kpi4:
    st.metric(
        "Model",
        "Random Forest"
    )

st.divider()

# --------------------------------------------------------
# MAIN LAYOUT
# --------------------------------------------------------

left, right = st.columns([2.2,1])

# ========================================================
# LEFT PANEL
# ========================================================

with left:

    with st.container(border=True):

        st.subheader("Customer Information")

        c1,c2 = st.columns(2)

        with c1:

            credit_limit = st.number_input(
                "Credit Limit",
                min_value=10000,
                value=200000,
                step=10000
            )

            age = st.number_input(
                "Age",
                min_value=18,
                max_value=100,
                value=30
            )

            gender = st.selectbox(
                "Gender",
                [
                    "Male",
                    "Female"
                ]
            )

        with c2:

            education = st.selectbox(
                "Education",
                [
                    "Graduate School",
                    "University",
                    "High School",
                    "Others"
                ]
            )

            marriage = st.selectbox(
                "Marital Status",
                [
                    "Married",
                    "Single",
                    "Others"
                ]
            )

    st.write("")

    with st.container(border=True):

        st.subheader("Repayment History")

        cols = st.columns(3)

        pay_options = [
            "Paid Duly",
            "No Consumption",
            "1 Month Delay",
            "2 Months Delay",
            "3 Months Delay",
            "4 Months Delay",
            "5 Months Delay",
            "6 Months Delay",
            "7 Months Delay",
            "8 Months Delay"
        ]

        with cols[0]:
            pay0 = st.selectbox("Last Month", pay_options)

            pay2 = st.selectbox("2 Months Ago", pay_options)

        with cols[1]:
            pay3 = st.selectbox("3 Months Ago", pay_options)

            pay4 = st.selectbox("4 Months Ago", pay_options)

        with cols[2]:
            pay5 = st.selectbox("5 Months Ago", pay_options)

            pay6 = st.selectbox("6 Months Ago", pay_options)

    st.write("")

    with st.container(border=True):

        st.subheader("Bill Statements")

        b1,b2,b3 = st.columns(3)

        with b1:
            bill1 = st.number_input("Bill 1",0,1000000,5000)
            bill2 = st.number_input("Bill 2",0,1000000,5000)

        with b2:
            bill3 = st.number_input("Bill 3",0,1000000,5000)
            bill4 = st.number_input("Bill 4",0,1000000,5000)

        with b3:
            bill5 = st.number_input("Bill 5",0,1000000,5000)
            bill6 = st.number_input("Bill 6",0,1000000,5000)

    st.write("")

    with st.container(border=True):

        st.subheader("Previous Payments")

        p1,p2,p3 = st.columns(3)

        with p1:
            pay_amt1 = st.number_input("Payment 1",0,1000000,2000)
            pay_amt2 = st.number_input("Payment 2",0,1000000,2000)

        with p2:
            pay_amt3 = st.number_input("Payment 3",0,1000000,2000)
            pay_amt4 = st.number_input("Payment 4",0,1000000,2000)

        with p3:
            pay_amt5 = st.number_input("Payment 5",0,1000000,2000)
            pay_amt6 = st.number_input("Payment 6",0,1000000,2000)

# ========================================================
# RIGHT PANEL
# ========================================================

with right:

    with st.container(border=True):

        st.subheader("AI Credit Analysis")

        st.metric(
            "Risk Score",
            "--"
        )

        st.progress(0)

        st.info(
            "Fill in customer details and click "
            "'Analyze Customer' to generate an AI prediction."
        )

st.write("")

st.button(
    "Analyze Customer",
    use_container_width=True,
    type="primary"
)