import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { questions } from "../data/questions";

const KEY = "sp_survey";

const saved = (() => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "null") as
      | { i: number; ans: Record<string, number> }
      | null;
  } catch {
    return null;
  }
})();

export default function Survey({ onDone, onStep }: { onDone: (a: Record<string, number>) => void; onStep?: (i: number) => void }) {
  const [i, setI] = useState(saved?.i ?? 0);
  const [dir, setDir] = useState(1);
  const [ans, setAns] = useState<Record<string, number>>(saved?.ans ?? {});
  const q = questions[i];

  useEffect(() => { onStep?.(i); }, [i]); // eslint-disable-line
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify({ i, ans }));
  }, [i, ans]);

  const pick = (n: number) => {
    const next = { ...ans, [q.key]: n };
    setAns(next);
    setTimeout(() => {
      if (i === questions.length - 1) {
        localStorage.removeItem(KEY);
        return onDone(next);
      }
      setDir(1);
      setI(i + 1);
    }, 280);
  };

  const back = () => {
    if (i === 0) return;
    setDir(-1);
    setI(i - 1);
  };

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const n = Number(e.key);
      if (n >= 1 && n <= 4) pick(n);
      if (e.key === "ArrowLeft") back();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });

  return (
    <div>
      <div className="progress">
        <motion.div
          className="bar"
          animate={{ width: `${((i + 1) / questions.length) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
      <p className="count">
        {String(i + 1).padStart(2, "0")} / {questions.length}
      </p>

      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={i}
          custom={dir}
          variants={{
            enter: (d: number) => ({ opacity: 0, x: 50 * d }),
            center: { opacity: 1, x: 0 },
            exit: (d: number) => ({ opacity: 0, x: -50 * d }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.25 }}
        >
          <h2>{q.text}</h2>
          <div className="options">
            {q.options.map((o, idx) => (
              <motion.button
                key={o}
                className={`opt ${ans[q.key] === idx + 1 ? "sel" : ""}`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => pick(idx + 1)}
              >
                <span className="key">{idx + 1}</span>
                {o}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="nav">
        <button className="btn ghost" onClick={back} disabled={i === 0}>
          ← Back
        </button>
        <span className="tiny" style={{ alignSelf: "center" }}>
          Tip: press 1–4
        </span>
      </div>
    </div>
  );
}