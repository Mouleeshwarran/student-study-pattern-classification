# Student Study Pattern Classification System

## Overview

The **Student Study Pattern Classification System** is a machine learning-based application that analyzes students' study habits through a questionnaire and classifies them into one of four study-pattern categories.

The system collects information about study routines, revision habits, procrastination, distractions, phone and social-media usage, study planning, examination preparation, academic confidence, and study stress.

The machine learning model processes these responses and predicts the student's study pattern.

### Study Pattern Categories

The system classifies students into four categories:

1. **Consistent Learner** – Maintains a regular study routine and follows a structured learning approach.

2. **Needs Time Management** – Shows difficulties related to planning, scheduling, and completing planned study activities.

3. **Easily Distracted** – Experiences frequent distractions, particularly from phones, social media, or other interruptions during study sessions.

4. **Last-Minute Learner** – Tends to postpone academic preparation and concentrates study efforts closer to examinations or deadlines.

---

## System Architecture

```text
Student
   │
   ▼
React Questionnaire
   │
   │ Text-based answers
   ▼
Spring Boot Backend
   │
   │ Convert answers → numeric values (1–4)
   ▼
FastAPI ML Service
   │
   ▼
V2 Logistic Regression Model
   │
   ▼
Prediction + Confidence
   │
   ▼
Spring Boot Backend
   │
   ▼
React Frontend
   │
   ▼
Student Result
```

---

## Technology Stack

| Component | Technology |
|---|---|
| Programming Language | Python |
| Machine Learning | Scikit-learn |
| Data Processing | Pandas, NumPy |
| Model Serialization | Joblib |
| ML API | FastAPI |
| ASGI Server | Uvicorn |
| API Documentation | Swagger / OpenAPI |
| Frontend | React |
| Main Backend | Spring Boot |
| API Testing | Swagger UI / REST API / PowerShell |
| Version Control | Git / GitHub |

---

## Machine Learning Features

The model uses the following 12 features:

1. `study_hours`
2. `sleep_hours`
3. `revision_frequency`
4. `assignment_procrastination`
5. `study_distraction`
6. `phone_usage`
7. `social_media_hours`
8. `study_schedule`
9. `exam_preparation`
10. `planned_goals_completed`
11. `academic_confidence`
12. `study_stress`

All model input features use numeric values from **1 to 4**.

---

# Questionnaire and Feature Mapping

The frontend displays human-readable answer options.

The backend converts each selected answer into a numeric value from **1 to 4** before sending the request to the ML API.

> **Important:** These mappings must not be changed unless the model is retrained with the new encoding.

---

## 1. Study Hours

**Question:**

> How many hours do you usually study per day?

| Answer | Value |
|---|---:|
| <1 hour | 1 |
| 1–2 hours | 2 |
| 2–4 hours | 3 |
| 4+ hours | 4 |

---

## 2. Sleep Hours

**Question:**

> How many hours do you usually sleep per night?

| Answer | Value |
|---|---:|
| <5 hours | 1 |
| 5–6 hours | 2 |
| 6–8 hours | 3 |
| 8+ hours | 4 |

---

## 3. Revision Frequency

**Question:**

> How often do you revise your study material?

| Answer | Value |
|---|---:|
| Daily | 1 |
| Few times a week | 2 |
| Before exams | 3 |
| Rarely | 4 |

> **Important:** This feature uses the existing dataset encoding. `Daily = 1` and `Rarely = 4`. Do not reverse this mapping without retraining the model.

---

## 4. Assignment Procrastination

**Question:**

> How often do you postpone your assignments?

| Answer | Value |
|---|---:|
| Never | 1 |
| Sometimes | 2 |
| Often | 3 |
| Always | 4 |

---

## 5. Study Distraction

**Question:**

> How easily are you distracted while studying?

| Answer | Value |
|---|---:|
| Very difficult | 1 |
| Difficult | 2 |
| Sometimes | 3 |
| Very easily | 4 |

---

## 6. Phone Usage

**Question:**

> How often do you use your phone while studying?

| Answer | Value |
|---|---:|
| Never | 1 |
| Rarely | 2 |
| Sometimes | 3 |
| Frequently | 4 |

---

## 7. Social Media Hours

**Question:**

> How much time do you spend on social media per day?

| Answer | Value |
|---|---:|
| <1 hour | 1 |
| 1–2 hours | 2 |
| 2–4 hours | 3 |
| 4+ hours | 4 |

