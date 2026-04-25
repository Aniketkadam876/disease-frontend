import React, { useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=IBM+Plex+Mono:wght@400;500&family=Lato:wght@300;400&display=swap');

  .dash-root {
    min-height: 100vh;
    background: #060809;
    font-family: 'Lato', sans-serif;
    position: relative; overflow-x: hidden;
  }
  .dash-grid {
    position: fixed; inset: 0;
    background-image:
      linear-gradient(rgba(238,243,248,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(238,243,248,0.04) 1px, transparent 1px);
    background-size: 50px 50px;
    pointer-events: none; z-index: 0;
  }
  .dash-orb-1 {
    position: fixed; top: -80px; right: -80px;
    width: 450px; height: 450px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,229,160,0.06) 0%, transparent 65%);
    pointer-events: none; z-index: 0;
  }
  .dash-orb-2 {
    position: fixed; bottom: -100px; left: -100px;
    width: 380px; height: 380px; border-radius: 50%;
    background: radial-gradient(circle, rgba(56,182,255,0.04) 0%, transparent 65%);
    pointer-events: none; z-index: 0;
  }

  .dash-body {
    position: relative; z-index: 1;
    max-width: 680px; margin: 0 auto;
    padding: 5.5rem 1.5rem 3rem;
  }

  /* header */
  .dash-header {
    margin-bottom: 2.5rem;
    animation: dashFadeUp 0.5s ease both;
  }
  @keyframes dashFadeUp {
    from { opacity:0; transform:translateY(16px); }
    to   { opacity:1; transform:translateY(0); }
  }
  .dash-eyebrow {
    display: flex; align-items: center; gap: 8px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.68rem; letter-spacing: 0.1em;
    text-transform: uppercase; color: #00e5a0;
    margin-bottom: 0.5rem;
  }
  .dash-pulse {
    width: 7px; height: 7px; border-radius: 50%;
    background: #00e5a0; position: relative; flex-shrink: 0;
  }
  .dash-pulse::after {
    content:''; position:absolute; inset:-4px; border-radius:50%;
    border: 1.5px solid #00e5a0; opacity:0.4;
    animation: dashPulse 1.8s ease-in-out infinite;
  }
  @keyframes dashPulse {
    0%,100%{ transform:scale(1); opacity:0.4; }
    50%    { transform:scale(1.5); opacity:0; }
  }
  .dash-title {
    font-family: 'Syne', sans-serif; font-weight: 800;
    font-size: clamp(1.6rem, 3vw, 2.4rem);
    color: #eef3f8; line-height: 1.1;
  }
  .dash-title em { font-style: italic; color: #00e5a0; }
  .dash-sub {
    font-size: 0.875rem; color: rgba(238,243,248,0.45);
    margin-top: 0.35rem;
  }

  /* input area */
  .dash-input-wrap {
    background: rgba(11,16,20,0.7);
    border: 1px solid rgba(238,243,248,0.08);
    border-radius: 14px; overflow: hidden;
    backdrop-filter: blur(10px);
    animation: dashFadeUp 0.5s ease 0.1s both;
  }
  .dash-input-header {
    padding: 12px 18px;
    border-bottom: 1px solid rgba(238,243,248,0.06);
    background: rgba(238,243,248,0.02);
    display: flex; align-items: center; gap: 8px;
  }
  .dash-input-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.68rem; letter-spacing: 0.1em;
    text-transform: uppercase; color: rgba(238,243,248,0.35);
  }
  .dash-input-label-bar {
    width: 3px; height: 11px; border-radius: 2px;
    background: #00e5a0; flex-shrink: 0;
  }
  .dash-textarea {
    width: 100%; min-height: 110px;
    background: transparent;
    border: none; outline: none; resize: none;
    padding: 16px 18px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.875rem; color: #eef3f8; line-height: 1.65;
    box-sizing: border-box;
  }
  .dash-textarea::placeholder { color: rgba(238,243,248,0.2); }
  .dash-input-footer {
    padding: 12px 18px;
    border-top: 1px solid rgba(238,243,248,0.06);
    display: flex; align-items: center; justify-content: space-between;
    gap: 12px;
  }
  .dash-char-hint {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.68rem; color: rgba(238,243,248,0.25);
  }
  .dash-predict-btn {
    display: flex; align-items: center; gap: 8px;
    padding: 10px 24px; border-radius: 8px;
    background: #00e5a0; color: #060809;
    font-family: 'Syne', sans-serif; font-weight: 700;
    font-size: 0.875rem; border: none; cursor: pointer;
    transition: all 0.18s; white-space: nowrap;
  }
  .dash-predict-btn:hover:not(:disabled) { background: #10fdb5; transform: translateY(-1px); }
  .dash-predict-btn:disabled {
    background: rgba(0,229,160,0.25); color: rgba(6,8,9,0.4);
    cursor: not-allowed; transform: none;
  }

  /* spinner */
  @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  .dash-spinner {
    width: 13px; height: 13px;
    border: 2px solid rgba(6,8,9,0.3); border-top-color: #060809;
    border-radius: 50%; animation: spin 0.7s linear infinite;
  }

  /* results */
  .dash-results { margin-top: 1.5rem; display: flex; flex-direction: column; gap: 12px; }
  .dash-empty {
    text-align: center; padding: 3rem;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.78rem; color: rgba(238,243,248,0.2);
    letter-spacing: 0.05em;
    border: 1px dashed rgba(238,243,248,0.07);
    border-radius: 12px;
  }

  /* result card */
  .dash-result-card {
    background: rgba(11,16,20,0.7);
    border: 1px solid rgba(238,243,248,0.08);
    border-radius: 14px; overflow: hidden;
    backdrop-filter: blur(10px);
    animation: dashSlideIn 0.3s ease forwards; opacity:0;
    transition: border-color 0.2s;
  }
  .dash-result-card:hover { border-color: rgba(0,229,160,0.18); }
  @keyframes dashSlideIn {
    from { transform:translateY(10px); opacity:0; }
    to   { transform:translateY(0);    opacity:1; }
  }

  .dash-card-top {
    padding: 14px 18px;
    display: flex; align-items: center; justify-content: space-between;
    border-bottom: 1px solid rgba(238,243,248,0.06);
    background: rgba(238,243,248,0.02);
    gap: 12px;
  }
  .dash-disease-name {
    font-family: 'Syne', sans-serif; font-weight: 700;
    font-size: 1rem; color: #eef3f8;
  }
  .dash-conf-badge {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.72rem; font-weight: 500;
    padding: 4px 11px; border-radius: 999px; flex-shrink: 0;
  }
  .dash-conf-high { background: rgba(0,229,160,0.10); border: 1px solid rgba(0,229,160,0.25); color: #00e5a0; }
  .dash-conf-mid  { background: rgba(245,166,35,0.10); border: 1px solid rgba(245,166,35,0.25); color: #f5a623; }
  .dash-conf-low  { background: rgba(239,68,68,0.10);  border: 1px solid rgba(239,68,68,0.25);  color: #fca5a5; }

  .dash-bar-track {
    height: 2px; background: rgba(238,243,248,0.05); overflow: hidden;
  }
  .dash-bar-fill { height: 100%; transition: width 0.8s cubic-bezier(0.4,0,0.2,1); }

  .dash-meta-grid {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 1px; background: rgba(238,243,248,0.05);
  }
  .dash-meta-cell {
    padding: 13px 16px;
    background: rgba(11,16,20,0.7);
  }
  .dash-meta-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.62rem; letter-spacing: 0.09em;
    text-transform: uppercase; color: rgba(238,243,248,0.3);
    margin-bottom: 5px;
  }
  .dash-meta-val {
    font-size: 0.875rem; color: rgba(238,243,248,0.75); font-weight: 500;
  }
  .dash-risk-high { color: #fca5a5; }
  .dash-risk-mid  { color: #f5a623; }
  .dash-risk-low  { color: #00e5a0; }

  /* disclaimer */
  .dash-disclaimer {
    margin-top: 2rem; text-align: center;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.65rem; color: rgba(238,243,248,0.18);
    letter-spacing: 0.04em; line-height: 1.6;
  }
`;

// ─── ResultCard ───────────────────────────────────────────────────────────────
function ResultCard({ r, index }) {
  const confClass =
    r.confidence >= 75 ? "dash-conf-high" :
    r.confidence >= 50 ? "dash-conf-mid"  : "dash-conf-low";
  const barColor =
    r.confidence >= 75 ? "#00e5a0" :
    r.confidence >= 50 ? "#f5a623" : "#ef4444";
  const riskClass =
    r.risk === "Low"  ? "dash-risk-low"  :
    r.risk === "High" ? "dash-risk-high" : "dash-risk-mid";

  return (
    <div
      className="dash-result-card"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="dash-card-top">
        <span className="dash-disease-name">{r.disease}</span>
        <span className={`dash-conf-badge ${confClass}`}>{r.confidence}%</span>
      </div>

      <div className="dash-bar-track">
        <div
          className="dash-bar-fill"
          style={{ width: `${r.confidence}%`, background: barColor }}
        />
      </div>

      <div className="dash-meta-grid">
        <div className="dash-meta-cell">
          <div className="dash-meta-label">Risk</div>
          <div className={`dash-meta-val ${riskClass}`}>{r.risk}</div>
        </div>
        <div className="dash-meta-cell">
          <div className="dash-meta-label">Treatment</div>
          <div className="dash-meta-val">{r.cures}</div>
        </div>
        <div className="dash-meta-cell">
          <div className="dash-meta-label">Specialist</div>
          <div className="dash-meta-val">{r.doctor}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
export default function Dashboard({ user }) {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult]     = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  if (!user) {
    window.location.href = "/";
    return null;
  }

  const handlePredict = async () => {
    if (!symptoms.trim()) return;
    setLoading(true); setError(""); setResult(null);
    try {
      const res = await api.post("/predict", { user_id: user.user_id, symptoms });
      if (res.data.message) { setError(res.data.message); return; }
      if (res.data.predictions) setResult(res.data.predictions);
    } catch {
      setError("Server error — please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dash-root">
      <style>{styles}</style>
      <div className="dash-grid" />
      <div className="dash-orb-1" />
      <div className="dash-orb-2" />

      <Navbar user={user} />

      <div className="dash-body">
        {/* Header */}
        <div className="dash-header">
          <div className="dash-eyebrow">
            <span className="dash-pulse" />
            symptom_analysis.exe
          </div>
          <h1 className="dash-title">
            What are you<br/><em>feeling today?</em>
          </h1>
          <p className="dash-sub">
            Describe your symptoms and the ML model will predict possible conditions.
          </p>
        </div>

        {/* Input card */}
        <div className="dash-input-wrap">
          <div className="dash-input-header">
            <span className="dash-input-label-bar" />
            <span className="dash-input-label">Input Symptoms</span>
          </div>
          <textarea
            className="dash-textarea"
            rows={4}
            placeholder="e.g. fever, headache, fatigue, sore throat..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && e.ctrlKey) handlePredict(); }}
          />
          <div className="dash-input-footer">
            <span className="dash-char-hint">
              {symptoms.length > 0
                ? `${symptoms.split(",").filter(s => s.trim()).length} symptom(s) · Ctrl+Enter to run`
                : "// separate symptoms with commas"}
            </span>
            <button
              className="dash-predict-btn"
              onClick={handlePredict}
              disabled={loading || !symptoms.trim()}
            >
              {loading ? (
                <><div className="dash-spinner" /> Analyzing...</>
              ) : (
                <>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M1 6h2.5l1.5-3.5L7.5 11 9 7.5H12" stroke="#060809" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Run Prediction
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            marginTop: 12,
            background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.25)",
            borderRadius: 10, padding: "10px 14px",
            fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.78rem", color: "#fca5a5",
          }}>
            ⚠ {error}
          </div>
        )}

        {/* Results */}
        <div className="dash-results">
          {!result ? (
            <div className="dash-empty">
              // no predictions yet — enter symptoms above
            </div>
          ) : (
            result.map((r, i) => <ResultCard key={i} r={r} index={i} />)
          )}
        </div>

        <p className="dash-disclaimer">
          ⚠ DiagnoAI is for informational purposes only.<br/>
          Always consult a qualified physician before making any medical decisions.
        </p>
      </div>
    </div>
  );
}
