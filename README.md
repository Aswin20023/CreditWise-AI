# CreditWise AI

<p align="center">

### AI-Powered Alternative Credit Scoring System

Predict customer credit risk using Machine Learning with interactive analytics, explainable insights, and batch portfolio analysis.

</p>

---

# Overview

CreditWise AI is an end-to-end Machine Learning application that predicts customer credit default risk using a Random Forest model.

The system provides both single customer prediction and batch portfolio analysis through an interactive React dashboard powered by a FastAPI backend.

---

# Features

- Individual Credit Risk Prediction
- Batch CSV Prediction
- Credit Default Probability
- High / Medium / Low Risk Classification
- Interactive Analytics Dashboard
- Portfolio Risk Distribution
- Search & Filtering
- Sorting
- Pagination
- Export CSV
- Export PDF Report
- FastAPI REST API
- Responsive React UI

---

# Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Axios
- Recharts

## Backend

- FastAPI
- Python
- SQLite
- Pandas
- NumPy

## Machine Learning

- Random Forest Classifier
- Scikit-learn
- SHAP (Explainability)

---

# Screenshots

## Hero Section

![Hero](screenshots/hero.png)

---

## Analytics Dashboard

![Dashboard](screenshots/dashboard.png)

---

## Risk Distribution

![Analytics](screenshots/analytics.png)

---

## Batch Prediction

![Batch](screenshots/batch-results.png)

---

## Portfolio Summary

![Portfolio](screenshots/portfolio.png)

---

# Folder Structure

```text
CreditWise-AI
│
├── app
├── frontend-react
├── data
├── models
├── notebooks
├── reports
├── src
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/Aswin20023/CreditWise-AI.git
```

## Backend

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Frontend

```bash
cd frontend-react
npm install
npm run dev
```

---

# API Endpoints

### Predict Customer

```
POST /predict
```

### Batch Prediction

```
POST /predict-batch
```

---

# Project Highlights

- AI-powered credit risk prediction
- Business-ready analytics dashboard
- Probability-based risk scoring
- Portfolio analysis
- Exportable reports
- Production-ready REST API

---

# Future Improvements

- User Authentication
- Model Monitoring
- Cloud Deployment
- Docker Support
- PostgreSQL
- Explainable AI Dashboard

---

# Author

### Aswin A Manchakkal

GitHub

https://github.com/Aswin20023

---

# License

This project is developed for educational and portfolio purposes.