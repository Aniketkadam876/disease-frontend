import React, { useState, useRef, useEffect } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=IBM+Plex+Mono:wght@400;500&family=Lato:wght@300;400&display=swap');

  .cb-root {
    min-height: 100vh; background: #060809;
    font-family: 'Lato', sans-serif;
    position: relative; overflow: hidden;
  }
  .cb-grid {
    position: fixed; inset: 0;
    background-image:
      linear-gradient(rgba(238,243,248,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(238,243,248,0.04) 1px, transparent 1px);
    background-size: 50px 50px;
    pointer-events: none; z-index: 0;
  }
  .cb-orb-1 {
    position: fixed; top: -80px; right: -80px;
    width: 450px; height: 450px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,229,160,0.06) 0%, transparent 65%);
    pointer-events: none; z-index: 0;
  }
  .cb-orb-2 {
    position: fixed; bottom: -100px; left: -100px;
    width: 380px; height: 380px; border-radius: 50%;
    background: radial-gradient(circle, rgba(56,182,255,0.04) 0%, transparent 65%);
    pointer-events: none; z-index: 0;
  }

  .cb-body {
    position: relative; z-index: 1;
    max-width: 760px; margin: 0 auto;
    padding: 5.5rem 1.5rem 2rem;
    display: flex; flex-direction: column;
    height: 100vh; box-sizing: border-box;
  }

  /* header */
  .cb-header {
    margin-bottom: 1.25rem;
    animation: cbFadeUp 0.5s ease both;
    flex-shrink: 0;
  }
  @keyframes cbFadeUp {
    from { opacity:0; transform:translateY(14px); }
    to   { opacity:1; transform:translateY(0); }
  }
  .cb-eyebrow {
    display: flex; align-items: center; gap: 8px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.68rem; letter-spacing: 0.1em;
    text-transform: uppercase; color: #00e5a0; margin-bottom: 4px;
  }
  .cb-eyebrow-dot {
    width: 6px; height: 6px; border-radius: 50%; background: #00e5a0;
    animation: cbBlink 2s ease infinite;
  }
  @keyframes cbBlink { 0%,100%{opacity:1} 50%{opacity:0} }
  .cb-title {
    font-family: 'Syne', sans-serif; font-weight: 800;
    font-size: clamp(1.4rem, 2.5vw, 2rem); color: #eef3f8; line-height: 1.1;
  }
  .cb-title em { font-style: italic; color: #00e5a0; }
  .cb-sub { font-size: 0.82rem; color: rgba(238,243,248,0.4); margin-top: 3px; }

  /* tracked symptoms strip */
  .cb-tracked {
    background: rgba(0,229,160,0.05);
    border: 1px solid rgba(0,229,160,0.15);
    border-radius: 10px; padding: 10px 14px;
    margin-bottom: 10px; flex-shrink: 0;
    animation: cbFadeUp 0.3s ease both;
  }
  .cb-tracked-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.62rem; letter-spacing: 0.1em;
    text-transform: uppercase; color: rgba(0,229,160,0.6);
    margin-bottom: 7px;
  }
  .cb-tracked-chips { display: flex; flex-wrap: wrap; gap: 5px; }
  .cb-tracked-chip {
    padding: 3px 10px; border-radius: 999px;
    background: rgba(0,229,160,0.08); border: 1px solid rgba(0,229,160,0.2);
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.7rem; color: #00e5a0;
  }

  /* chat window */
  .cb-window {
    flex: 1; overflow-y: auto; min-height: 0;
    background: rgba(11,16,20,0.7);
    border: 1px solid rgba(238,243,248,0.08);
    border-radius: 14px; padding: 20px;
    margin-bottom: 10px;
    backdrop-filter: blur(10px);
    animation: cbFadeUp 0.5s ease 0.1s both;
    scrollbar-width: thin; scrollbar-color: rgba(238,243,248,0.08) transparent;
  }
  .cb-window::-webkit-scrollbar { width: 3px; }
  .cb-window::-webkit-scrollbar-track { background: transparent; }
  .cb-window::-webkit-scrollbar-thumb { background: rgba(238,243,248,0.08); border-radius: 99px; }

  /* message row */
  .cb-msg-row { display: flex; margin-bottom: 14px; animation: cbFadeUp 0.25s ease both; }
  .cb-msg-row.user { justify-content: flex-end; }
  .cb-msg-row.bot  { justify-content: flex-start; }

  .cb-msg-wrap { max-width: 78%; display: flex; flex-direction: column; }
  .cb-msg-row.user .cb-msg-wrap { align-items: flex-end; }

  .cb-msg-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.6rem; letter-spacing: 0.09em;
    text-transform: uppercase; margin-bottom: 4px;
    color: rgba(238,243,248,0.3);
  }

  .cb-bubble {
    padding: 10px 14px; border-radius: 12px;
    font-size: 0.875rem; line-height: 1.65;
    white-space: pre-wrap;
  }
  .cb-bubble.bot {
    background: rgba(238,243,248,0.04);
    border: 1px solid rgba(238,243,248,0.08);
    color: rgba(238,243,248,0.78);
    border-radius: 4px 12px 12px 12px;
  }
  .cb-bubble.user {
    background: rgba(0,229,160,0.10);
    border: 1px solid rgba(0,229,160,0.22);
    color: #00e5a0;
    border-radius: 12px 4px 12px 12px;
    font-family: 'IBM Plex Mono', monospace; font-size: 0.82rem;
  }

  /* disease detail card inside bubble */
  .cb-disease-card {
    margin-top: 10px;
    background: rgba(0,229,160,0.05);
    border: 1px solid rgba(0,229,160,0.18);
    border-radius: 10px; padding: 14px;
    font-size: 0.82rem;
  }
  .cb-disease-title {
    font-family: 'Syne', sans-serif; font-weight: 700;
    font-size: 1.1rem; color: #00e5a0; margin-bottom: 12px;
  }
  .cb-disease-row {
    display: flex; align-items: flex-start; gap: 8px;
    padding: 6px 0; border-bottom: 1px solid rgba(238,243,248,0.05);
    color: rgba(238,243,248,0.6); font-size: 0.82rem;
  }
  .cb-disease-row:last-of-type { border-bottom: none; }
  .cb-disease-row-label { color: rgba(238,243,248,0.3); min-width: 70px; font-family: 'IBM Plex Mono', monospace; font-size: 0.7rem; letter-spacing: 0.05em; text-transform: uppercase; margin-top: 1px; }
  .cb-disease-row-val { color: rgba(238,243,248,0.75); }
  .cb-disease-row-val.green { color: #00e5a0; }
  .cb-disease-row-val.amber { color: #f5a623; }
  .cb-disease-row-val.red   { color: #fca5a5; }

  /* confidence bar in disease card */
  .cb-conf-wrap { margin-top: 10px; }
  .cb-conf-row  { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
  .cb-conf-lbl  { font-family:'IBM Plex Mono',monospace; font-size:0.65rem; color:rgba(238,243,248,0.3); letter-spacing:0.06em; text-transform:uppercase; }
  .cb-conf-pct  { font-family:'IBM Plex Mono',monospace; font-size:0.72rem; color:#00e5a0; }
  .cb-conf-track { height: 3px; border-radius: 2px; background: rgba(238,243,248,0.07); overflow:hidden; }
  .cb-conf-fill  { height:100%; border-radius:2px; transition:width 0.8s ease; }

  /* top3 inside disease card */
  .cb-top3 { margin-top: 10px; }
  .cb-top3-label { font-family:'IBM Plex Mono',monospace; font-size:0.62rem; letter-spacing:0.1em; text-transform:uppercase; color:rgba(238,243,248,0.25); margin-bottom:8px; }
  .cb-top3-row { display:flex; justify-content:space-between; align-items:center; padding:6px 0; border-bottom:1px solid rgba(238,243,248,0.05); }
  .cb-top3-row:last-child { border-bottom:none; }
  .cb-top3-left { display:flex; align-items:center; gap:8px; }
  .cb-top3-rank { width:18px;height:18px;border-radius:50%; display:flex;align-items:center;justify-content:center; font-family:'Syne',sans-serif;font-weight:800;font-size:0.6rem; flex-shrink:0; }
  .cb-top3-rank.first { background:rgba(0,229,160,0.15); color:#00e5a0; }
  .cb-top3-rank.other { background:rgba(238,243,248,0.05); color:rgba(238,243,248,0.3); }
  .cb-top3-name { font-size:0.8rem; }
  .cb-top3-name.first { color:#eef3f8; font-weight:500; }
  .cb-top3-name.other { color:rgba(238,243,248,0.45); }
  .cb-top3-right { display:flex;align-items:center;gap:8px; }
  .cb-risk-pill { font-family:'IBM Plex Mono',monospace;font-size:0.62rem;padding:2px 7px;border-radius:999px; }
  .cb-risk-low  { background:rgba(0,229,160,0.09);border:1px solid rgba(0,229,160,0.2);color:#00e5a0; }
  .cb-risk-mid  { background:rgba(245,166,35,0.09);border:1px solid rgba(245,166,35,0.2);color:#f5a623; }
  .cb-risk-high { background:rgba(239,68,68,0.09);border:1px solid rgba(239,68,68,0.2);color:#fca5a5; }
  .cb-top3-pct  { font-family:'IBM Plex Mono',monospace;font-size:0.72rem;color:rgba(238,243,248,0.4); min-width:34px; text-align:right; }

  /* typing indicator */
  .cb-typing { display:flex; justify-content:flex-start; margin-bottom:14px; }
  .cb-typing-bubble {
    background: rgba(238,243,248,0.04);
    border: 1px solid rgba(238,243,248,0.08);
    border-radius: 4px 12px 12px 12px;
    padding: 12px 16px;
    display: flex; align-items: center; gap: 5px;
  }
  .cb-typing-dot {
    width: 6px; height: 6px; border-radius: 50%; background: rgba(0,229,160,0.6);
    animation: cbBounce 1.2s infinite;
  }
  @keyframes cbBounce {
    0%,60%,100% { transform:translateY(0); }
    30%          { transform:translateY(-5px); }
  }

  /* quick suggestions */
  .cb-suggestions {
    display: flex; gap: 6px; margin-bottom: 10px;
    flex-wrap: wrap; flex-shrink: 0;
    animation: cbFadeUp 0.5s ease 0.15s both;
  }
  .cb-suggestion-btn {
    padding: 5px 13px; border-radius: 999px;
    background: rgba(238,243,248,0.04);
    border: 1px solid rgba(238,243,248,0.08);
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.7rem; color: rgba(238,243,248,0.4);
    cursor: pointer; transition: all 0.18s; white-space: nowrap;
  }
  .cb-suggestion-btn:hover {
    border-color: rgba(0,229,160,0.3); color: #00e5a0;
    background: rgba(0,229,160,0.05);
  }

  /* input row */
  .cb-input-row {
    display: flex; gap: 8px; flex-shrink: 0;
    animation: cbFadeUp 0.5s ease 0.2s both;
  }
  .cb-input {
    flex: 1; background: rgba(11,16,20,0.8);
    border: 1px solid rgba(238,243,248,0.09);
    border-radius: 10px; padding: 11px 15px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.85rem; color: #eef3f8; outline: none;
    transition: border-color 0.18s;
    backdrop-filter: blur(10px);
  }
  .cb-input::placeholder { color: rgba(238,243,248,0.2); }
  .cb-input:focus { border-color: rgba(0,229,160,0.35); }

  .cb-send-btn {
    padding: 11px 22px; border-radius: 10px;
    background: #00e5a0; color: #060809;
    font-family: 'Syne', sans-serif; font-weight: 700;
    font-size: 0.875rem; border: none; cursor: pointer;
    transition: all 0.18s; white-space: nowrap;
    display: flex; align-items: center; gap: 7px;
  }
  .cb-send-btn:hover:not(:disabled) { background: #10fdb5; }
  .cb-send-btn:disabled {
    background: rgba(238,243,248,0.06);
    color: rgba(238,243,248,0.2); cursor: not-allowed;
  }

  .cb-disclaimer {
    text-align: center; margin-top: 8px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.6rem; color: rgba(238,243,248,0.15);
    letter-spacing: 0.04em; flex-shrink: 0;
  }

  @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  .cb-spinner {
    width: 12px; height: 12px;
    border: 2px solid rgba(6,8,9,0.3); border-top-color: #060809;
    border-radius: 50%; animation: spin 0.7s linear infinite;
  }
`;

// ─── Sub-components ───────────────────────────────────────────────────────────
function ConfBar({ score }) {
  const color = score >= 70 ? "#00e5a0" : score >= 40 ? "#f5a623" : "#fca5a5";
  return (
    <div className="cb-conf-wrap">
      <div className="cb-conf-row">
        <span className="cb-conf-lbl">Match Confidence</span>
        <span className="cb-conf-pct" style={{ color }}>{score}%</span>
      </div>
      <div className="cb-conf-track">
        <div className="cb-conf-fill" style={{ width: `${score}%`, background: color }} />
      </div>
    </div>
  );
}

function Top3({ top3 }) {
  if (!top3?.length) return null;
  const riskCls = (r) =>
    r === "Low" ? "cb-risk-low" : r === "High" ? "cb-risk-high" : "cb-risk-mid";
  return (
    <div className="cb-top3">
      <div className="cb-top3-label">Possible Conditions</div>
      {top3.map((item, i) => (
        <div className="cb-top3-row" key={i}>
          <div className="cb-top3-left">
            <span className={`cb-top3-rank ${i === 0 ? "first" : "other"}`}>{i + 1}</span>
            <span className={`cb-top3-name ${i === 0 ? "first" : "other"}`}>{item.disease}</span>
          </div>
          <div className="cb-top3-right">
            <span className={`cb-risk-pill ${riskCls(item.risk)}`}>{item.risk}</span>
            <span className="cb-top3-pct">{item.confidence}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function DiseaseCard({ data }) {
  if (!data?.disease) return null;
  const riskCls =
    data.risk === "Low"  ? "green" :
    data.risk === "High" ? "red"   : "amber";
  return (
    <div className="cb-disease-card">
      <div className="cb-disease-title">⬡ {data.disease}</div>
      {[
        { label: "Risk",      value: data.risk,   cls: riskCls },
        { label: "Treatment", value: data.cures,  cls: "" },
        { label: "See a",     value: data.doctor, cls: "" },
      ].map(({ label, value, cls }) => (
        <div className="cb-disease-row" key={label}>
          <span className="cb-disease-row-label">{label}</span>
          <span className={`cb-disease-row-val${cls ? ` ${cls}` : ""}`}>{value}</span>
        </div>
      ))}
      <ConfBar score={data.confidence} />
      <Top3 top3={data.top3} />
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="cb-typing">
      <div className="cb-typing-bubble">
        {[0, 1, 2].map((i) => (
          <div key={i} className="cb-typing-dot" style={{ animationDelay: `${i * 0.2}s` }} />
        ))}
      </div>
    </div>
  );
}

// parse **bold** markdown
function ParsedText({ text }) {
  return text?.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1
      ? <strong key={i} style={{ color: "#00e5a0", fontWeight: 600 }}>{part}</strong>
      : part
  );
}

const QUICK_SUGGESTIONS = ["fever, cough", "headache, fatigue", "chest pain", "reset", "help"];

// ─── ChatBot ──────────────────────────────────────────────────────────────────
export default function ChatBot({ user }) {
  const [msg, setMsg]           = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [tracked, setTracked]   = useState([]);
  const chatEndRef              = useRef(null);
  const sessionId               = useRef(user?.id || `session_${Math.random().toString(36).slice(2)}`);

  const [chat, setChat] = useState([
    {
      from: "bot",
      text: "Hello! I'm DiagnoBot — your AI health assistant.\nDescribe your symptoms and I'll help identify possible conditions.",
      data: null,
    },
  ]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, isTyping]);

  if (!user) return null;

  const sendMessage = async (overrideMsg) => {
    const text = (overrideMsg || msg).trim();
    if (!text) return;

    setChat((prev) => [...prev, { from: "user", text, data: null }]);
    setMsg("");
    setIsTyping(true);

    try {
      const res = await api.post("/chat", { message: text, session_id: sessionId.current });
      const data = res.data;

      // track detected symptoms
      if (data.response?.includes("I noted:")) {
        const match = data.response.match(/I noted: (.+?)\./);
        if (match) setTracked(match[1].split(", ").map((s) => s.trim()));
      }
      if (data.disease || data.response?.includes("cleared")) setTracked([]);

      setChat((prev) => [...prev, { from: "bot", text: data.response, data }]);
    } catch {
      setChat((prev) => [
        ...prev,
        { from: "bot", text: "⚠ Something went wrong. Please try again.", data: null },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <div className="cb-root">
      <style>{styles}</style>
      <div className="cb-grid" />
      <div className="cb-orb-1" />
      <div className="cb-orb-2" />

      <Navbar user={user} />

      <div className="cb-body">
        {/* Header */}
        <div className="cb-header">
          <div className="cb-eyebrow">
            <span className="cb-eyebrow-dot" />
            diagnobot · ai triage assistant
          </div>
          <h1 className="cb-title">Talk to the <em>AI</em>.</h1>
          <p className="cb-sub">Describe symptoms naturally — the bot asks follow-ups and runs the ML model.</p>
        </div>

        {/* Tracked symptoms */}
        {tracked.length > 0 && (
          <div className="cb-tracked">
            <div className="cb-tracked-label">// tracked symptoms</div>
            <div className="cb-tracked-chips">
              {tracked.map((s) => (
                <span className="cb-tracked-chip" key={s}>{s}</span>
              ))}
            </div>
          </div>
        )}

        {/* Chat window */}
        <div className="cb-window">
          {chat.map((c, i) => (
            <div key={i} className={`cb-msg-row ${c.from}`}>
              <div className="cb-msg-wrap">
                <div className="cb-msg-label">
                  {c.from === "user" ? "you" : "diagnobot"}
                </div>
                <div className={`cb-bubble ${c.from}`}>
                  <ParsedText text={c.text} />
                  {c.from === "bot" && c.data?.disease && <DiseaseCard data={c.data} />}
                </div>
              </div>
            </div>
          ))}

          {isTyping && <TypingIndicator />}
          <div ref={chatEndRef} />
        </div>

        {/* Quick suggestions */}
        <div className="cb-suggestions">
          {QUICK_SUGGESTIONS.map((s) => (
            <button key={s} className="cb-suggestion-btn" onClick={() => sendMessage(s)}>
              {s}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="cb-input-row">
          <input
            className="cb-input"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe your symptoms..."
            disabled={isTyping}
          />
          <button
            className="cb-send-btn"
            onClick={() => sendMessage()}
            disabled={isTyping || !msg.trim()}
          >
            {isTyping ? (
              <><div className="cb-spinner" /> waiting</>
            ) : (
              <>
                send
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 6l10-4-4 9-2-4-4-1z" fill="#060809"/>
                </svg>
              </>
            )}
          </button>
        </div>

        <p className="cb-disclaimer">
          ⚠ not a substitute for professional medical advice — always consult a qualified physician
        </p>
      </div>
    </div>
  );
}
