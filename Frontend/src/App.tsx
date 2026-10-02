import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./components/Home";
import Survey from "./components/Survey";
import Verify from "./components/Verify";
import Result from "./components/Result";
import BgShapes from "./components/BgShapes";
import ThemePicker, { ACCENTS } from "./components/ThemePicker";

export type Stage = "home" | "survey" | "verify" | "result";

const load = <T,>(key: string, fallback: T): T => {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
};

export default function App() {
  const [stage, setStage] = useState<Stage>(() => load("sp_stage", "home"));
  const [answers, setAnswers] = useState<Record<string, number>>(() => load("sp_answers", {}));
  const [result, setResult] = useState(() => load("sp_result", ""));
  const [step, setStep] = useState(0);
  const [theme, setTheme] = useState<"dark" | "light">(() => load("sp_theme", "dark"));
  const [accent, setAccent] = useState<string>(() => load("sp_accent", ACCENTS[0]));

  useEffect(() => {
    localStorage.setItem("sp_stage", JSON.stringify(stage));
    localStorage.setItem("sp_answers", JSON.stringify(answers));
    localStorage.setItem("sp_result", JSON.stringify(result));
  }, [stage, answers, result]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.setProperty("--accent", accent);
    localStorage.setItem("sp_theme", JSON.stringify(theme));
    localStorage.setItem("sp_accent", JSON.stringify(accent));
  }, [theme, accent]);

  const restart = () => {
    ["sp_stage", "sp_answers", "sp_result", "sp_survey"].forEach((k) =>
      localStorage.removeItem(k)
    );
    setAnswers({});
    setResult("");
    setStep(0);
    setStage("home");
  };

  return (
    <div className="app">
      <div className="glow" />
      <BgShapes seed={stage + ":" + step} />
      <ThemePicker theme={theme} accent={accent} onTheme={setTheme} onAccent={setAccent} />
      <AnimatePresence mode="wait">
        <motion.main
          key={stage}
          className="stage"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {stage === "home" && <Home onStart={() => setStage("survey")} />}
          {stage === "survey" && (
            <Survey
              onStep={setStep}
              onDone={(a) => {
                setAnswers(a);
                setStage("verify");
              }}
            />
          )}
          {stage === "verify" && (
            <Verify
              answers={answers}
              onDone={(r) => {
                setResult(r);
                setStage("result");
              }}
            />
          )}
          {stage === "result" && <Result result={result} onRestart={restart} />}
        </motion.main>
      </AnimatePresence>
    </div>
  );
}