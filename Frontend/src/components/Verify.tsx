import { useState } from "react";
import { sendOtp, verifyOtp, predict, sendResult } from "../api";
import OtpInput from "./OtpInput";

interface Props {
  answers: Record<string, number>;
  onDone: (result: string) => void;
}

export default function Verify({ answers, onDone }: Props) {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const run = async (fn: () => Promise<void>) => {
    setBusy(true);
    setErr("");
    try {
      await fn();
    } catch {
      setErr("Something went wrong. Please try again.");
    }
    setBusy(false);
  };

  const submitEmail = () =>
    run(async () => {
      await sendOtp(email.trim());
      setStep("otp");
    });

  const submitOtp = () => {
    if (otp.length !== 6 || busy) return;
    run(async () => {
      const ok = await verifyOtp(email.trim(), otp);
      if (!ok) {
        setErr("Invalid code. Check your email and try again.");
        setOtp("");
        return;
      }
      const result = await predict(answers);
      await sendResult(email.trim(), result);
      onDone(result);
    });
  };

  const validEmail = /^\S+@\S+\.\S+$/.test(email);

  return (
    <div>
      {step === "email" ? (
        <>
          <h2>Almost done. Where should we send your result?</h2>
          <p className="muted" style={{ marginTop: 12 }}>
            We'll email a 6-digit code to confirm it's you.
          </p>
          <input
            className="input"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && validEmail && submitEmail()}
            autoFocus
          />
          {err && <p className="err">{err}</p>}
          <button className="btn" disabled={!validEmail || busy} onClick={submitEmail}>
            {busy ? "Sending..." : "Send code →"}
          </button>
        </>
      ) : (
        <>
          <h2>Enter the code</h2>
          <p className="muted" style={{ marginTop: 12 }}>
            Sent to {email}
          </p>
          <OtpInput value={otp} onChange={setOtp} onEnter={submitOtp} />
          {err && <p className="err">{err}</p>}
          <div style={{ display: "flex", gap: 12 }}>
            <button className="btn" disabled={otp.length !== 6 || busy} onClick={submitOtp}>
              {busy ? "Checking..." : "Get my result"}
            </button>
            <button
              className="btn ghost"
              onClick={() => { setStep("email"); setOtp(""); setErr(""); }}
            >
              Change email
            </button>
          </div>
        </>
      )}
    </div>
  );
}