---

## 8. Study Schedule

**Question:**

> How consistently do you follow a study schedule?

| Answer | Value |
|---|---:|
| Never | 1 |
| Sometimes | 2 |
| Usually | 3 |
| Always | 4 |

---

## 9. Exam Preparation

**Question:**

> When do you usually start preparing for exams?

| Answer | Value |
|---|---:|
| Weeks before | 1 |
| 1 week before | 2 |
| A few days before | 3 |
| Night before | 4 |

---

## 10. Planned Goals Completed

**Question:**

> How often do you complete the study goals you plan?

| Answer | Value |
|---|---:|
| Rarely | 1 |
| Sometimes | 2 |
| Usually | 3 |
| Always | 4 |

---

## 11. Academic Confidence

**Question:**

> How confident are you about your academic performance?

| Answer | Value |
|---|---:|
| Not confident | 1 |
| Neutral | 2 |
| Confident | 3 |
| Very confident | 4 |

---

## 12. Study Stress

**Question:**

> How often do you feel stressed about your studies?

| Answer | Value |
|---|---:|
| Never | 1 |
| Rarely | 2 |
| Sometimes | 3 |
| Frequently | 4 |

---

# Dataset

The project contains an original dataset and an improved V2 dataset.

### Original Dataset

The original dataset contains approximately 1,000 student records with 12 numerical features and a target category.

### V2 Dataset

The V2 dataset contains:

```text
Samples: 1,400
Features: 12
Classes: 4
Samples per class: 350
```

The four classes are balanced in the V2 dataset:

| Class | Samples |
|---|---:|
| Consistent Learner | 350 |
| Easily Distracted | 350 |
| Last-Minute Learner | 350 |
| Needs Time Management | 350 |

The V2 dataset was designed to provide clearer behavioral separation between the study-pattern categories while retaining realistic overlap between related categories.

> **Dataset limitation:** The V2 dataset is synthetic/generated data intended for academic prototyping. It does not represent a validated sample of real-world student behavior.

---

# Model Training

The project evaluates multiple machine learning classification algorithms.

The evaluated models include:

- Logistic Regression
- Support Vector Machine (SVM)
- Random Forest
- Extra Trees
- Gradient Boosting

The V2 models were evaluated using **5-fold Stratified Cross-Validation**.

## Model Comparison

| Model | Cross-Validation Accuracy | Macro F1 |
|---|---:|---:|
| **Logistic Regression** | **85.64%** | **85.62%** |
| SVM | 84.64% | 84.60% |
| Extra Trees | 84.07% | 84.03% |
| Random Forest | 83.50% | 83.52% |
| Gradient Boosting | 82.57% | 82.54% |

### Selected Model

The V2 system uses:

```text
Logistic Regression
+
StandardScaler
+
5-fold Stratified Cross-Validation
```

The selected model achieved:

```text
Cross-Validation Accuracy: 85.64%
Macro F1 Score:             85.62%
```

---

# V2 Model Performance by Class

The V2 model was evaluated using cross-validation predictions.

| Class | Precision | Recall | F1 Score |
|---|---:|---:|---:|
| Consistent Learner | 98.86% | 99.43% | 99.15% |
| Easily Distracted | 81.14% | 81.14% | 81.14% |
| Last-Minute Learner | 81.74% | 83.14% | 82.44% |
| Needs Time Management | 80.70% | 78.86% | 79.77% |

The results show strong separation for the **Consistent Learner** category, while some overlap remains between **Easily Distracted**, **Last-Minute Learner**, and **Needs Time Management**.

---

# Model Files

The trained V2 model and supporting artifacts are:

```text
study_pattern_model_v2.joblib
feature_names_v2.joblib
class_names_v2.joblib
```

### `study_pattern_model_v2.joblib`

Contains the trained machine learning pipeline:

```text
StandardScaler
      ↓
LogisticRegression
```

### `feature_names_v2.joblib`

Contains the exact feature order expected by the model.

### `class_names_v2.joblib`

Contains the four prediction classes.

---

# Project Structure

```text
Web_programming _project/
│
├── app.py
│
├── train_model.py
├── evaluvate_models.py
├── evaluvate_detailes.py
├── evaluvate_final_model.py
│
├── test_model_v2.py
├── test_four_profiles.py
│
├── requirements.txt
│
├── study_pattern_model.joblib
├── feature_names.joblib
│
├── study_pattern_model_v2.joblib
├── feature_names_v2.joblib
├── class_names_v2.joblib
│
├── student_study_pattern_dataset.csv
├── student_study_pattern_dataset_readable.csv
├── student_study_pattern_dataset_v2.csv
├── student_study_pattern_dataset_v2_readable.xlsx
│
├── model_comparison_v2.csv
│
├── README.md
└── .gitignore
```

