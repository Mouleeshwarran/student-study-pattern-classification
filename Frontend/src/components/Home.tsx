import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

const words = ["study", "focus", "revise", "plan"];

const tips = [
  "Study in 25-minute bursts, then rest for 5.",
  "Explain a topic out loud as if teaching a friend.",
  "Phone in another room beats phone face-down.",
  "Review notes within 24 hours to remember far more.",
  "Start with the hardest subject while your mind is fresh.",
  "Write down distracting thoughts instead of acting on them.",
  "Test yourself with questions rather than rereading.",
];

const facts = [
  "Sleep helps lock in what you studied the same day.",
  "Short breaks can improve focus more than pushing through.",
  "Writing by hand often boosts recall of key ideas.",
  "Spacing study over several days beats one long cram.",
  "Even a 10-minute walk can sharpen your attention.",
];

const moods = [
  ["😴", "Rest counts too. Keep today's sessions short."],
  ["😐", "Start small. Ten minutes is a win."],
  ["🙂", "Nice. Ride that steady energy."],
  ["🔥", "Aim that fire at your hardest topic."],
];

function Tile({ cls, i, children }: { cls: string; i: number; children: ReactNode }) {
  return (
    <motion.div
      className={`tile ${cls}`}
      initial={{ opacity: 0, y: 22, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: i * 0.06, duration: 0.4 }}
      whileHover={{ y: -3 }}
    >
      {children}
    </motion.div>
  );
}

function Game() {
  const [state, setState] = useState<"idle" | "wait" | "go" | "done" | "early">("idle");
  const [ms, setMs] = useState(0);
  const [best, setBest] = useState<number | null>(null);
  const t0 = useRef(0);
  const timer = useRef<number>(0);

  useEffect(() => () => clearTimeout(timer.current), []);

  const click = () => {
    if (state === "idle" || state === "done" || state === "early") {
      setState("wait");
      timer.current = window.setTimeout(() => {
        t0.current = performance.now();
        setState("go");
      }, 1200 + Math.random() * 2200);
    } else if (state === "wait") {
      clearTimeout(timer.current);
      setState("early");
    } else {
      const d = Math.round(performance.now() - t0.current);
      setMs(d);
      setBest((b) => (b === null ? d : Math.min(b, d)));
      setState("done");
    }
  };

  const label =
    state === "idle" ? "Tap to begin" :
    state === "wait" ? "Wait for it..." :
    state === "go" ? "NOW!" :
    state === "early" ? "Too early! Retry" :
    `${ms} ms · tap to retry`;

  return (
    <>
      <div className="row">
        <h3>Focus check</h3>
        {best !== null && <span className="tiny">best {best} ms</span>}
      </div>
      <button className={`game ${state}`} onClick={click}>{label}</button>
    </>
  );
}

function Breathe() {
  const [on, setOn] = useState(false);
  const [inhale, setInhale] = useState(true);

  useEffect(() => {
    if (!on) return;
    setInhale(true);
    const id = setInterval(() => setInhale((x) => !x), 4000);
    return () => clearInterval(id);
  }, [on]);

  return (
    <>
      <h3>Breathe</h3>
      <div className="breathe-wrap">
        <motion.div
          className="orb"
          animate={{ scale: on && inhale ? 1.5 : 1 }}
          transition={{ duration: 4, ease: "easeInOut" }}
        />
        <span className="tiny">{on ? (inhale ? "Inhale" : "Exhale") : "Reset your mind"}</span>
      </div>
      <button className="btn ghost sm" onClick={() => setOn(!on)}>{on ? "Stop" : "Start"}</button>
    </>
  );
}

function Mood() {
  const [m, setM] = useState<number | null>(null);
  return (
    <>
      <h3>How's your energy?</h3>
      <div className="moods">
        {moods.map(([e], i) => (
          <motion.button
            key={e}
            className={`mood ${m === i ? "on" : ""}`}
            whileTap={{ scale: 0.85 }}
            onClick={() => setM(i)}
          >
            {e}
          </motion.button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={m ?? -1}
          className="tiny"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          {m === null ? "Tap one" : moods[m][1]}
        </motion.p>
      </AnimatePresence>
    </>
  );
}

function Fact() {
  const [flip, setFlip] = useState(false);
  const [n, setN] = useState(0);
  return (
    <div
      className="flip"
      onClick={() => {
        if (!flip) setN((x) => (x + 1) % facts.length);
        setFlip(!flip);
      }}
    >
      <motion.div className="flip-in" animate={{ rotateY: flip ? 180 : 0 }} transition={{ duration: 0.5 }}>
        <div className="face">
          <h3>Did you know?</h3>
          <span className="tiny">Tap to reveal</span>
        </div>
        <div className="face back">
          <p>{facts[n]}</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function Home({ onStart }: { onStart: () => void }) {
  const [w, setW] = useState(0);
  const [tip, setTip] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setW((x) => (x + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, []);

  const shuffle = () =>
    setTip((t) => {
      let n = t;
      while (n === t) n = Math.floor(Math.random() * tips.length);
      return n;
    });

  return (
    <div className="explore">
      <Tile cls="t-hero" i={0}>
        <span className="tag" style={{ alignSelf: "flex-start" }}>Study Pattern Survey</span>
        <h1>
          How do you really{" "}
          <span className="rot">
            <AnimatePresence mode="wait">
              <motion.em
                key={words[w]}
                initial={{ y: 22, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -22, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {words[w]}
              </motion.em>
            </AnimatePresence>
          </span>
          ?
        </h1>
        <p className="muted">12 quick questions. Your personal study tips arrive by email.</p>
        <motion.button
          className="btn"
          style={{ alignSelf: "flex-start" }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onStart}
        >
          Start survey →
        </motion.button>
      </Tile>

      <Tile cls="t-stat" i={1}><b>12</b><span className="tiny">questions</span></Tile>
      <Tile cls="t-stat" i={2}><b>~2</b><span className="tiny">minutes</span></Tile>

      <Tile cls="t-wide" i={3}>
        <div className="row">
          <h3>Study tip</h3>
          <button className="btn ghost sm" onClick={shuffle}>Shuffle</button>
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={tip}
            className="tipText"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {tips[tip]}
          </motion.p>
        </AnimatePresence>
      </Tile>

      <Tile cls="t-wide" i={4}><Game /></Tile>
      <Tile cls="t-tall" i={5}><Breathe /></Tile>
      <Tile cls="" i={6}><Mood /></Tile>
      <Tile cls="t-wide t-flat" i={7}><Fact /></Tile>

      <Tile cls="t-flat" i={8}>
        <button className="cta" onClick={onStart}>
          Start <span>→</span>
        </button>
      </Tile>
    </div>
  );
}