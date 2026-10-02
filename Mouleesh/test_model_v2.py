import joblib
import numpy as np

# ============================================================
# Load V2 Model
# ============================================================

MODEL_FILE = "study_pattern_model_v2.joblib"
FEATURE_FILE = "feature_names_v2.joblib"
CLASS_FILE = "class_names_v2.joblib"

model = joblib.load(MODEL_FILE)
feature_names = joblib.load(FEATURE_FILE)
class_names = joblib.load(CLASS_FILE)

print("=" * 70)
print("STUDENT STUDY PATTERN - V2 MODEL TEST")
print("=" * 70)

print("\nFeatures:")
for i, feature in enumerate(feature_names, start=1):
    print(f"{i}. {feature}")

print("\nClasses:")
for class_name in class_names:
    print(f"- {class_name}")


# ============================================================
# Test Profiles
# ============================================================

test_profiles = {

    "Consistent Student": {
        "study_hours": 4,
        "sleep_hours": 3,
        "revision_frequency": 1,
        "assignment_procrastination": 1,
        "study_distraction": 1,
        "phone_usage": 1,
        "social_media_hours": 1,
        "study_schedule": 4,
        "exam_preparation": 1,
        "planned_goals_completed": 4,
        "academic_confidence": 3,
        "study_stress": 1,
    },

    "Easily Distracted Student": {
        "study_hours": 2,
        "sleep_hours": 2,
        "revision_frequency": 2,
        "assignment_procrastination": 3,
        "study_distraction": 4,
        "phone_usage": 4,
        "social_media_hours": 4,
        "study_schedule": 2,
        "exam_preparation": 3,
        "planned_goals_completed": 2,
        "academic_confidence": 2,
        "study_stress": 3,
    },

    "Last-Minute Student": {
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
        "study_stress": 4,
    },

    "Time Management Student": {
        "study_hours": 2,
        "sleep_hours": 2,
        "revision_frequency": 3,
        "assignment_procrastination": 3,
        "study_distraction": 2,
        "phone_usage": 2,
        "social_media_hours": 2,
        "study_schedule": 2,
        "exam_preparation": 3,
        "planned_goals_completed": 2,
        "academic_confidence": 2,
        "study_stress": 3,
    },

}


# ============================================================
# Prediction Function
# ============================================================

def predict_student(name, features):

    # Keep the exact feature order used during training
    values = [features[feature] for feature in feature_names]

    X = np.array(values).reshape(1, -1)

    prediction = model.predict(X)[0]

    probabilities = model.predict_proba(X)[0]

    confidence = max(probabilities) * 100

    print("\n" + "=" * 70)
    print(f"PROFILE: {name}")
    print("=" * 70)

    print(f"\nPrediction : {prediction}")
    print(f"Confidence : {confidence:.2f}%")

    print("\nClass probabilities:")

    # Sort probabilities from highest to lowest
    results = sorted(
        zip(model.classes_, probabilities),
        key=lambda x: x[1],
        reverse=True
    )

    for class_name, probability in results:
        print(f"{class_name:<30} {probability * 100:6.2f}%")


# ============================================================
# Run Tests
# ============================================================

for name, features in test_profiles.items():
    predict_student(name, features)


print("\n" + "=" * 70)
print("TESTING COMPLETED")
print("=" * 70)