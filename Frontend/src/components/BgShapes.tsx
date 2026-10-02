import { useMemo } from "react";
import { motion } from "framer-motion";

const N = 24;
type Pt = [number, number];

// resample any outline to N points so all shapes can morph into each other
const poly = (v: Pt[]): string => {
  const edges = v.map((p, i) => [p, v[(i + 1) % v.length]] as [Pt, Pt]);
  const lens = edges.map(([a, b]) => Math.hypot(b[0] - a[0], b[1] - a[1]));
  const total = lens.reduce((s, l) => s + l, 0);
  const pts: string[] = [];
  for (let k = 0; k < N; k++) {
    let d = (k / N) * total;
    let e = 0;
    while (e < lens.length - 1 && d > lens[e]) {
      d -= lens[e];
      e++;
    }
    const [a, b] = edges[e];
    const t = d / lens[e];
    pts.push(
      `${(a[0] + (b[0] - a[0]) * t).toFixed(1)}% ${(a[1] + (b[1] - a[1]) * t).toFixed(1)}%`
    );
  }
  return `polygon(${pts.join(",")})`;
};

const ring = (n: number): Pt[] =>
  Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return [50 + 50 * Math.cos(a), 50 + 50 * Math.sin(a)] as Pt;
  });

const SHAPES = [
  poly(ring(48)), // circle
  poly([[50, 3], [97, 92], [3, 92]]), // triangle
  poly([[50, 0], [100, 50], [50, 100], [0, 50]]), // diamond
  poly([[8, 8], [92, 8], [92, 92], [8, 92]]), // square
  poly(ring(6)), // hexagon
];

const COLORS = ["var(--accent)", "var(--text)", "#7c5cff", "#3dd6ff", "#ff5c8a"];
const COUNT = 14;
const rnd = (a: number, b: number) => a + Math.random() * (b - a);

export default function BgShapes({ seed }: { seed: string }) {
  const items = useMemo(
    () =>
      Array.from({ length: COUNT }, () => ({
        x: rnd(2, 94),
        y: rnd(2, 92),
        size: rnd(18, 54),
        rot: rnd(-180, 180),
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        opacity: rnd(0.1, 0.22),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [seed]
  );

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
      {items.map((s, i) => (
        <motion.div
          key={i}
          style={{ position: "absolute" }}
          initial={false}
          animate={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            rotate: s.rot,
          }}
          transition={{ duration: 1.8, delay: i * 0.03, ease: [0.65, 0, 0.35, 1] }}
        >
          <motion.div
            style={{ width: "100%", height: "100%" }}
            initial={false}
            animate={{
              clipPath: s.shape,
              backgroundColor: s.color,
              opacity: s.opacity,
              y: [0, -14, 0],
            }}
            transition={{
              default: { duration: 1.8, delay: i * 0.03, ease: [0.65, 0, 0.35, 1] },
              y: { duration: 5 + (i % 4), repeat: Infinity, ease: "easeInOut" },
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}