---

# Installation

## 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
```

Move into the project directory:

```bash
cd "Web_programming _project"
```

---

## 2. Install Python

The V2 model was created using a Python environment compatible with:

```text
Python 3.11
scikit-learn 1.8.0
```

Using the same or compatible versions is recommended when loading the Joblib model.

---

## 3. Create a Virtual Environment

Windows PowerShell:

```powershell
py -3.11 -m venv .venv311
```

---

## 4. Activate the Environment

```powershell
.\.venv311\Scripts\Activate.ps1
```

---

## 5. Install Dependencies

```powershell
python -m pip install --upgrade pip
```

Then:

```powershell
python -m pip install fastapi uvicorn pandas numpy scikit-learn==1.8.0 joblib
```

---

# Run the FastAPI ML Service

Start the API using:

```powershell
python -m uvicorn app:app --reload
```

The API will run at:

```text
http://127.0.0.1:8000
```

Interactive Swagger documentation is available at:

```text
http://127.0.0.1:8000/docs
```

---

# API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Returns API information |
| GET | `/health` | Checks API status |
| GET | `/features` | Returns model features and classes |
| POST | `/predict` | Predicts the student's study pattern |

---

# Health Check

Request:

```text
GET /health
```

Example response:

```json
{
  "status": "ok",
  "model": "study_pattern_model_v2",
  "version": "2.0.0"
}
```

---

# Features Endpoint

Request:

```text
GET /features
```

This returns the features and available prediction classes used by the model.

---

# Prediction API

## Endpoint

```text
POST /predict
```

Local development URL:

```text
http://127.0.0.1:8000/predict
```

---

## Request Format

The API expects the 12 features as numeric values from **1 to 4**.

Example:

```json
{
  "study_hours": 2,
  "sleep_hours": 2,
  "revision_frequency": 4,
  "assignment_procrastination": 4,
  "study_distraction": 3,
  "phone_usage": 3,
  "social_media_hours": 3,
  "study_schedule": 1,
  "exam_preparation": 4,
  "planned_goals_completed": 1,
  "academic_confidence": 2,
  "study_stress": 4
}
```

---

# Prediction Response

Example:

```json
{
  "prediction": "Last-Minute Learner"
}
---

# Backend Integration

The ML API is designed to work with the application's Spring Boot backend.

The frontend should display the human-readable questionnaire options.

The Spring Boot backend should convert the selected text answers into the corresponding numeric values.

For example:

```text
Frontend:
"4+ hours"

        ↓

Spring Boot Backend:
study_hours = 4

        ↓

FastAPI:
POST /predict

        ↓

ML Model:
Prediction
```

The ML API **does not accept the raw questionnaire text**. It currently accepts the numeric values from 1 to 4.

---
# Result Delivery and Notifications

After the ML model generates the student's study-pattern prediction, the prediction is returned to the Spring Boot backend.

The Spring Boot backend is responsible for delivering the result to the student through their registered email address and phone number.

## Result Flow

```text
Student
   ↓
React Questionnaire
   ↓
Spring Boot Backend
   ↓
FastAPI ML API
   ↓
ML Prediction
   ↓
Spring Boot Backend
   ↓
┌──────────────────────────┐
│ Email Notification       │
│ SMS / Phone Notification │
└──────────────────────────┘
   ↓
Student receives result
```

## ML Response

The FastAPI service returns:

```json
{
  "prediction": "Last-Minute Learner",
  "confidence": 99.91,
  "class_probabilities": {
    "Consistent Learner": 0,
    "Easily Distracted": 0.04,
    "Last-Minute Learner": 99.91,
    "Needs Time Management": 0.04
  }
}
```

The Spring Boot backend receives this response and uses the `prediction` and `confidence` values to construct the student's result message.

## Email Notification

The student's result can be sent to their registered email address.

Example:

```text
Your Student Study Pattern Result

Study Pattern: Last-Minute Learner
Confidence: 99.91%

Thank you for completing the Student Study Pattern Assessment.
```

## SMS / Phone Notification

The Spring Boot backend can also send the result to the student's registered phone number through an SMS service.

