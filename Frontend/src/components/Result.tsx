import { useMemo } from "react";
import { motion } from "framer-motion";

const colors = ["#c6ff3d", "#ffffff", "#7c5cff", "#ff5c8a", "#3dd6ff", "#ffb83d"];

function Pops() {
  const items = useMemo(
    () =>
      Array.from({ length: 90 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        dx: (Math.random() - 0.5) * 160,
        dy: (Math.random() - 0.5) * 160 + 40,
        rot: Math.random() * 540 - 270,
        size: 6 + Math.random() * 9,
        round: Math.random() > 0.5,
        color: colors[i % colors.length],
        delay: Math.random() * 0.35,
      })),
    []
  );

  return (
    <div className="pops">
      {items.map((p) => (
        <motion.span
          key={p.id}
          className="pop"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.round ? p.size : p.size * 0.5,
            background: p.color,
            borderRadius: p.round ? "50%" : 2,
          }}
          initial={{ scale: 0, opacity: 1, x: 0, y: 0, rotate: 0 }}
          animate={{
            scale: [0, 1.3, 1, 0],
            opacity: [1, 1, 1, 0],
            x: p.dx,
            y: p.dy,
            rotate: p.rot,
          }}
          transition={{ duration: 1.2, delay: p.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

export default function Result({
  onRestart,
}: {
  result?: string;
  onRestart: () => void;
}) {
  return (
    <>
      <Pops />
      <motion.div
        className="result-card"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 140, damping: 14 }}
      >
        <motion.div
          className="check"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 12, delay: 0.15 }}
        >
          <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="#0a0a0f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <motion.path
              d="M5 12.5l4.5 4.5L19 7.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            />
          </svg>
        </motion.div>
        <h1>Results sent to your mail successfully</h1>
        <p className="muted" style={{ margin: "0 auto 28px" }}>
          Check your inbox for your study pattern and personal tips.
        </p>
        <button className="btn ghost" onClick={onRestart}>
          Take it again
        </button>
      </motion.div>
    </>
  );
}