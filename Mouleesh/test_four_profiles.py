import joblib
import pandas as pd

model = joblib.load("study_pattern_model.joblib")
feature_names = joblib.load("feature_names.joblib")

profiles = {

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
        "academic_confidence": 4,
        "study_stress": 1
    },

    "Time Management Student": {
        "study_hours": 2,
        "sleep_hours": 2,
        "revision_frequency": 3,
        "assignment_procrastination": 4,
        "study_distraction": 2,
        "phone_usage": 3,
        "social_media_hours": 2,
        "study_schedule": 1,
        "exam_preparation": 3,
        "planned_goals_completed": 1,
        "academic_confidence": 2,
        "study_stress": 3
    },

    "Easily Distracted Student": {
        "study_hours": 2,
        "sleep_hours": 2,
        "revision_frequency": 3,
        "assignment_procrastination": 3,
        "study_distraction": 4,
        "phone_usage": 4,
        "social_media_hours": 4,
        "study_schedule": 2,
        "exam_preparation": 3,
        "planned_goals_completed": 2,
        "academic_confidence": 2,
        "study_stress": 4
    },

    "Last-Minute Student": {
        "study_hours": 2,
        "sleep_hours": 2,
        "revision_frequency": 3,
        "assignment_procrastination": 4,
        "study_distraction": 2,
        "phone_usage": 3,
        "social_media_hours": 3,
        "study_schedule": 1,
        "exam_preparation": 4,
        "planned_goals_completed": 2,
        "academic_confidence": 2,
        "study_stress": 3
    }
}


for profile_name, values in profiles.items():

    X = pd.DataFrame(
        [[values[f] for f in feature_names]],
        columns=feature_names
    )

    prediction = model.predict(X)[0]

    print("=" * 60)
    print("PROFILE:", profile_name)
    print("PREDICTION:", prediction)

    if hasattr(model, "predict_proba"):
        probabilities = model.predict_proba(X)[0]

        print("\nProbabilities:")

        for label, probability in zip(
            model.classes_,
            probabilities
        ):
            print(
                f"{label:25s}: {probability:.4f}"
            )   