Example:

```text
Study Pattern Result:
Last-Minute Learner
Confidence: 99.91%
```

## Responsibility of Each Component

| Component | Responsibility |
|---|---|
| React | Displays questionnaire and result |
| Spring Boot | Handles student data, authentication, ML API communication and notifications |
| FastAPI | Performs ML prediction |
| ML Model | Classifies the study pattern |
| Email Service | Sends result to student's email |
| SMS Service | Sends result to student's phone |

The ML service does not directly send emails or SMS messages. It only performs prediction and returns the result to the Spring Boot backend.

# Integration Example

A student selects:

```text
Study Hours:
4+ hours

Assignment Procrastination:
Always

Exam Preparation:
Night before
```

The backend converts them to:

```json
{
  "study_hours": 4,
  "assignment_procrastination": 4,
  "exam_preparation": 4
}
```

along with the remaining nine feature values.

The complete JSON is then sent to:

```text
POST /predict
```

---

# Important Integration Rules

The following must remain unchanged:

### Feature names

```text
study_hours
sleep_hours
revision_frequency
assignment_procrastination
study_distraction
phone_usage
social_media_hours
study_schedule
exam_preparation
planned_goals_completed
academic_confidence
study_stress
```

### Feature values

All values must be between:

```text
1 and 4
```

### Feature order

The backend should use the exact feature names expected by the model.

### Revision frequency encoding

Do not change:

```text
Daily             → 1
Few times a week  → 2
Before exams      → 3
Rarely            → 4
```

Changing this encoding without retraining the model can produce incorrect predictions.

---

# Testing the Model

The repository includes testing scripts.

## Test the V2 Model

```powershell
python test_model_v2.py
```

The script tests realistic student profiles including:

- Consistent Student
- Easily Distracted Student
- Last-Minute Student
- Time Management Student

---

# Example Model Test Results

The V2 model correctly classified the four representative profiles during testing:

| Test Profile | Prediction | Confidence |
|---|---|---:|
| Consistent Student | Consistent Learner | 100.00% |
| Easily Distracted Student | Easily Distracted | 98.60% |
| Last-Minute Student | Last-Minute Learner | 99.91% |
| Time Management Student | Needs Time Management | 81.10% |

These are representative test cases and should not be interpreted as general real-world accuracy.

---

# API Testing with Swagger

After starting the API:

```powershell
python -m uvicorn app:app --reload
```

Open:

```text
http://127.0.0.1:8000/docs
```

Select:

```text
POST /predict
```

Click:

```text
Try it out
```

Enter the 12 feature values and execute the request.

The API will return:

```text
Prediction
Confidence
Class Probabilities
```

---

# Limitations

- The V2 dataset is synthetic/generated data and may not represent the full diversity of real student behavior.
- Model performance on the V2 dataset does not guarantee the same performance on real student responses.
- The four study-pattern categories can overlap in real-world situations.
- The system classifies study patterns and is **not a psychological, medical, or academic diagnosis**.
- Confidence values represent the model's predicted probability distribution and should not be interpreted as certainty.
- Further validation using real student survey data is required before practical deployment.
- The ML service currently runs locally and requires deployment for access from external backend servers.

---

# Future Improvements

- Collect and validate the model using real student questionnaire responses.
- Improve generalization using a larger and more diverse dataset.
- Perform additional hyperparameter optimization.
- Evaluate additional classification algorithms.
- Deploy the FastAPI ML service to a cloud/server environment.
- Integrate the ML API with the Spring Boot backend.
- Connect the React questionnaire interface to the prediction service.
- Store prediction history where appropriate.
- Add personalized study recommendations.
- Add dashboards and visualizations for study-pattern analysis.
- Monitor model performance after deployment.
- Retrain the model periodically using validated real-world data.

---

# Current Development Status

```text
Dataset V2                  ✅ Completed
Model training              ✅ Completed
Model comparison            ✅ Completed
V2 model selection          ✅ Completed
Profile testing             ✅ Completed
FastAPI ML service          ✅ Completed
/health endpoint            ✅ Completed
/features endpoint          ✅ Completed
/predict endpoint           ✅ Completed
API testing                 ✅ Completed
GitHub integration           ✅ Completed
Frontend integration         🔄 Pending
Spring Boot integration      🔄 Pending
ML API deployment            🔄 Pending
```

---

# License

Add an appropriate open-source license before distributing this project publicly.
