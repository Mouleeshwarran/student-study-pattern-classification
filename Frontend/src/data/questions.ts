export interface Question {
  key: string;
  text: string;
  options: string[];
}

export const questions: Question[] = [
  { key: "study_hours", text: "How many hours do you usually study per day?", options: ["<1 hour", "1–2 hours", "2–4 hours", "4+ hours"] },
  { key: "sleep_hours", text: "How many hours do you usually sleep per night?", options: ["<5 hours", "5–6 hours", "6–8 hours", "8+ hours"] },
  { key: "revision_frequency", text: "How often do you revise your study material?", options: ["Daily", "Few times a week", "Before exams", "Rarely"] },
  { key: "assignment_procrastination", text: "How often do you postpone your assignments?", options: ["Never", "Sometimes", "Often", "Always"] },
  { key: "study_distraction", text: "How easily are you distracted while studying?", options: ["Very difficult", "Difficult", "Sometimes", "Very easily"] },
  { key: "phone_usage", text: "How often do you use your phone while studying?", options: ["Never", "Rarely", "Sometimes", "Frequently"] },
  { key: "social_media_hours", text: "How much time do you spend on social media per day?", options: ["<1 hour", "1–2 hours", "2–4 hours", "4+ hours"] },
  { key: "study_schedule", text: "How consistently do you follow a study schedule?", options: ["Never", "Sometimes", "Usually", "Always"] },
  { key: "exam_preparation", text: "When do you usually start preparing for exams?", options: ["Weeks before", "1 week before", "A few days before", "Night before"] },
  { key: "planned_goals_completed", text: "How often do you complete the study goals you plan?", options: ["Rarely", "Sometimes", "Usually", "Always"] },
  { key: "academic_confidence", text: "How confident are you about your academic performance?", options: ["Not confident", "Neutral", "Confident", "Very confident"] },
  { key: "study_stress", text: "How often do you feel stressed about your studies?", options: ["Never", "Rarely", "Sometimes", "Frequently"] },
];