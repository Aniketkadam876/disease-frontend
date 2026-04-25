import React, { useState } from "react";
import api from "../services/api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=IBM+Plex+Mono:wght@400;500&family=Lato:wght@300;400&display=swap');

  .login-root {
    min-height: 100vh;
    background: #060809;
    display: flex;
    font-family: 'Lato', sans-serif;
    position: relative;
    overflow: hidden;
  }

  /* grid background */
  .login-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(238,243,248,0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(238,243,248,0.045) 1px, transparent 1px);
    background-size: 50px 50px;
    pointer-events: none;
  }

  /* green orb */
  .login-orb {
    position: absolute; top: -120px; right: -120px;
    width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,229,160,0.07) 0%, transparent 65%);
    pointer-events: none;
  }
  .login-orb-2 {
    position: absolute; bottom: -80px; left: -80px;
    width: 350px; height: 350px; border-radius: 50%;
    background: radial-gradient(circle, rgba(56,182,255,0.04) 0%, transparent 65%);
    pointer-events: none;
  }

  /* left panel */
  .login-left {
    flex: 1;
    display: flex; flex-direction: column;
    justify-content: center; padding: 4rem 5rem;
    position: relative; z-index: 2;
  }
  .login-left-logo {
    display: flex; align-items: center; gap: 10px;
    font-family: 'Syne', sans-serif; font-weight: 800;
    font-size: 1.15rem; color: #eef3f8;
    text-decoration: none; margin-bottom: 3.5rem;
  }
  .login-left-logo-icon {
    width: 28px; height: 28px; border-radius: 7px;
    background: rgba(0,229,160,0.10);
    border: 1px solid rgba(0,229,160,0.22);
    display: flex; align-items: center; justify-content: center;
  }
  .login-left-tagline {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.7rem; letter-spacing: 0.12em;
    text-transform: uppercase; color: #00e5a0;
    margin-bottom: 1rem;
  }
  .login-left h1 {
    font-family: 'Syne', sans-serif; font-weight: 800;
    font-size: clamp(2rem, 3vw, 3rem);
    line-height: 1.1; color: #eef3f8;
    margin-bottom: 1rem;
  }
  .login-left h1 em { font-style: italic; color: #00e5a0; }
  .login-left p {
    font-size: 0.95rem; color: rgba(238,243,248,0.55);
    max-width: 380px; line-height: 1.7; margin-bottom: 2.5rem;
  }
  .login-features { display: flex; flex-direction: column; gap: 12px; }
  .login-feature-row {
    display: flex; align-items: center; gap: 10px;
    font-size: 0.875rem; color: rgba(238,243,248,0.55);
  }
  .login-feature-icon {
    width: 28px; height: 28px; border-radius: 7px; flex-shrink: 0;
    background: rgba(0,229,160,0.08);
    border: 1px solid rgba(0,229,160,0.18);
    display: flex; align-items: center; justify-content: center;
  }
  .login-feature-icon svg { width: 13px; height: 13px; }

  /* right panel / form */
  .login-right {
    width: 460px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    padding: 2rem; position: relative; z-index: 2;
    border-left: 1px solid rgba(238,243,248,0.06);
    background: rgba(11,16,20,0.6);
    backdrop-filter: blur(10px);
  }
  .login-card {
    width: 100%; max-width: 360px;
    animation: loginFadeUp 0.55s ease both;
  }
  @keyframes loginFadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .login-card-eyebrow {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.68rem; letter-spacing: 0.1em;
    text-transform: uppercase; color: #00e5a0;
    margin-bottom: 0.6rem;
    display: flex; align-items: center; gap: 7px;
  }
  .login-eyebrow-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: #00e5a0;
    animation: eyeblink 2s ease infinite;
  }
  @keyframes eyeblink { 0%,100%{opacity:1} 50%{opacity:0} }

  .login-card h2 {
    font-family: 'Syne', sans-serif; font-weight: 800;
    font-size: 1.6rem; color: #eef3f8;
    margin-bottom: 0.35rem;
  }
  .login-card-sub {
    font-size: 0.875rem; color: rgba(238,243,248,0.5);
    margin-bottom: 2rem;
  }

  /* error / success banners */
  .login-error {
    background: rgba(239,68,68,0.08);
    border: 1px solid rgba(239,68,68,0.3);
    border-radius: 8px; padding: 10px 13px;
    font-size: 0.82rem; color: #fca5a5;
    margin-bottom: 1.25rem;
    font-family: 'IBM Plex Mono', monospace;
  }

  /* fields */
  .login-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }
  .login-field-header {
    display: flex; justify-content: space-between; align-items: center;
  }
  .login-label {
    font-size: 0.72rem; font-weight: 500; letter-spacing: 0.06em;
    text-transform: uppercase; color: rgba(238,243,248,0.45);
    font-family: 'IBM Plex Mono', monospace;
  }
  .login-forgot {
    font-size: 0.75rem; color: #00e5a0;
    text-decoration: none; font-family: 'IBM Plex Mono', monospace;
    transition: opacity 0.2s;
  }
  .login-forgot:hover { opacity: 0.75; }
  .login-input {
    width: 100%; padding: 10px 13px;
    background: rgba(238,243,248,0.04);
    border: 1px solid rgba(238,243,248,0.10);
    border-radius: 8px; outline: none;
    font-size: 0.9rem; color: #eef3f8;
    font-family: 'Lato', sans-serif;
    transition: border-color 0.2s, background 0.2s;
  }
  .login-input::placeholder { color: rgba(238,243,248,0.25); }
  .login-input:focus {
    border-color: rgba(0,229,160,0.45);
    background: rgba(0,229,160,0.04);
  }

  .login-btn {
    width: 100%; padding: 11px;
    border-radius: 8px; border: none;
    background: #00e5a0; color: #060809;
    font-family: 'Syne', sans-serif; font-weight: 700;
    font-size: 0.95rem; cursor: pointer;
    transition: all 0.2s; margin-top: 6px;
    display: flex; align-items: center; justify-content: center; gap: 8px;
  }
  .login-btn:hover:not(:disabled) { background: #10fdb5; transform: translateY(-1px); }
  .login-btn:disabled { background: rgba(0,229,160,0.35); cursor: not-allowed; color: rgba(6,8,9,0.5); }

  .login-divider {
    border: none; border-top: 1px solid rgba(238,243,248,0.07);
    margin: 1.25rem 0;
  }
  .login-footer-text {
    text-align: center; font-size: 0.82rem;
    color: rgba(238,243,248,0.45);
  }
  .login-footer-text a {
    color: #00e5a0; text-decoration: none;
    font-weight: 500; font-family: 'IBM Plex Mono', monospace;
    font-size: 0.8rem;
  }
  .login-footer-text a:hover { opacity: 0.75; }

  /* spinner */
  @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  .login-spinner {
    width: 14px; height: 14px;
    border: 2px solid rgba(6,8,9,0.3);
    border-top-color: #060809;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @media (max-width: 768px) {
    .login-left { display: none; }
    .login-right { width: 100%; border-left: none; background: #060809; }
  }
`;

export default function Login({ setUser }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/login", { email, password });
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      window.location.href = "/dashboard";
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => { if (e.key === "Enter") handleLogin(); };

  return (
    <>
      <style>{styles}</style>
      <div className="login-root">
        <div className="login-grid" />
        <div className="login-orb" />
        <div className="login-orb-2" />

        {/* LEFT — branding panel */}
        <div className="login-left">
          <a href="/" className="login-left-logo">
            <div className="login-left-logo-icon">
              <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                <path d="M8 1L9.8 6H15L10.5 9.2L12.3 14.5L8 11.5L3.7 14.5L5.5 9.2L1 6H6.2L8 1Z" fill="#00e5a0"/>
              </svg>
            </div>
            DiagnoAI
          </a>

          <div className="login-left-tagline">// ML-Powered Diagnosis</div>
          <h1>Welcome<br/>back, <em>doctor</em>.</h1>
          <p>Sign in to access your personalized symptom analysis dashboard, prediction history, and AI chatbot.</p>

          <div className="login-features">
            {[
              { label: "40+ diseases covered by our ML model", icon: <svg viewBox="0 0 13 13" fill="none"><path d="M1 6h2.5l1.5-3.5L7.5 11 9 7.5H12" stroke="#00e5a0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
              { label: "AI chatbot guides symptom collection", icon: <svg viewBox="0 0 13 13" fill="none"><path d="M2 3h9a.75.75 0 01.75.75v5a.75.75 0 01-.75.75H4.5L2 11V3.75A.75.75 0 012 3z" stroke="#00e5a0" strokeWidth="1.1" strokeLinejoin="round"/></svg> },
              { label: "95% accuracy on validation dataset", icon: <svg viewBox="0 0 13 13" fill="none"><path d="M2.5 7l2.5 2.5 5.5-5.5" stroke="#00e5a0" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg> },
            ].map(({ label, icon }) => (
              <div className="login-feature-row" key={label}>
                <div className="login-feature-icon">{icon}</div>
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — form */}
        <div className="login-right">
          <div className="login-card">
            <div className="login-card-eyebrow">
              <span className="login-eyebrow-dot" />
              SECURE LOGIN
            </div>
            <h2>Sign in</h2>
            <p className="login-card-sub">Enter your credentials to continue</p>

            {error && <div className="login-error">⚠ {error}</div>}

            <div className="login-field">
              <label className="login-label">Email</label>
              <input
                className="login-input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className="login-field">
              <div className="login-field-header">
                <label className="login-label">Password</label>
                <a href="/forgot-password" className="login-forgot">forgot?</a>
              </div>
              <input
                className="login-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            <button className="login-btn" onClick={handleLogin} disabled={loading}>
              {loading ? (
                <><div className="login-spinner" /> Signing in...</>
              ) : (
                <>Sign in →</>
              )}
            </button>

            <hr className="login-divider" />
            <p className="login-footer-text">
              No account?{" "}
              <a href="/register">Create one free</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
