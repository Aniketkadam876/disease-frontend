import React from "react";
import Navbar from "../components/Navbar";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=IBM+Plex+Mono:wght@400;500&family=Lato:wght@300;400&display=swap');

  .prof-root {
    min-height: 100vh;
    background: #060809;
    font-family: 'Lato', sans-serif;
    position: relative;
    overflow-x: hidden;
  }

  /* grid */
  .prof-grid {
    position: fixed; inset: 0;
    background-image:
      linear-gradient(rgba(238,243,248,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(238,243,248,0.04) 1px, transparent 1px);
    background-size: 50px 50px;
    pointer-events: none; z-index: 0;
  }

  /* orbs */
  .prof-orb-1 {
    position: fixed; top: -120px; right: -120px;
    width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,229,160,0.06) 0%, transparent 65%);
    pointer-events: none; z-index: 0;
  }
  .prof-orb-2 {
    position: fixed; bottom: -100px; left: -100px;
    width: 400px; height: 400px; border-radius: 50%;
    background: radial-gradient(circle, rgba(56,182,255,0.04) 0%, transparent 65%);
    pointer-events: none; z-index: 0;
  }

  .prof-body {
    position: relative; z-index: 1;
    padding: 6rem 1.5rem 4rem;
    display: flex; justify-content: center;
  }

  .prof-layout {
    width: 100%; max-width: 820px;
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 16px;
    align-items: start;
  }

  /* ── LEFT CARD — avatar + name ── */
  .prof-id-card {
    background: rgba(11,16,20,0.7);
    border: 1px solid rgba(238,243,248,0.08);
    border-radius: 14px;
    overflow: hidden;
    backdrop-filter: blur(10px);
    animation: profFadeUp 0.5s ease both;
  }
  @keyframes profFadeUp {
    from { opacity:0; transform:translateY(18px); }
    to   { opacity:1; transform:translateY(0); }
  }

  .prof-id-top {
    padding: 2rem 1.5rem;
    display: flex; flex-direction: column; align-items: center; gap: 14px;
    border-bottom: 1px solid rgba(238,243,248,0.07);
    background: rgba(238,243,248,0.02);
    position: relative;
  }
  /* scan-line animation behind avatar */
  .prof-id-top::before {
    content: '';
    position: absolute; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, #00e5a0, transparent);
    animation: profScan 3.5s ease-in-out infinite;
    opacity: 0.4;
  }
  @keyframes profScan {
    0%   { top: 0; opacity:0; }
    10%  { opacity: 0.4; }
    90%  { opacity: 0.4; }
    100% { top: 100%; opacity:0; }
  }

  .prof-avatar {
    width: 76px; height: 76px; border-radius: 50%;
    background: rgba(0,229,160,0.10);
    border: 1.5px solid rgba(0,229,160,0.30);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif; font-weight: 800;
    font-size: 22px; color: #00e5a0;
    position: relative;
    box-shadow: 0 0 0 6px rgba(0,229,160,0.05);
  }
  .prof-avatar-ring {
    position: absolute; inset: -6px; border-radius: 50%;
    border: 1px dashed rgba(0,229,160,0.2);
    animation: ringRotate 12s linear infinite;
  }
  @keyframes ringRotate {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  .prof-name {
    font-family: 'Syne', sans-serif; font-weight: 700;
    font-size: 1.1rem; color: #eef3f8; text-align: center;
  }
  .prof-uid {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.72rem; color: rgba(238,243,248,0.4);
    text-align: center; letter-spacing: 0.04em;
  }
  .prof-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 4px 12px; border-radius: 999px;
    background: rgba(0,229,160,0.08);
    border: 1px solid rgba(0,229,160,0.25);
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.7rem; color: #00e5a0; letter-spacing: 0.06em;
  }
  .prof-badge-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: #00e5a0;
    animation: profblink 2s ease infinite;
  }
  @keyframes profblink { 0%,100%{opacity:1} 50%{opacity:0} }

  /* id card bottom links */
  .prof-id-bottom { padding: 1rem 1.25rem; display: flex; flex-direction: column; gap: 4px; }
  .prof-nav-link {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 10px; border-radius: 7px;
    font-size: 0.82rem; color: rgba(238,243,248,0.45);
    cursor: default; transition: all 0.2s;
    font-family: 'IBM Plex Mono', monospace;
    letter-spacing: 0.02em;
  }
  .prof-nav-link.active {
    background: rgba(0,229,160,0.07);
    border: 1px solid rgba(0,229,160,0.15);
    color: #00e5a0;
  }
  .prof-nav-link-dot { width: 4px; height: 4px; border-radius: 50%; background: currentColor; flex-shrink:0; }

  /* ── RIGHT — details ── */
  .prof-details {
    display: flex; flex-direction: column; gap: 14px;
    animation: profFadeUp 0.55s ease 0.1s both;
  }

  /* section block */
  .prof-section {
    background: rgba(11,16,20,0.7);
    border: 1px solid rgba(238,243,248,0.08);
    border-radius: 14px; overflow: hidden;
    backdrop-filter: blur(10px);
  }
  .prof-section-header {
    padding: 14px 20px;
    border-bottom: 1px solid rgba(238,243,248,0.06);
    display: flex; align-items: center; justify-content: space-between;
    background: rgba(238,243,248,0.02);
  }
  .prof-section-title {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.68rem; letter-spacing: 0.1em;
    text-transform: uppercase; color: #00e5a0;
    display: flex; align-items: center; gap: 7px;
  }
  .prof-section-title-bar {
    width: 3px; height: 12px; border-radius: 2px;
    background: #00e5a0;
  }

  /* rows */
  .prof-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 13px 20px;
    border-bottom: 1px solid rgba(238,243,248,0.04);
  }
  .prof-row:last-child { border-bottom: none; }
  .prof-row-label {
    font-size: 0.78rem; color: rgba(238,243,248,0.4);
    font-family: 'IBM Plex Mono', monospace; letter-spacing: 0.03em;
  }
  .prof-row-val {
    font-size: 0.88rem; color: #eef3f8; font-weight: 400;
  }
  .prof-row-val.mono {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.8rem; color: rgba(238,243,248,0.7);
  }
  .prof-row-val.green {
    color: #00e5a0;
    font-family: 'IBM Plex Mono', monospace; font-size: 0.78rem;
  }

  /* stats row */
  .prof-stats-row {
    display: grid; grid-template-columns: repeat(3, 1fr);
  }
  .prof-stat-cell {
    padding: 1.25rem 1.5rem;
    border-right: 1px solid rgba(238,243,248,0.06);
    text-align: center;
  }
  .prof-stat-cell:last-child { border-right: none; }
  .prof-stat-n {
    font-family: 'Syne', sans-serif; font-weight: 800;
    font-size: 1.6rem; color: #eef3f8; line-height: 1;
  }
  .prof-stat-n span { color: #00e5a0; }
  .prof-stat-l {
    font-size: 0.72rem; color: rgba(238,243,248,0.38);
    margin-top: 4px;
    font-family: 'IBM Plex Mono', monospace;
    letter-spacing: 0.04em;
  }

  /* action button */
  .prof-action-wrap {
    background: rgba(11,16,20,0.7);
    border: 1px solid rgba(238,243,248,0.08);
    border-radius: 14px; padding: 1.25rem 1.5rem;
    display: flex; align-items: center; justify-content: space-between;
    gap: 1rem; backdrop-filter: blur(10px);
  }
  .prof-action-text {
    font-size: 0.82rem; color: rgba(238,243,248,0.38);
    font-family: 'IBM Plex Mono', monospace;
  }
  .prof-edit-btn {
    padding: 9px 22px; border-radius: 8px;
    background: transparent;
    border: 1px solid rgba(238,243,248,0.12);
    color: rgba(238,243,248,0.3);
    font-family: 'Syne', sans-serif; font-weight: 700;
    font-size: 0.82rem; cursor: not-allowed;
    display: flex; align-items: center; gap: 7px;
  }
  .prof-edit-soon {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.65rem; letter-spacing: 0.08em;
    padding: 2px 7px; border-radius: 4px;
    background: rgba(245,166,35,0.1);
    border: 1px solid rgba(245,166,35,0.25);
    color: #f5a623;
  }

  @media (max-width: 720px) {
    .prof-layout { grid-template-columns: 1fr; }
    .prof-stats-row { grid-template-columns: repeat(3, 1fr); }
  }
`;

function getInitials(name) {
  if (!name) return "?";
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

export default function Profile({ user }) {
  if (!user) {
    window.location.href = "/";
    return null;
  }

  return (
    <>
      <style>{styles}</style>
      <div className="prof-root">
        <div className="prof-grid" />
        <div className="prof-orb-1" />
        <div className="prof-orb-2" />

        <Navbar user={user} />

        <div className="prof-body">
          <div className="prof-layout">

            {/* ── LEFT: ID card ── */}
            <div className="prof-id-card">
              <div className="prof-id-top">
                <div className="prof-avatar">
                  <div className="prof-avatar-ring" />
                  {getInitials(user.name)}
                </div>
                <div>
                  <div className="prof-name">{user.name}</div>
                  <div className="prof-uid">{user.user_id}</div>
                </div>
                <div className="prof-badge">
                  <span className="prof-badge-dot" />
                  ACTIVE
                </div>
              </div>
              <div className="prof-id-bottom">
                {[
                  { label: "profile",  active: true  },
                  { label: "history",  active: false },
                  { label: "settings", active: false },
                ].map(({ label, active }) => (
                  <div key={label} className={`prof-nav-link${active ? " active" : ""}`}>
                    <span className="prof-nav-link-dot" />
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: details ── */}
            <div className="prof-details">

              {/* stats */}
              <div className="prof-section">
                <div className="prof-stats-row">
                  {[
                    { n: "0",  s: "",  l: "predictions"   },
                    { n: "0",  s: "",  l: "saved reports"  },
                    { n: "—",  s: "",  l: "last active"    },
                  ].map(({ n, s, l }) => (
                    <div className="prof-stat-cell" key={l}>
                      <div className="prof-stat-n">{n}<span>{s}</span></div>
                      <div className="prof-stat-l">{l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* account info */}
              <div className="prof-section">
                <div className="prof-section-header">
                  <span className="prof-section-title">
                    <span className="prof-section-title-bar" />
                    ACCOUNT INFO
                  </span>
                </div>
                {[
                  { label: "FULL NAME",  value: user.name },
                  { label: "USER ID",    value: user.user_id, mono: true },
                  { label: "STATUS",     value: "● ACTIVE", green: true },
                  { label: "ACCOUNT TYPE", value: "Free tier" },
                ].map(({ label, value, mono, green }) => (
                  <div className="prof-row" key={label}>
                    <span className="prof-row-label">{label}</span>
                    <span className={`prof-row-val${mono ? " mono" : ""}${green ? " green" : ""}`}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              {/* model info */}
              <div className="prof-section">
                <div className="prof-section-header">
                  <span className="prof-section-title">
                    <span className="prof-section-title-bar" />
                    MODEL ACCESS
                  </span>
                </div>
                {[
                  { label: "ML MODEL",   value: "Random Forest v2.1" },
                  { label: "DISEASES",   value: "40+ covered" },
                  { label: "SYMPTOMS",   value: "130+ supported" },
                  { label: "CHATBOT",    value: "● Enabled", green: true },
                ].map(({ label, value, green }) => (
                  <div className="prof-row" key={label}>
                    <span className="prof-row-label">{label}</span>
                    <span className={`prof-row-val${green ? " green" : ""}`}>{value}</span>
                  </div>
                ))}
              </div>

              {/* edit button */}
              <div className="prof-action-wrap">
                <span className="prof-action-text">// profile editing not yet available</span>
                <button className="prof-edit-btn" disabled>
                  Edit profile
                  <span className="prof-edit-soon">SOON</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
