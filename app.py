
from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

# Load the trained model and expected feature names
model = joblib.load("study_pattern_model.joblib")
feature_names = joblib.load("feature_names.joblib")


@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "running",
        "message": "Student Study Pattern ML API is ready"
    })


@app.route("/features", methods=["GET"])
def features():
    return jsonify({
        "features": feature_names
    })


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json(silent=True)

        if not isinstance(data, dict):
            return jsonify({
                "error": "Request body must be a JSON object"
            }), 400

        if "features" not in data or not isinstance(data["features"], dict):
            return jsonify({
                "error": "Provide survey responses inside a 'features' object"
            }), 400

        input_data = data["features"]

        missing = [f for f in feature_names if f not in input_data]
        extra = [f for f in input_data if f not in feature_names]

        if missing or extra:
            return jsonify({
                "error": "Input features do not match the model",
                "missing_features": missing,
                "unexpected_features": extra
            }), 400

        # Arrange the features in the same order used during training
        row = pd.DataFrame(
            [[input_data[f] for f in feature_names]],
            columns=feature_names
        )

        # Validate that all values are numeric
        row = row.apply(pd.to_numeric, errors="raise")

        if row.isnull().any().any():
            return jsonify({
                "error": "Feature values cannot be empty"
            }), 400

        # Predict the study pattern
        prediction = model.predict(row)[0]

        return jsonify({
            "prediction": str(prediction)
        })

    except (ValueError, TypeError) as e:
        return jsonify({
            "error": "Invalid input",
            "details": str(e)
        }), 400

    except Exception:
        app.logger.exception("Prediction failed")
        return jsonify({
            "error": "Internal prediction error"
        }), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)