import React, { useState, useEffect } from "react";

// ─── Global Styles ────────────────────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=IBM+Plex+Mono:wght@400;500&family=Lato:wght@300;400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --black:    #060809;
    --black-2:  #0c1014;
    --black-3:  #131920;
    --black-4:  #1a242d;
    --green:    #00e5a0;
    --green-dim:#00b37d;
    --green-glow: rgba(0,229,160,0.10);
    --green-border: rgba(0,229,160,0.22);
    --amber:    #f5a623;
    --blue:     #38b6ff;
    --white:    #eef3f8;
    --white-60: rgba(238,243,248,0.60);
    --white-20: rgba(238,243,248,0.20);
    --white-08: rgba(238,243,248,0.08);
    --border:   rgba(238,243,248,0.07);
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--black);
    color: var(--white);
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    line-height: 1.65;
    overflow-x: hidden;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulseGlow {
    0%,100% { box-shadow: 0 0 0 0 rgba(0,229,160,0.25); }
    50%      { box-shadow: 0 0 0 10px rgba(0,229,160,0); }
  }
  @keyframes scanLine {
    0%   { transform: translateY(-100%); opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 1; }
    100% { transform: translateY(700%); opacity: 0; }
  }
  @keyframes blink {
    0%,100% { opacity: 1; } 50% { opacity: 0; }
  }
  @keyframes floatOrb {
    0%,100% { transform: translateY(0px) scale(1); }
    50%      { transform: translateY(-18px) scale(1.04); }
  }
  @keyframes ticker {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  /* NAV */
  .lp-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.1rem 5rem;
    background: rgba(6,8,9,0.88);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--border);
  }
  .lp-nav-logo {
    display: flex; align-items: center; gap: 10px;
    font-family: 'Syne', sans-serif; font-weight: 800;
    font-size: 1.2rem; color: var(--white); text-decoration: none;
  }
  .lp-logo-icon {
    width: 30px; height: 30px; border-radius: 8px;
    background: var(--green-glow); border: 1px solid var(--green-border);
    display: flex; align-items: center; justify-content: center;
    animation: pulseGlow 3s ease-in-out infinite;
  }
  .lp-nav-links { display: flex; gap: 2.25rem; list-style: none; }
  .lp-nav-links a { font-size: 0.85rem; color: var(--white-60); text-decoration: none; transition: color 0.2s; }
  .lp-nav-links a:hover { color: var(--white); }
  .lp-nav-right { display: flex; gap: 10px; }
  .lp-btn-ghost { padding: 7px 16px; border-radius: 6px; border: 1px solid var(--border); background: transparent; color: var(--white-60); font-size: 0.82rem; font-family: 'Lato',sans-serif; cursor: pointer; text-decoration: none; transition: all 0.2s; }
  .lp-btn-ghost:hover { border-color: var(--white-20); color: var(--white); }
  .lp-btn-green { padding: 7px 18px; border-radius: 6px; border: none; background: var(--green); color: #060809; font-size: 0.82rem; font-weight: 700; font-family: 'Lato',sans-serif; cursor: pointer; text-decoration: none; transition: all 0.2s; }
  .lp-btn-green:hover { background: #10fdb5; }

  /* HERO */
  .lp-hero {
    min-height: 100vh; display: flex; align-items: center;
    padding: 9rem 5rem 5rem; position: relative; overflow: hidden; gap: 4rem;
  }
  .lp-hero-orb-1 { position: absolute; top: -100px; right: -100px; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(0,229,160,0.06) 0%, transparent 65%); animation: floatOrb 8s ease-in-out infinite; pointer-events: none; }
  .lp-hero-orb-2 { position: absolute; bottom: -80px; left: 30%; width: 400px; height: 400px; border-radius: 50%; background: radial-gradient(circle, rgba(56,182,255,0.04) 0%, transparent 65%); animation: floatOrb 11s ease-in-out infinite reverse; pointer-events: none; }
  .lp-hero-grid { position: absolute; inset: 0; background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px); background-size: 50px 50px; mask-image: radial-gradient(ellipse 70% 80% at 30% 50%, black 30%, transparent 100%); }
  .lp-hero-left { flex: 1; position: relative; z-index: 2; }
  .lp-hero-right { flex: 1; position: relative; z-index: 2; display: flex; justify-content: center; }
  .lp-eyebrow { display: inline-flex; align-items: center; gap: 8px; padding: 5px 14px; border-radius: 999px; border: 1px solid var(--green-border); background: var(--green-glow); color: var(--green); font-size: 0.75rem; font-family: 'IBM Plex Mono', monospace; letter-spacing: 0.06em; margin-bottom: 1.5rem; animation: fadeUp 0.5s ease both; }
  .lp-eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); animation: blink 2s ease infinite; }
  .lp-hero-h1 { font-family: 'Syne', sans-serif; font-weight: 800; font-size: clamp(2.6rem, 5vw, 4.4rem); line-height: 1.08; color: var(--white); margin-bottom: 1.5rem; animation: fadeUp 0.6s ease 0.1s both; }
  .lp-hero-h1 .acc-green { color: var(--green); }
  .lp-hero-h1 .acc-blue  { color: var(--blue); }
  .lp-hero-sub { font-size: 1.05rem; color: var(--white-60); max-width: 500px; margin-bottom: 2.5rem; line-height: 1.7; animation: fadeUp 0.6s ease 0.2s both; }
  .lp-hero-btns { display: flex; gap: 12px; flex-wrap: wrap; animation: fadeUp 0.6s ease 0.3s both; }
  .lp-btn-green-lg { padding: 13px 28px; border-radius: 8px; background: var(--green); color: #060809; font-family: 'Syne', sans-serif; font-weight: 700; font-size: 0.95rem; border: none; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s; }
  .lp-btn-green-lg:hover { background: #10fdb5; transform: translateY(-2px); }
  .lp-btn-outline-lg { padding: 13px 28px; border-radius: 8px; background: transparent; color: var(--white-60); font-family: 'Syne', sans-serif; font-size: 0.95rem; border: 1px solid var(--border); cursor: pointer; text-decoration: none; transition: all 0.2s; }
  .lp-btn-outline-lg:hover { border-color: var(--white-20); color: var(--white); }
  .lp-hero-stats { display: flex; gap: 2.5rem; margin-top: 3.5rem; animation: fadeUp 0.6s ease 0.4s both; }
  .lp-stat-num { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.9rem; color: var(--white); line-height: 1; }
  .lp-stat-num span { color: var(--green); }
  .lp-stat-label { font-size: 0.78rem; color: var(--white-60); margin-top: 3px; }

  /* SCAN CARD */
  .lp-scan-card { width: 380px; background: var(--black-2); border: 1px solid var(--green-border); border-radius: 16px; overflow: hidden; box-shadow: 0 0 60px rgba(0,229,160,0.06), 0 30px 60px rgba(0,0,0,0.5); animation: fadeUp 0.7s ease 0.3s both; }
  .lp-scan-header { background: var(--black-3); padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border); }
  .lp-scan-title { font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; color: var(--green); letter-spacing: 0.08em; }
  .lp-scan-status { display: flex; align-items: center; gap: 6px; font-family: 'IBM Plex Mono', monospace; font-size: 0.7rem; color: var(--white-60); }
  .lp-status-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); animation: blink 1.5s ease infinite; }
  .lp-scan-body { padding: 18px; display: flex; flex-direction: column; gap: 10px; position: relative; min-height: 180px; }
  .lp-scan-anim { position: absolute; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, var(--green), transparent); animation: scanLine 3s ease-in-out infinite; pointer-events: none; z-index: 5; }
  .lp-symptom-row { display: flex; flex-wrap: wrap; gap: 7px; }
  .lp-stag { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 999px; background: var(--black-4); border: 1px solid var(--border); font-size: 0.78rem; color: var(--white-60); font-family: 'IBM Plex Mono', monospace; transition: all 0.3s; }
  .lp-stag.on { background: var(--green-glow); border-color: var(--green-border); color: var(--green); }
  .lp-stag-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; flex-shrink: 0; }
  .lp-divider { border: none; border-top: 1px dashed var(--border); margin: 4px 0; }
  .lp-res-label { font-family: 'IBM Plex Mono', monospace; font-size: 0.7rem; color: var(--white-60); letter-spacing: 0.06em; margin-bottom: 6px; }
  .lp-res-val { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1.4rem; color: var(--green); }
  .lp-conf-row { display: flex; align-items: center; gap: 10px; margin-top: 8px; }
  .lp-conf-bg { flex: 1; height: 4px; border-radius: 2px; background: var(--black-4); }
  .lp-conf-fill { height: 100%; border-radius: 2px; background: linear-gradient(90deg, var(--green-dim), var(--green)); transition: width 1s ease; }
  .lp-conf-pct { font-family: 'IBM Plex Mono', monospace; font-size: 0.72rem; color: var(--green); flex-shrink: 0; }

  /* TICKER */
  .lp-ticker { overflow: hidden; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 10px 0; background: var(--black-2); }
  .lp-ticker-track { display: flex; width: max-content; animation: ticker 25s linear infinite; white-space: nowrap; }
  .lp-ticker-item { font-family: 'IBM Plex Mono', monospace; font-size: 0.78rem; color: var(--white-60); padding: 0 2.5rem; display: flex; align-items: center; gap: 10px; }
  .lp-ticker-item span { color: var(--green); }

  /* SECTION COMMONS */
  .lp-section-eye { font-family: 'IBM Plex Mono', monospace; font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--green); margin-bottom: 0.75rem; }
  .lp-section-h2 { font-family: 'Syne', sans-serif; font-weight: 800; font-size: clamp(1.9rem, 3.5vw, 2.9rem); color: var(--white); max-width: 560px; line-height: 1.15; margin-bottom: 0.9rem; }
  .lp-section-sub { color: var(--white-60); font-size: 1rem; max-width: 480px; margin-bottom: 3.5rem; }

  /* HOW */
  .lp-how { padding: 7rem 5rem; }
  .lp-steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 0; }
  .lp-step { padding: 2.25rem 2rem; border: 1px solid var(--border); border-right: none; background: var(--black-2); transition: background 0.25s; }
  .lp-step:last-child { border-right: 1px solid var(--border); }
  .lp-step:hover { background: var(--black-3); }
  .lp-step-num { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 3.5rem; color: var(--green); opacity: 0.12; line-height: 1; margin-bottom: 0.6rem; }
  .lp-step-icon { width: 38px; height: 38px; border-radius: 10px; background: var(--green-glow); border: 1px solid var(--green-border); display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; }
  .lp-step-icon svg { width: 18px; height: 18px; }
  .lp-step h3 { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1rem; color: var(--white); margin-bottom: 0.45rem; }
  .lp-step p { font-size: 0.875rem; color: var(--white-60); line-height: 1.6; }

  /* FEATURES */
  .lp-features { padding: 7rem 5rem; background: var(--black-2); }
  .lp-feat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; }
  .lp-feat-card { background: var(--black-2); padding: 2rem 1.75rem; transition: background 0.2s; }
  .lp-feat-card:hover { background: var(--black-3); }
  .lp-feat-icon { width: 40px; height: 40px; border-radius: 10px; background: var(--green-glow); border: 1px solid var(--green-border); display: flex; align-items: center; justify-content: center; margin-bottom: 1.2rem; }
  .lp-feat-icon svg { width: 18px; height: 18px; }
  .lp-feat-card h3 { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 0.97rem; color: var(--white); margin-bottom: 0.4rem; }
  .lp-feat-card p { font-size: 0.87rem; color: var(--white-60); line-height: 1.65; }

  /* CHATBOT */
  .lp-chatbot { padding: 7rem 5rem; display: flex; gap: 5rem; align-items: center; }
  .lp-chatbot-left { flex: 1; }
  .lp-chatbot-right { flex: 1; display: flex; justify-content: center; }
  .lp-chat-win { width: 400px; background: var(--black-2); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; box-shadow: 0 30px 60px rgba(0,0,0,0.4); }
  .lp-chat-top { background: var(--black-3); padding: 12px 18px; display: flex; align-items: center; gap: 10px; border-bottom: 1px solid var(--border); }
  .lp-chat-av { width: 28px; height: 28px; border-radius: 50%; background: var(--green-glow); border: 1px solid var(--green-border); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .lp-chat-name { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 0.85rem; color: var(--white); }
  .lp-chat-online { font-size: 0.7rem; color: var(--green); font-family: 'IBM Plex Mono', monospace; }
  .lp-chat-msgs { padding: 16px; display: flex; flex-direction: column; gap: 10px; min-height: 240px; }
  .lp-msg { max-width: 82%; padding: 9px 13px; border-radius: 10px; font-size: 0.84rem; line-height: 1.55; }
  .lp-msg.bot { background: var(--black-3); color: var(--white-60); border-radius: 10px 10px 10px 2px; }
  .lp-msg.user { background: var(--green-glow); border: 1px solid var(--green-border); color: var(--green); border-radius: 10px 10px 2px 10px; align-self: flex-end; font-family: 'IBM Plex Mono', monospace; font-size: 0.78rem; }
  .lp-msg.result { background: rgba(0,229,160,0.08); border: 1px solid var(--green-border); color: var(--white); border-radius: 10px; }
  .lp-msg.result strong { color: var(--green); font-family: 'Syne', sans-serif; }
  .lp-chat-input-row { padding: 12px 14px; display: flex; gap: 8px; border-top: 1px solid var(--border); }
  .lp-chat-input { flex: 1; background: var(--black-3); border: 1px solid var(--border); border-radius: 8px; padding: 8px 12px; font-size: 0.82rem; color: var(--white-60); font-family: 'Lato', sans-serif; outline: none; }
  .lp-chat-send { width: 34px; height: 34px; border-radius: 8px; background: var(--green); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.2s; }
  .lp-chat-send:hover { background: #10fdb5; }

  /* DISEASES */
  .lp-diseases { padding: 7rem 5rem; }
  .lp-disease-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 10px; margin-top: 3rem; }
  .lp-d-pill { padding: 10px 16px; border-radius: 8px; background: var(--black-2); border: 1px solid var(--border); font-size: 0.82rem; color: var(--white-60); display: flex; align-items: center; gap: 8px; transition: all 0.2s; }
  .lp-d-pill:hover { border-color: var(--green-border); color: var(--white); background: var(--black-3); }
  .lp-d-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--green); flex-shrink: 0; }

  /* TESTIMONIALS */
  .lp-testi { padding: 7rem 5rem; background: var(--black-2); }
  .lp-testi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem; }
  .lp-tcard { background: var(--black-3); border: 1px solid var(--border); border-radius: 12px; padding: 1.75rem; transition: border-color 0.2s; }
  .lp-tcard:hover { border-color: var(--green-border); }
  .lp-stars { color: var(--amber); font-size: 0.85rem; letter-spacing: 2px; margin-bottom: 0.85rem; }
  .lp-tcard blockquote { font-size: 0.875rem; color: var(--white-60); line-height: 1.7; margin-bottom: 1.1rem; font-style: italic; }
  .lp-tauthor { display: flex; align-items: center; gap: 10px; }
  .lp-tav { width: 34px; height: 34px; border-radius: 50%; background: var(--black-4); display: flex; align-items: center; justify-content: center; font-size: 0.72rem; font-weight: 700; color: var(--green); font-family: 'Syne', sans-serif; flex-shrink: 0; }
  .lp-tname { font-size: 0.85rem; font-weight: 700; font-family: 'Syne', sans-serif; color: var(--white); }
  .lp-trole { font-size: 0.75rem; color: var(--white-60); }

  /* CTA */
  .lp-cta { padding: 7rem 5rem; text-align: center; position: relative; overflow: hidden; }
  .lp-cta-orb { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 600px; height: 300px; border-radius: 50%; background: radial-gradient(ellipse, rgba(0,229,160,0.06) 0%, transparent 70%); pointer-events: none; }
  .lp-cta h2 { font-family: 'Syne', sans-serif; font-weight: 800; font-size: clamp(2rem, 4vw, 3.4rem); color: var(--white); margin-bottom: 1rem; position: relative; }
  .lp-cta p { color: var(--white-60); margin-bottom: 2.5rem; position: relative; }
  .lp-cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; position: relative; }

  /* FOOTER */
  .lp-footer { border-top: 1px solid var(--border); padding: 2.25rem 5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
  .lp-footer p { font-size: 0.78rem; color: var(--white-60); }
  .lp-footer-links { display: flex; gap: 1.5rem; }
  .lp-footer-links a { font-size: 0.78rem; color: var(--white-60); text-decoration: none; transition: color 0.2s; }
  .lp-footer-links a:hover { color: var(--green); }

  @media (max-width: 900px) {
    .lp-nav { padding: 1rem 1.5rem; }
    .lp-nav-links { display: none; }
    .lp-hero { padding: 8rem 1.5rem 4rem; flex-direction: column; }
    .lp-hero-right { display: none; }
    .lp-how, .lp-features, .lp-chatbot, .lp-diseases, .lp-testi, .lp-cta { padding: 5rem 1.5rem; }
    .lp-chatbot { flex-direction: column; }
    .lp-chatbot-right { display: none; }
    .lp-footer { padding: 2rem 1.5rem; }
    .lp-feat-grid { grid-template-columns: 1fr; }
  }
`;

// ─── Data ─────────────────────────────────────────────────────────────────────
const diseases = [
  "Diabetes","Hypertension","Common Cold","Typhoid","Malaria",
  "Dengue","Tuberculosis","Pneumonia","Migraine","Arthritis",
  "Gastroenteritis","Bronchial Asthma","Jaundice","Hepatitis A",
  "Hepatitis B","Heart Disease","Urinary Tract Infection",
  "Hypothyroidism","Hyperthyroidism","Allergy",
];

const features = [
  { title:"Multi-Class ML Model", desc:"Trained on thousands of symptom–disease mappings using Random Forest & SVM ensemble — high accuracy across 40+ conditions.", svg:<svg viewBox="0 0 18 18" fill="none"><path d="M2 9h3l2-5 3 10 2-5h4" stroke="#00e5a0" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { title:"Conversational AI Chatbot", desc:"An NLP-driven chatbot that asks follow-up questions to narrow down symptoms and delivers a confident diagnosis.", svg:<svg viewBox="0 0 18 18" fill="none"><path d="M3 4h12a1 1 0 011 1v7a1 1 0 01-1 1H6l-3 2V5a1 1 0 011-1z" stroke="#00e5a0" strokeWidth="1.3" strokeLinejoin="round"/></svg> },
  { title:"Confidence Scoring", desc:"Every prediction comes with a probability score and top-3 differential diagnoses so users understand the reasoning.", svg:<svg viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="#00e5a0" strokeWidth="1.3"/><path d="M9 5v4l2.5 2.5" stroke="#00e5a0" strokeWidth="1.3" strokeLinecap="round"/></svg> },
  { title:"40+ Disease Coverage", desc:"From common infections to chronic conditions — the model spans a broad spectrum using 130+ input symptoms.", svg:<svg viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="6" height="6" rx="1" stroke="#00e5a0" strokeWidth="1.3"/><rect x="10" y="2" width="6" height="6" rx="1" stroke="#00e5a0" strokeWidth="1.3"/><rect x="2" y="10" width="6" height="6" rx="1" stroke="#00e5a0" strokeWidth="1.3"/><rect x="10" y="10" width="6" height="6" rx="1" stroke="#00e5a0" strokeWidth="1.3"/></svg> },
  { title:"Instant Results", desc:"Real-time inference — enter your symptoms and get a prediction in under a second, no sign-up required.", svg:<svg viewBox="0 0 18 18" fill="none"><path d="M10 2L4 10h5l-1 6 7-9h-5l1-5z" stroke="#00e5a0" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { title:"Privacy First", desc:"No personal data stored. All predictions run server-side without logging symptoms or user identity.", svg:<svg viewBox="0 0 18 18" fill="none"><path d="M9 2L4 5v4c0 3.5 2.5 6 5 7 2.5-1 5-3.5 5-7V5L9 2z" stroke="#00e5a0" strokeWidth="1.3" strokeLinejoin="round"/></svg> },
];

const steps = [
  { num:"01", title:"Enter your symptoms", desc:"Type or select from 130+ symptoms. The chatbot can also guide you through a natural conversation.", icon:<svg viewBox="0 0 18 18" fill="none"><path d="M3 4h12a1 1 0 011 1v7a1 1 0 01-1 1H6l-3 2V5a1 1 0 011-1z" stroke="#00e5a0" strokeWidth="1.3" strokeLinejoin="round"/></svg> },
  { num:"02", title:"ML model analyzes", desc:"The trained Random Forest model cross-references your symptom combination against 40+ disease patterns.", icon:<svg viewBox="0 0 18 18" fill="none"><path d="M2 9h3l2-5 3 10 2-5h4" stroke="#00e5a0" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { num:"03", title:"Get your prediction", desc:"Receive the most likely diagnosis along with a confidence score and recommended next steps.", icon:<svg viewBox="0 0 18 18" fill="none"><path d="M4 9l3 3 7-7" stroke="#00e5a0" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { num:"04", title:"Consult a doctor", desc:"Use the prediction as a starting point. We always recommend following up with a medical professional.", icon:<svg viewBox="0 0 18 18" fill="none"><circle cx="9" cy="6" r="3" stroke="#00e5a0" strokeWidth="1.3"/><path d="M3 16c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#00e5a0" strokeWidth="1.3" strokeLinecap="round"/></svg> },
];

const testimonials = [
  { initials:"AM", quote:"I described my symptoms and it correctly identified my viral fever before I even saw a doctor. Incredibly accurate.", name:"Ananya M.", role:"Student, Mumbai" },
  { initials:"RK", quote:"The chatbot kept asking the right questions. Felt like talking to a real triage nurse. Predicted my UTI on the first try.", name:"Rahul K.", role:"Software Engineer, Bengaluru" },
  { initials:"PS", quote:"As a medical student, I'm impressed by how well it handles edge cases. Great tool for preliminary assessment.", name:"Priya S.", role:"MBBS Student, AIIMS Delhi" },
];

const tickerItems = ["Fever","Headache","Fatigue","Cough","Nausea","Joint Pain","Chest Pain","Breathlessness","Rash","Vomiting","Dizziness","Sweating","Loss of Appetite","Chills","Sore Throat"];
const heroSymptoms = ["fever","headache","fatigue","body ache","nausea","chills","cough"];

// ─── Scan Card ────────────────────────────────────────────────────────────────
function ScanCard() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [confidence, setConfidence] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setActiveIdx(i);
      if (i >= heroSymptoms.length) {
        clearInterval(interval);
        setTimeout(() => setShowResult(true), 300);
        setTimeout(() => {
          let c = 0;
          const ci = setInterval(() => { c += 3; setConfidence(c); if (c >= 91) clearInterval(ci); }, 20);
        }, 500);
      }
    }, 420);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="lp-scan-card">
      <div className="lp-scan-header">
        <span className="lp-scan-title">// SYMPTOM_ANALYSIS.exe</span>
        <span className="lp-scan-status"><span className="lp-status-dot"/>SCANNING</span>
      </div>
      <div className="lp-scan-body">
        <div className="lp-scan-anim"/>
        <div className="lp-res-label">INPUT SYMPTOMS</div>
        <div className="lp-symptom-row">
          {heroSymptoms.map((s, i) => (
            <span key={s} className={`lp-stag${i < activeIdx ? " on" : ""}`}>
              <span className="lp-stag-dot"/>{s}
            </span>
          ))}
        </div>
        <hr className="lp-divider"/>
        {showResult ? (
          <>
            <div className="lp-res-label">PREDICTED DIAGNOSIS</div>
            <div className="lp-res-val">Dengue Fever</div>
            <div className="lp-conf-row">
              <div className="lp-conf-bg">
                <div className="lp-conf-fill" style={{ width:`${confidence}%` }}/>
              </div>
              <span className="lp-conf-pct">{confidence}%</span>
            </div>
          </>
        ) : (
          <>
            <div className="lp-res-label">PREDICTED DIAGNOSIS</div>
            <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.78rem", color:"var(--white-60)", display:"flex", alignItems:"center", gap:8 }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ animation:"spin 1s linear infinite" }}>
                <circle cx="6" cy="6" r="5" stroke="rgba(0,229,160,0.3)" strokeWidth="1.5"/>
                <path d="M6 1a5 5 0 015 5" stroke="#00e5a0" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              analyzing...
            </div>
          </>
        )}
      </div>
    </div>
  );
}


export default function LandingPage() {
  const tickerFull = [...tickerItems, ...tickerItems];

  return (
    <>
      <style>{globalStyles}</style>

      {/* NAV */}
      <nav className="lp-nav">
        <a href="#" className="lp-nav-logo">
          <div className="lp-logo-icon">
            <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
              <path d="M8 1L9.8 6H15L10.5 9.2L12.3 14.5L8 11.5L3.7 14.5L5.5 9.2L1 6H6.2L8 1Z" fill="#00e5a0"/>
            </svg>
          </div>
          DiagnoAI
        </a>
        <ul className="lp-nav-links">
          <li><a href="#how">How it works</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#diseases">Diseases</a></li>
          <li><a href="#chatbot">Chatbot</a></li>
        </ul>
        <div className="lp-nav-right">
          <a href="/login" className="lp-btn-ghost">Sign in</a>
          <a href="/register" className="lp-btn-green">Try free →</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="lp-hero">
        <div className="lp-hero-grid"/>
        <div className="lp-hero-orb-1"/>
        <div className="lp-hero-orb-2"/>
        <div className="lp-hero-left">
          <div className="lp-eyebrow">
            <span className="lp-eyebrow-dot"/>
            ML-POWERED · 40+ DISEASES · 130+ SYMPTOMS
          </div>
          <h1 className="lp-hero-h1">
            Describe your<br/>
            <span className="acc-green">symptoms</span>,<br/>
            know your <span className="acc-blue">disease</span>.
          </h1>
          <p className="lp-hero-sub">
            DiagnoAI uses a trained multi-class ML model and an AI chatbot to predict diseases from symptoms — with confidence scores and instant results.
          </p>
          <div className="lp-hero-btns">
            <a href="/register" className="lp-btn-green-lg">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1L9.8 6H15L10.5 9.2L12.3 14.5L8 11.5L3.7 14.5L5.5 9.2L1 6H6.2L8 1Z" fill="#060809"/></svg>
              Predict my disease
            </a>
            <a href="#chatbot" className="lp-btn-outline-lg">Talk to chatbot →</a>
          </div>
          <div className="lp-hero-stats">
            {[{n:"40",s:"+",l:"Diseases covered"},{n:"130",s:"+",l:"Symptoms tracked"},{n:"95",s:"%",l:"Model accuracy"}].map(({n,s,l})=>(
              <div key={l}>
                <div className="lp-stat-num">{n}<span>{s}</span></div>
                <div className="lp-stat-label">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="lp-hero-right"><ScanCard/></div>
      </section>

      {/* TICKER */}
      <div className="lp-ticker">
        <div className="lp-ticker-track">
          {tickerFull.map((item,i)=>(
            <span className="lp-ticker-item" key={i}><span>›</span>{item}</span>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section id="how" className="lp-how">
        <div className="lp-section-eye">// HOW IT WORKS</div>
        <h2 className="lp-section-h2">From symptoms to diagnosis in seconds</h2>
        <p className="lp-section-sub">No medical jargon. No long forms. Just describe what you feel and let the model do the rest.</p>
        <div className="lp-steps">
          {steps.map(({num,title,desc,icon})=>(
            <div className="lp-step" key={num}>
              <div className="lp-step-num">{num}</div>
              <div className="lp-step-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="lp-features">
        <div className="lp-section-eye">// FEATURES</div>
        <h2 className="lp-section-h2">Built on real ML, not guesswork</h2>
        <p className="lp-section-sub" style={{marginBottom:"3rem"}}>Every component — from data preprocessing to the chatbot — was engineered for accuracy and usability.</p>
        <div className="lp-feat-grid">
          {features.map(({title,desc,svg})=>(
            <div className="lp-feat-card" key={title}>
              <div className="lp-feat-icon">{svg}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CHATBOT */}
      <section id="chatbot" className="lp-chatbot">
        <div className="lp-chatbot-left">
          <div className="lp-section-eye">// AI CHATBOT</div>
          <h2 className="lp-section-h2">Like talking to a smart triage assistant</h2>
          <p className="lp-section-sub" style={{marginBottom:"2rem"}}>
            The chatbot asks smart follow-up questions, understands natural language, and routes your symptoms through the ML model — all in a conversational flow.
          </p>
          <ul style={{display:"flex",flexDirection:"column",gap:"0.75rem",listStyle:"none"}}>
            {["Understands natural symptom descriptions","Asks clarifying follow-up questions","Powered by the same ML model","Returns top-3 disease predictions"].map(item=>(
              <li key={item} style={{display:"flex",alignItems:"center",gap:"10px",fontSize:"0.9rem",color:"var(--white-60)"}}>
                <span style={{color:"var(--green)"}}>✓</span> {item}
              </li>
            ))}
          </ul>
          <a href="/register" className="lp-btn-green-lg" style={{marginTop:"2rem",display:"inline-flex"}}>
            Start chatting →
          </a>
        </div>
        <div className="lp-chatbot-right">
          <div className="lp-chat-win">
            <div className="lp-chat-top">
              <div className="lp-chat-av">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1L8.6 5.3H13L9.5 7.9L10.9 12.5L7 10L3.1 12.5L4.5 7.9L1 5.3H5.4L7 1Z" fill="#00e5a0"/></svg>
              </div>
              <div>
                <div className="lp-chat-name">DiagnoBot</div>
                <div className="lp-chat-online">● online</div>
              </div>
            </div>
            <div className="lp-chat-msgs">
              <div className="lp-msg bot">👋 Hi! I'm DiagnoBot. Tell me your symptoms and I'll help identify what condition you might have.</div>
              <div className="lp-msg user">I have fever, headache and body ache since 2 days</div>
              <div className="lp-msg bot">Got it. Are you also experiencing any chills, rashes, or pain behind your eyes?</div>
              <div className="lp-msg user">yes, chills and pain behind eyes</div>
              <div className="lp-msg result">🔬 <strong>Prediction: Dengue Fever</strong><br/>Confidence: 91% · Also consider: Malaria (6%), Typhoid (3%)</div>
            </div>
            <div className="lp-chat-input-row">
              <input className="lp-chat-input" placeholder="Describe your symptoms..." readOnly/>
              <button className="lp-chat-send">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7l12-5-5 12-2-5-5-2z" fill="#060809"/></svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* DISEASES */}
      <section id="diseases" className="lp-diseases">
        <div className="lp-section-eye">// DISEASE COVERAGE</div>
        <h2 className="lp-section-h2">40+ conditions, one model</h2>
        <p className="lp-section-sub">Our multi-class classifier predicts across a broad range — from infectious diseases to chronic conditions.</p>
        <div className="lp-disease-grid">
          {diseases.map(d=>(
            <div className="lp-d-pill" key={d}><span className="lp-d-dot"/>{d}</div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="lp-testi">
        <div className="lp-section-eye">// TESTIMONIALS</div>
        <h2 className="lp-section-h2">People trust the prediction</h2>
        <p className="lp-section-sub" style={{marginBottom:"3rem"}}>Real users, real symptoms, real results.</p>
        <div className="lp-testi-grid">
          {testimonials.map(({initials,quote,name,role})=>(
            <div className="lp-tcard" key={name}>
              <div className="lp-stars">★★★★★</div>
              <blockquote>"{quote}"</blockquote>
              <div className="lp-tauthor">
                <div className="lp-tav">{initials}</div>
                <div>
                  <div className="lp-tname">{name}</div>
                  <div className="lp-trole">{role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="lp-cta">
        <div className="lp-cta-orb"/>
        <h2>Ready to check your symptoms?</h2>
        <p>Free to use. No sign-up needed. Powered by a trained ML model — not generic advice.</p>
        <div className="lp-cta-btns">
          <a href="/register" className="lp-btn-green-lg">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1L9.8 6H15L10.5 9.2L12.3 14.5L8 11.5L3.7 14.5L5.5 9.2L1 6H6.2L8 1Z" fill="#060809"/></svg>
            Try the predictor
          </a>
          <a href="/register" className="lp-btn-outline-lg">Open chatbot →</a>
        </div>
        <p style={{marginTop:"1.5rem",fontSize:"0.78rem",color:"var(--white-60)",position:"relative"}}>
          ⚠ DiagnoAI is for informational purposes only. Always consult a qualified physician.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="lp-footer">
        <a href="#" className="lp-nav-logo" style={{fontSize:"0.95rem"}}>
          <div className="lp-logo-icon">
            <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
              <path d="M8 1L9.8 6H15L10.5 9.2L12.3 14.5L8 11.5L3.7 14.5L5.5 9.2L1 6H6.2L8 1Z" fill="#00e5a0"/>
            </svg>
          </div>
          DiagnoAI
        </a>
        <p>© 2026 DiagnoAI. For educational purposes only — not a substitute for medical advice.</p>
        <div className="lp-footer-links">
          {["GitHub","Dataset","Model Docs","Contact"].map(l=>(
            <a href="#" key={l}>{l}</a>
          ))}
        </div>
      </footer>
    </>
  );
}
