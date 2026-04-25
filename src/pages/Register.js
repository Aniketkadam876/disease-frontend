import React, { useState } from "react";
import api from "../services/api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=IBM+Plex+Mono:wght@400;500&family=Lato:wght@300;400&display=swap');

  .reg-root {
    min-height: 100vh;
    background: #060809;
    display: flex;
    font-family: 'Lato', sans-serif;
    position: relative;
    overflow: hidden;
  }

  .reg-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(238,243,248,0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(238,243,248,0.045) 1px, transparent 1px);
    background-size: 50px 50px;
    pointer-events: none;
  }

  .reg-orb {
    position: absolute; top: -100px; left: -100px;
    width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,229,160,0.06) 0%, transparent 65%);
    pointer-events: none;
  }
  .reg-orb-2 {
    position: absolute; bottom: -80px; right: -80px;
    width: 380px; height: 380px; border-radius: 50%;
    background: radial-gradient(circle, rgba(56,182,255,0.04) 0%, transparent 65%);
    pointer-events: none;
  }

  /* LEFT — form */
  .reg-left {
    width: 500px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    padding: 2rem; position: relative; z-index: 2;
    border-right: 1px solid rgba(238,243,248,0.06);
    background: rgba(11,16,20,0.6);
    backdrop-filter: blur(10px);
  }
  .reg-card {
    width: 100%; max-width: 380px;
    animation: regFadeUp 0.55s ease both;
  }
  @keyframes regFadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .reg-logo {
    display: flex; align-items: center; gap: 9px;
    font-family: 'Syne', sans-serif; font-weight: 800;
    font-size: 1.05rem; color: #eef3f8;
    text-decoration: none; margin-bottom: 2rem;
  }
  .reg-logo-icon {
    width: 26px; height: 26px; border-radius: 7px;
    background: rgba(0,229,160,0.10);
    border: 1px solid rgba(0,229,160,0.22);
    display: flex; align-items: center; justify-content: center;
  }

  .reg-eyebrow {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.68rem; letter-spacing: 0.1em;
    text-transform: uppercase; color: #00e5a0;
    margin-bottom: 0.6rem;
    display: flex; align-items: center; gap: 7px;
  }
  .reg-eyebrow-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: #00e5a0;
    animation: regblink 2s ease infinite;
  }
  @keyframes regblink { 0%,100%{opacity:1} 50%{opacity:0} }

  .reg-card h2 {
    font-family: 'Syne', sans-serif; font-weight: 800;
    font-size: 1.6rem; color: #eef3f8; margin-bottom: 0.35rem;
  }
  .reg-card-sub {
    font-size: 0.875rem; color: rgba(238,243,248,0.5);
    margin-bottom: 1.75rem;
  }

  /* banners */
  .reg-error {
    background: rgba(239,68,68,0.08);
    border: 1px solid rgba(239,68,68,0.3);
    border-radius: 8px; padding: 10px 13px;
    font-size: 0.82rem; color: #fca5a5;
    margin-bottom: 1.25rem;
    font-family: 'IBM Plex Mono', monospace;
  }
  .reg-success {
    background: rgba(0,229,160,0.07);
    border: 1px solid rgba(0,229,160,0.3);
    border-radius: 8px; padding: 10px 13px;
    font-size: 0.82rem; color: #00e5a0;
    margin-bottom: 1.25rem;
    font-family: 'IBM Plex Mono', monospace;
  }
  .reg-success a { color: #00e5a0; font-weight: 600; }

  /* fields */
  .reg-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 13px; }
  .reg-label {
    font-size: 0.7rem; font-weight: 500; letter-spacing: 0.07em;
    text-transform: uppercase; color: rgba(238,243,248,0.4);
    font-family: 'IBM Plex Mono', monospace;
  }
  .reg-input {
    width: 100%; padding: 10px 13px;
    background: rgba(238,243,248,0.04);
    border: 1px solid rgba(238,243,248,0.10);
    border-radius: 8px; outline: none;
    font-size: 0.9rem; color: #eef3f8;
    font-family: 'Lato', sans-serif;
    transition: border-color 0.2s, background 0.2s;
  }
  .reg-input::placeholder { color: rgba(238,243,248,0.22); }
  .reg-input:focus {
    border-color: rgba(0,229,160,0.45);
    background: rgba(0,229,160,0.04);
  }
  .reg-hint {
    font-size: 0.72rem; color: rgba(238,243,248,0.3);
    font-family: 'IBM Plex Mono', monospace;
    margin-top: 2px;
  }

  /* password strength */
  .reg-strength { display: flex; gap: 5px; margin-top: 6px; }
  .reg-strength-bar {
    flex: 1; height: 3px; border-radius: 2px;
    background: rgba(238,243,248,0.08);
    transition: background 0.3s;
  }
  .reg-strength-bar.weak   { background: #ef4444; }
  .reg-strength-bar.medium { background: #f5a623; }
  .reg-strength-bar.strong { background: #00e5a0; }

  .reg-btn {
    width: 100%; padding: 11px;
    border-radius: 8px; border: none;
    background: #00e5a0; color: #060809;
    font-family: 'Syne', sans-serif; font-weight: 700;
    font-size: 0.95rem; cursor: pointer;
    transition: all 0.2s; margin-top: 4px;
    display: flex; align-items: center; justify-content: center; gap: 8px;
  }
  .reg-btn:hover:not(:disabled) { background: #10fdb5; transform: translateY(-1px); }
  .reg-btn:disabled { background: rgba(0,229,160,0.3); cursor: not-allowed; color: rgba(6,8,9,0.4); }

  .reg-terms {
    font-size: 0.75rem; color: rgba(238,243,248,0.3);
    text-align: center; margin-top: 10px; line-height: 1.5;
  }
  .reg-divider {
    border: none; border-top: 1px solid rgba(238,243,248,0.07);
    margin: 1.25rem 0;
  }
  .reg-footer-text {
    text-align: center; font-size: 0.82rem;
    color: rgba(238,243,248,0.45);
  }
  .reg-footer-text a {
    color: #00e5a0; text-decoration: none;
    font-family: 'IBM Plex Mono', monospace; font-size: 0.8rem;
    font-weight: 500;
  }
  .reg-footer-text a:hover { opacity: 0.75; }

  @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  .reg-spinner {
    width: 14px; height: 14px;
    border: 2px solid rgba(6,8,9,0.3);
    border-top-color: #060809;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  /* RIGHT — info panel */
  .reg-right {
    flex: 1;
    display: flex; flex-direction: column;
    justify-content: center; padding: 4rem 5rem;
    position: relative; z-index: 2;
  }
  .reg-right-tag {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.7rem; letter-spacing: 0.12em;
    text-transform: uppercase; color: #00e5a0; margin-bottom: 1rem;
  }
  .reg-right h2 {
    font-family: 'Syne', sans-serif; font-weight: 800;
    font-size: clamp(1.9rem, 3vw, 3rem);
    line-height: 1.1; color: #eef3f8; margin-bottom: 1rem;
  }
  .reg-right h2 em { font-style: italic; color: #00e5a0; }
  .reg-right p {
    font-size: 0.95rem; color: rgba(238,243,248,0.5);
    max-width: 380px; line-height: 1.7; margin-bottom: 2.5rem;
  }

  /* stat boxes */
  .reg-stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; max-width: 360px; }
  .reg-stat-box {
    background: rgba(238,243,248,0.03);
    border: 1px solid rgba(238,243,248,0.07);
    border-radius: 10px; padding: 1.25rem;
    transition: border-color 0.2s;
  }
  .reg-stat-box:hover { border-color: rgba(0,229,160,0.2); }
  .reg-stat-num {
    font-family: 'Syne', sans-serif; font-weight: 800;
    font-size: 1.75rem; color: #eef3f8; line-height: 1;
  }
  .reg-stat-num span { color: #00e5a0; }
  .reg-stat-label {
    font-size: 0.78rem; color: rgba(238,243,248,0.45);
    margin-top: 4px;
  }

  /* disease tags */
  .reg-disease-tags { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 2rem; max-width: 420px; }
  .reg-dtag {
    padding: 5px 11px; border-radius: 999px;
    background: rgba(238,243,248,0.04);
    border: 1px solid rgba(238,243,248,0.08);
    font-size: 0.75rem; color: rgba(238,243,248,0.45);
    font-family: 'IBM Plex Mono', monospace;
    transition: all 0.2s;
  }
  .reg-dtag:hover { border-color: rgba(0,229,160,0.25); color: #00e5a0; }

  @media (max-width: 768px) {
    .reg-right { display: none; }
    .reg-left { width: 100%; border-right: none; background: #060809; }
  }
`;

function getStrength(pw) {
  if (pw.length === 0) return 0;
  if (pw.length < 6) return 1;
  if (pw.length < 10) return 2;
  return 3;
}

const previewDiseases = ["Dengue","Malaria","Typhoid","Diabetes","Hypertension","Pneumonia","Migraine","Hepatitis B"];

export default function Register() {
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [success, setSuccess]   = useState(false);
  const [loading, setLoading]   = useState(false);

  const strength = getStrength(password);
  const strengthLabel = ["", "weak", "medium", "strong"][strength];

  const handleRegister = async () => {
    setError("");
    setLoading(true);
    try {
      await api.post("/register", { name, email, password });
      setSuccess(true);
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => { if (e.key === "Enter") handleRegister(); };

  return (
    <>
      <style>{styles}</style>
      <div className="reg-root">
        <div className="reg-grid" />
        <div className="reg-orb" />
        <div className="reg-orb-2" />

        {/* LEFT — form */}
        <div className="reg-left">
          <div className="reg-card">
            <a href="/" className="reg-logo">
              <div className="reg-logo-icon">
                <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                  <path d="M8 1L9.8 6H15L10.5 9.2L12.3 14.5L8 11.5L3.7 14.5L5.5 9.2L1 6H6.2L8 1Z" fill="#00e5a0"/>
                </svg>
              </div>
              DiagnoAI
            </a>

            <div className="reg-eyebrow">
              <span className="reg-eyebrow-dot" />
              CREATE ACCOUNT
            </div>
            <h2>Get started<br/>for free</h2>
            <p className="reg-card-sub">Join DiagnoAI and get instant access to ML-powered disease prediction</p>

            {success && (
              <div className="reg-success">
                ✓ Account created! <a href="/login">Sign in now →</a>
              </div>
            )}
            {error && <div className="reg-error">⚠ {error}</div>}

            <div className="reg-field">
              <label className="reg-label">Full name</label>
              <input
                className="reg-input" type="text" placeholder="Jane Smith"
                value={name} onChange={(e) => setName(e.target.value)} onKeyDown={handleKeyDown}
              />
            </div>

            <div className="reg-field">
              <label className="reg-label">Email</label>
              <input
                className="reg-input" type="email" placeholder="you@example.com"
                value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={handleKeyDown}
              />
            </div>

            <div className="reg-field">
              <label className="reg-label">Password</label>
              <input
                className="reg-input" type="password" placeholder="••••••••"
                value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown}
              />
              {password.length > 0 && (
                <div className="reg-strength">
                  {[1,2,3].map((lvl) => (
                    <div
                      key={lvl}
                      className={`reg-strength-bar ${strength >= lvl ? strengthLabel : ""}`}
                    />
                  ))}
                </div>
              )}
              <span className="reg-hint">Min. 8 characters recommended</span>
            </div>

            <button
              className="reg-btn"
              onClick={handleRegister}
              disabled={loading || success}
            >
              {loading ? (
                <><div className="reg-spinner" /> Creating account...</>
              ) : success ? (
                "✓ Account created"
              ) : (
                "Create account →"
              )}
            </button>

            <p className="reg-terms">
              By registering you agree this is for informational use only.<br/>DiagnoAI is not a substitute for medical advice.
            </p>

            <hr className="reg-divider" />
            <p className="reg-footer-text">
              Already have an account?{" "}
              <a href="/login">Sign in</a>
            </p>
          </div>
        </div>

        {/* RIGHT — info */}
        <div className="reg-right">
          <div className="reg-right-tag">// WHAT YOU GET</div>
          <h2>Predict diseases<br/>with <em>confidence</em>.</h2>
          <p>Your free account unlocks the full ML model, AI chatbot, prediction history, and confidence scores — instantly.</p>

          <div className="reg-stat-grid">
            {[
              { n:"40", s:"+", l:"Diseases detected" },
              { n:"95", s:"%", l:"Model accuracy" },
              { n:"130", s:"+", l:"Symptoms supported" },
              { n:"<1", s:"s", l:"Prediction time" },
            ].map(({ n, s, l }) => (
              <div className="reg-stat-box" key={l}>
                <div className="reg-stat-num">{n}<span>{s}</span></div>
                <div className="reg-stat-label">{l}</div>
              </div>
            ))}
          </div>

          <div className="reg-disease-tags">
            {previewDiseases.map((d) => (
              <span className="reg-dtag" key={d}>{d}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
