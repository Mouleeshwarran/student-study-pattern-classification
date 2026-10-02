export const ACCENTS = ["#c6ff3d", "#8b7bff", "#3dd6ff", "#ff5c8a", "#ffb83d", "#3dffa8"];

interface Props {
  theme: "dark" | "light";
  accent: string;
  onTheme: (t: "dark" | "light") => void;
  onAccent: (c: string) => void;
}

export default function ThemePicker({ theme, accent, onTheme, onAccent }: Props) {
  return (
    <div className="picker">
      <button
        className="mode"
        aria-label="Toggle theme"
        onClick={() => onTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          </svg>
        )}
      </button>
      <span className="sep" />
      {ACCENTS.map((c) => (
        <button
          key={c}
          aria-label={`Accent ${c}`}
          className={`sw ${accent === c ? "on" : ""}`}
          style={{ background: c }}
          onClick={() => onAccent(c)}
        />
      ))}
    </div>
  );
}