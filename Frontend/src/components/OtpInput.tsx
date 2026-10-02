import { useRef } from "react";

interface Props {
  value: string;
  onChange: (v: string) => void;
  onEnter?: () => void;
}

export default function OtpInput({ value, onChange, onEnter }: Props) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = Array.from({ length: 6 }, (_, i) => value[i] ?? "");

  const focus = (i: number) => refs.current[Math.max(0, Math.min(5, i))]?.focus();

  const setAt = (i: number, d: string) => {
    const arr = [...digits];
    arr[i] = d;
    onChange(arr.join(""));
  };

  const handleChange = (i: number, raw: string) => {
    const d = raw.replace(/\D/g, "").slice(-1);
    if (!d) return;
    setAt(i, d);
    focus(i + 1);
  };

  const handleKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (digits[i]) setAt(i, "");
      else {
        setAt(i - 1 < 0 ? 0 : i - 1, "");
        focus(i - 1);
      }
    } else if (e.key === "ArrowLeft") focus(i - 1);
    else if (e.key === "ArrowRight") focus(i + 1);
    else if (e.key === "Enter") onEnter?.();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const p = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    onChange(p);
    focus(p.length >= 6 ? 5 : p.length);
  };

  return (
    <div className="otp-row" onPaste={handlePaste}>
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          className={`otp-box ${d ? "filled" : ""}`}
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={d}
          autoFocus={i === 0}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKey(i, e)}
          onFocus={(e) => e.target.select()}
        />
      ))}
    </div>
  );
}