\# Student Study Pattern Classification System



\## Overview



The \*\*Student Study Pattern Classification System\*\* is a machine learning-based application that analyzes students' study habits and classifies them into one of four study pattern categories.



The system uses survey responses related to study routines, revision habits, distractions, time management, and academic confidence to identify a student's study pattern.



\## Study Pattern Categories



The model classifies students into the following four categories:



1\. \*\*Consistent Learner\*\* – Maintains a regular study routine and follows a structured learning approach.

2\. \*\*Needs Time Management\*\* – May benefit from better planning and organization of study activities.

3\. \*\*Easily Distracted\*\* – Experiences distractions that may interrupt study sessions.

4\. \*\*Last-Minute Learner\*\* – Tends to postpone preparation and concentrate study efforts closer to deadlines or examinations.



\## Technology Stack



\* \*\*Programming Language:\*\* Python

\* \*\*Machine Learning:\*\* Scikit-learn

\* \*\*Data Processing:\*\* Pandas

\* \*\*Model Serialization:\*\* Joblib

\* \*\*Backend API:\*\* Flask

\* \*\*API Testing:\*\* PowerShell / REST API requests



\## Machine Learning Features



The model uses the following 12 input features:



\* Study hours

\* Sleep hours

\* Revision frequency

\* Assignment procrastination

\* Study distraction

\* Phone usage

\* Social media hours

\* Study schedule

\* Exam preparation

\* Planned goals completed

\* Academic confidence

\* Study stress



\## Project Structure



```text

Web\_programming \_project/

├── app.py

├── train\_model.py

├── evaluvate\_models.py

├── evaluvate\_detailes.py

├── requirements.txt

├── study\_pattern\_model.joblib

├── feature\_names.joblib

├── student\_study\_pattern\_dataset.csv

├── student\_study\_pattern\_dataset\_readable.csv

├── README.md

└── .gitignore

```



\## Model Training



The project evaluates multiple classification algorithms:



\* Decision Tree

\* Random Forest

\* Extra Trees

\* Logistic Regression



The selected model is trained using a standardized feature pipeline and saved as a Joblib artifact for use by the Flask API.



The current Logistic Regression model achieved approximately \*\*78% accuracy\*\* on an 80/20 stratified train-test split. This result is based on a synthetic dataset and should not be interpreted as validated real-world student performance.



\## Installation



\### 1. Clone the repository



```bash

git clone YOUR\_REPOSITORY\_URL

cd "Web\_programming \_project"

```



\### 2. Create a virtual environment



```bash

python -m venv .venv

```



\### 3. Activate the environment



Windows PowerShell:



```powershell

.\\.venv\\Scripts\\Activate.ps1

```



\### 4. Install dependencies



```bash

python -m pip install -r requirements.txt

```



\## Run the Flask API



```bash

python app.py

```



The API runs at:



`http://127.0.0.1:5000`



\## API Endpoints



| Method | Endpoint    | Description                          |

| ------ | ----------- | ------------------------------------ |

| GET    | `/health`   | Checks API status                    |

| GET    | `/features` | Returns the required input features  |

| POST   | `/predict`  | Predicts the student's study pattern |



\## Prediction Request Example



Send a POST request to:



`http://127.0.0.1:5000/predict`



Example JSON:



```json

{

&#x20; "features": {

&#x20;   "study\_hours": 4,

&#x20;   "sleep\_hours": 7,

&#x20;   "revision\_frequency": 3,

&#x20;   "assignment\_procrastination": 2,

&#x20;   "study\_distraction": 2,

&#x20;   "phone\_usage": 3,

&#x20;   "social\_media\_hours": 2,

&#x20;   "study\_schedule": 3,

&#x20;   "exam\_preparation": 4,

&#x20;   "planned\_goals\_completed": 3,

&#x20;   "academic\_confidence": 4,

&#x20;   "study\_stress": 2

&#x20; }

}

```



\## Example Response



```json

{

&#x20; "prediction": "Needs Time Management"

}

```



The response shown is an example. Actual predictions depend on the submitted feature values.



\## Limitations



\* The current dataset is synthetic and may not represent real student behavior.

\* Model predictions depend on the quality and consistency of the input data.

\* The classification describes study patterns and is not a psychological or academic diagnosis.

\* Further validation with real-world student data is required before practical deployment.



\## Future Improvements



\* Validate the model using real student survey responses.

\* Improve classification performance and generalization.

\* Integrate the Flask API with the Spring Boot backend.

\* Connect the React survey interface to the prediction service.

\* Add visualizations and personalized study suggestions.



\## License



Add an appropriate license before distributing this project publicly.

vvvvvvvvvvvvvv

