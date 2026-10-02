import pandas as pd

from sklearn.model_selection import StratifiedKFold, cross_val_predict
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)

# Load dataset
df = pd.read_csv("student_study_pattern_dataset.csv")

X = df.drop(columns=["category"])
y = df["category"]

# Same model used by your current joblib
model = Pipeline([
    ("scaler", StandardScaler()),
    ("classifier", LogisticRegression(
        max_iter=2000,
        class_weight="balanced"
    ))
])

# 5-fold stratified CV
cv = StratifiedKFold(
    n_splits=5,
    shuffle=True,
    random_state=42
)

# Generate out-of-fold predictions
predictions = cross_val_predict(
    model,
    X,
    y,
    cv=cv
)

print("=" * 60)
print("FINAL MODEL EVALUATION")
print("=" * 60)

print("\nAccuracy:")
print(round(accuracy_score(y, predictions), 4))

print("\nClassification Report:")
print(classification_report(
    y,
    predictions,
    digits=4
))

print("\nConfusion Matrix:")
print(confusion_matrix(y, predictions))

print("\nClass order:")
print(sorted(y.unique()))           