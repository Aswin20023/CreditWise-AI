# CreditWise AI

<p align="center">

# AI-Powered Credit Risk Intelligence Platform

Predict customer credit default risk using Machine Learning, explain predictions with SHAP, and analyze entire customer portfolios through an interactive analytics dashboard.

</p>

---

## Overview

CreditWise AI is an end-to-end machine learning application that predicts the probability of customer credit default using a Random Forest classifier.

The platform combines predictive analytics, explainable AI, portfolio-level risk assessment, and interactive visualizations to help financial institutions evaluate customer creditworthiness.

The application consists of a React frontend, FastAPI backend, and Scikit-learn machine learning pipeline.

---

# Key Features

### Credit Risk Prediction

- Individual customer prediction
- Default probability estimation
- Risk categorization (Low / Medium / High)

---

### Batch Portfolio Analysis

- Upload CSV files
- Analyze thousands of customers
- Portfolio-level risk distribution
- Export results

---

### Explainable AI

- SHAP feature importance
- AI-generated prediction explanation
- Feature contribution visualization

---

### Analytics Dashboard

- Risk distribution
- Average probability
- Highest risk customer
- Lowest risk customer
- Predicted defaults
- Customer portfolio overview

---

### Reporting

- Export prediction results to CSV
- Export professional PDF reports

---

# System Architecture

```
                React + Vite
                     │
          REST API (Axios)
                     │
          FastAPI Backend
                     │
      Feature Engineering
                     │
     Random Forest Classifier
                     │
          SHAP Explainability
                     │
      Prediction + Analytics
```

---

# Technology Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Axios
- Recharts
- html2canvas
- jsPDF

---

## Backend

- FastAPI
- Python
- Pandas
- NumPy
- SQLite

---

## Machine Learning

- Scikit-learn
- Random Forest Classifier
- SHAP
- Joblib

---

# Machine Learning Pipeline

```
Customer Data
      │
      ▼
Feature Engineering
      │
      ▼
Random Forest Model
      │
      ▼
Prediction Probability
      │
      ├────────► Risk Classification
      │
      └────────► SHAP Explainability
```

---

# Risk Classification

| Probability | Risk |
|------------:|------|
| < 40% | Low |
| 40% – 69.99% | Medium |
| ≥ 70% | High |

---

# Screenshots

## Landing Page

![Hero](screenshots/hero.png)

---

## Customer Prediction

![Prediction](screenshots/prediction.png)

---

## Explainable AI

![Explainability](screenshots/explainability.png)

---

## Batch Prediction

![Batch](screenshots/batch-results.png)

---

## Analytics Dashboard

![Dashboard](screenshots/dashboard.png)

---

## Portfolio Analytics

![Portfolio](screenshots/portfolio.png)

---

# Folder Structure

```text
CreditWise-AI
│
├── app/                  # FastAPI backend
├── frontend-react/       # React frontend
├── models/               # Trained ML models
├── notebooks/            # Model development
├── src/                  # ML pipeline
├── data/                 # Datasets
├── reports/              # Generated reports
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/Aswin20023/CreditWise-AI.git

cd CreditWise-AI
```

---

## Backend

```bash
pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend URL

```
http://localhost:8000
```

Swagger

```
http://localhost:8000/docs
```

---

## Frontend

```bash
cd frontend-react

npm install

npm run dev
```

Frontend URL

```
http://localhost:5173
```

---

# API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/predict` | Single customer prediction |
| POST | `/batch/predict` | Batch CSV prediction |
| POST | `/explain` | SHAP explainability |
| GET | `/dashboard` | Dashboard analytics |
| GET | `/history` | Prediction history |
| GET | `/health` | API health |

---

# Project Highlights

- End-to-end Machine Learning system
- Explainable AI using SHAP
- Interactive analytics dashboard
- Portfolio-level risk assessment
- Batch prediction using CSV
- Professional PDF reporting
- RESTful FastAPI backend
- Modern React frontend
- Responsive UI
- Production-ready architecture

---

# Future Improvements

- User authentication
- PostgreSQL support
- Docker deployment
- CI/CD pipeline
- Automated model retraining
- Cloud storage integration
- Model monitoring
- Multi-model comparison

---

# Author

## Aswin A Manchakkal

GitHub

https://github.com/Aswin20023

---

# License

This project is intended for educational, research, and portfolio purposes.
