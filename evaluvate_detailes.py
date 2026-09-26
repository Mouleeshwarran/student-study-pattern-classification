
import pandas as pd
import matplotlib.pyplot as plt

from sklearn.model_selection import train_test_split
from sklearn.ensemble import (
    RandomForestClassifier,
    ExtraTreesClassifier
)
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier

from sklearn.metrics import (
    classification_report,
    confusion_matrix,
    ConfusionMatrixDisplay,
    accuracy_score,
    f1_score
)

# 1. Load dataset
df = pd.read_csv("student_study_pattern_dataset.csv")

X = df.drop(columns=["category"])
y = df["category"]

# 2. Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

# 3. Define models
models = {
    "Decision Tree": DecisionTreeClassifier(random_state=42),

    "Random Forest": RandomForestClassifier(
        n_estimators=300,
        random_state=42,
        class_weight="balanced"
    ),

    "Extra Trees": ExtraTreesClassifier(
        n_estimators=300,
        random_state=42,
        class_weight="balanced"
    ),

    "Logistic Regression": LogisticRegression(
        max_iter=2000,
        class_weight="balanced"
    )
}

# 4. Train and evaluate
for name, model in models.items():

    print("\n" + "=" * 60)
    print(name)
    print("=" * 60)

    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)

    print("Accuracy:", round(accuracy_score(y_test, y_pred), 4))
    print("Macro F1:", round(
        f1_score(y_test, y_pred, average="macro"), 4
    ))

    print("\nClassification Report:")
    print(classification_report(y_test, y_pred, zero_division=0))

    # 5. Confusion matrix
    cm = confusion_matrix(y_test, y_pred, labels=model.classes_)

    display = ConfusionMatrixDisplay(
        confusion_matrix=cm,
        display_labels=model.classes_
    )

    display.plot(cmap="Blues", xticks_rotation=25)
    plt.title(f"{name} - Confusion Matrix")
    plt.tight_layout()

    filename = name.lower().replace(" ", "_")
    plt.savefig(f"{filename}_confusion_matrix.png")
    plt.close()

    print(f"Saved: {filename}_confusion_matrix.png")

print("\nDetailed evaluation completed!")