const MOCK = true; // set false to use real backends

const ML = "http://127.0.0.1:8000";
const API = "http://localhost:8080";

const wait = (ms = 700) => new Promise((r) => setTimeout(r, ms));

async function post(url: string, body: unknown) {
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(await r.text());
  return r;
}

function mockPredict(a: Record<string, number>): string {
  const scores: Record<string, number> = {
    "Easily Distracted": (a.study_distraction + a.phone_usage + a.social_media_hours) / 3,
    "Last-Minute Learner": (a.exam_preparation + a.assignment_procrastination + a.revision_frequency) / 3,
    "Needs Time Management": (10 - a.study_schedule - a.planned_goals_completed) / 2 + 0.3,
    "Consistent Learner":
      ((5 - a.exam_preparation) + (5 - a.assignment_procrastination) + a.study_schedule + a.planned_goals_completed) / 4 + 0.3,
  };
  return Object.entries(scores).sort((x, y) => y[1] - x[1])[0][0];
}

export const sendOtp = async (email: string) => {
  if (MOCK) return wait();
  await post(`${API}/otp/send`, { email });
};

export const verifyOtp = async (email: string, otp: string) => {
  if (MOCK) {
    await wait();
    return otp === "123456";
  }
  return (await (await post(`${API}/otp/verify`, { email, otp })).text()).includes("successfully");
};

export const predict = async (features: Record<string, number>): Promise<string> => {
  if (MOCK) {
    await wait();
    return mockPredict(features);
  }
  return (await (await post(`${ML}/predict`, features)).json()).prediction;
};

export const sendResult = async (email: string, result: string) => {
  if (MOCK) return wait(300);
  await post(`${API}/otp/send-result`, { email, result });
};