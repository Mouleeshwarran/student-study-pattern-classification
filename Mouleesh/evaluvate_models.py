
import pandas as pd

from sklearn.model_selection import StratifiedKFold, cross_val_score
from sklearn.ensemble import RandomForestClassifier, ExtraTreesClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier

# 1. Load dataset
df = pd.read_csv("student_study_pattern_dataset.csv")

X = df.drop(columns=["category"])
y = df["category"]

# 2. Define models
models = {
    "Decision Tree": DecisionTreeClassifier(random_state=42),
    "Random Forest": RandomForestClassifier(
        n_estimators=300, random_state=42, class_weight="balanced"
    ),
    "Extra Trees": ExtraTreesClassifier(
        n_estimators=300, random_state=42, class_weight="balanced"
    ),
    "Logistic Regression": LogisticRegression(
        max_iter=2000, class_weight="balanced"
    ),
}

# 3. Five-fold stratified cross-validation
cv = StratifiedKFold(
    n_splits=5, shuffle=True, random_state=42
)

# 4. Evaluate each model
for name, model in models.items():
    scores = cross_val_score(
        model, X, y, cv=cv, scoring="accuracy"
    )

    print(f"\n{name}")
    print(f"Fold accuracies: {scores.round(3)}")
    print(f"Mean accuracy: {scores.mean():.3f}")
    print(f"Std deviation: {scores.std():.3f}")