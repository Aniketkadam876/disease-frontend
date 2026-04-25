import React, { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=IBM+Plex+Mono:wght@400;500&family=Lato:wght@300;400&display=swap');

  .dnav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 500;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 3rem;
    height: 60px;
    background: rgba(6,8,9,0.85);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid rgba(238,243,248,0.07);
    font-family: 'Lato', sans-serif;
  }

  /* LOGO */
  .dnav-logo {
    display: flex; align-items: center; gap: 9px;
    font-family: 'Syne', sans-serif; font-weight: 800;
    font-size: 1.05rem; color: #eef3f8;
    text-decoration: none; flex-shrink: 0;
  }
  .dnav-logo-icon {
    width: 26px; height: 26px; border-radius: 7px;
    background: rgba(0,229,160,0.10);
    border: 1px solid rgba(0,229,160,0.25);
    display: flex; align-items: center; justify-content: center;
    animation: dnavPulse 3s ease-in-out infinite;
  }
  @keyframes dnavPulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(0,229,160,0.2); }
    50%      { box-shadow: 0 0 0 6px rgba(0,229,160,0); }
  }

  /* CENTER LINKS */
  .dnav-links {
    display: flex; align-items: center; gap: 0.25rem;
    list-style: none; margin: 0; padding: 0;
  }
  .dnav-link {
    display: flex; align-items: center; gap: 6px;
    padding: 6px 13px; border-radius: 7px;
    font-size: 0.82rem; color: rgba(238,243,248,0.5);
    text-decoration: none;
    font-family: 'IBM Plex Mono', monospace;
    letter-spacing: 0.02em;
    transition: color 0.18s, background 0.18s;
    white-space: nowrap;
  }
  .dnav-link:hover {
    color: #eef3f8;
    background: rgba(238,243,248,0.05);
  }
  .dnav-link.active {
    color: #00e5a0;
    background: rgba(0,229,160,0.07);
    border: 1px solid rgba(0,229,160,0.15);
  }
  .dnav-link svg { width: 12px; height: 12px; flex-shrink: 0; }

  /* RIGHT */
  .dnav-right {
    display: flex; align-items: center; gap: 12px; flex-shrink: 0;
  }

  /* user chip */
  .dnav-user {
    display: flex; align-items: center; gap: 8px;
    padding: 5px 12px 5px 6px;
    background: rgba(238,243,248,0.04);
    border: 1px solid rgba(238,243,248,0.08);
    border-radius: 999px;
    cursor: default;
  }
  .dnav-avatar {
    width: 24px; height: 24px; border-radius: 50%;
    background: rgba(0,229,160,0.12);
    border: 1px solid rgba(0,229,160,0.28);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif; font-weight: 700;
    font-size: 0.6rem; color: #00e5a0;
    flex-shrink: 0;
  }
  .dnav-username {
    font-size: 0.78rem; color: rgba(238,243,248,0.65);
    font-family: 'IBM Plex Mono', monospace;
    max-width: 110px;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }

  /* logout */
  .dnav-logout {
    display: flex; align-items: center; gap: 6px;
    padding: 6px 14px; border-radius: 7px;
    background: transparent;
    border: 1px solid rgba(239,68,68,0.25);
    color: rgba(239,68,68,0.65);
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.78rem; cursor: pointer;
    transition: all 0.18s; white-space: nowrap;
  }
  .dnav-logout:hover {
    background: rgba(239,68,68,0.08);
    border-color: rgba(239,68,68,0.45);
    color: #fca5a5;
  }
  .dnav-logout svg { width: 11px; height: 11px; }

  /* mobile hamburger */
  .dnav-hamburger {
    display: none; flex-direction: column; gap: 4px;
    background: none; border: none; cursor: pointer; padding: 4px;
  }
  .dnav-hamburger span {
    display: block; width: 20px; height: 1.5px;
    background: rgba(238,243,248,0.6); border-radius: 2px;
    transition: all 0.2s;
  }

  /* mobile drawer */
  .dnav-drawer {
    display: none;
    position: fixed; top: 60px; left: 0; right: 0; z-index: 499;
    background: rgba(6,8,9,0.97);
    border-bottom: 1px solid rgba(238,243,248,0.07);
    padding: 1rem 1.5rem 1.5rem;
    flex-direction: column; gap: 6px;
    backdrop-filter: blur(14px);
  }
  .dnav-drawer.open { display: flex; }
  .dnav-drawer-link {
    display: flex; align-items: center; gap: 8px;
    padding: 9px 12px; border-radius: 8px;
    font-size: 0.82rem; color: rgba(238,243,248,0.5);
    text-decoration: none;
    font-family: 'IBM Plex Mono', monospace;
    transition: all 0.18s;
  }
  .dnav-drawer-link:hover { color: #00e5a0; background: rgba(0,229,160,0.06); }
  .dnav-drawer-link.active { color: #00e5a0; background: rgba(0,229,160,0.07); border: 1px solid rgba(0,229,160,0.15); }
  .dnav-drawer-divider { border: none; border-top: 1px solid rgba(238,243,248,0.06); margin: 6px 0; }
  .dnav-drawer-user {
    display: flex; align-items: center; gap: 9px;
    padding: 8px 12px;
  }
  .dnav-drawer-username { font-size: 0.82rem; color: rgba(238,243,248,0.55); font-family: 'IBM Plex Mono', monospace; }
  .dnav-drawer-logout {
    display: flex; align-items: center; gap: 6px;
    padding: 9px 12px; border-radius: 8px;
    background: none; border: 1px solid rgba(239,68,68,0.2);
    color: rgba(239,68,68,0.6); font-family: 'IBM Plex Mono', monospace;
    font-size: 0.8rem; cursor: pointer; width: 100%; transition: all 0.18s;
  }
  .dnav-drawer-logout:hover { background: rgba(239,68,68,0.07); color: #fca5a5; border-color: rgba(239,68,68,0.4); }

  @media (max-width: 768px) {
    .dnav { padding: 0 1.25rem; }
    .dnav-links, .dnav-right { display: none; }
    .dnav-hamburger { display: flex; }
  }
`;

function getInitials(name) {
  if (!name) return "?";
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

const navLinks = [
  {
    href: "/dashboard", label: "dashboard",
    icon: <svg viewBox="0 0 12 12" fill="none"><rect x="1" y="1" width="4" height="4" rx="0.75" stroke="currentColor" strokeWidth="1.1"/><rect x="7" y="1" width="4" height="4" rx="0.75" stroke="currentColor" strokeWidth="1.1"/><rect x="1" y="7" width="4" height="4" rx="0.75" stroke="currentColor" strokeWidth="1.1"/><rect x="7" y="7" width="4" height="4" rx="0.75" stroke="currentColor" strokeWidth="1.1"/></svg>,
  },
  {
    href: "/history", label: "history",
    icon: <svg viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.1"/><path d="M6 3.5V6l1.5 1.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>,
  },
  {
    href: "/chat", label: "chatbot",
    icon: <svg viewBox="0 0 12 12" fill="none"><path d="M1.5 2.5h9a.5.5 0 01.5.5v5a.5.5 0 01-.5.5H4L1.5 10V3a.5.5 0 010 0z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/></svg>,
  },
  {
    href: "/profile", label: "profile",
    icon: <svg viewBox="0 0 12 12" fill="none"><circle cx="6" cy="4" r="2.2" stroke="currentColor" strokeWidth="1.1"/><path d="M1.5 11c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>,
  },
];

function handleLogout() {
  localStorage.clear();
  window.location.href = "/";
}

export default function Navbar({ user }) {
  const [open, setOpen] = useState(false);
  const currentPath = window.location.pathname;

  return (
    <>
      <style>{styles}</style>

      <nav className="dnav">
        {/* Logo */}
        <a href="/" className="dnav-logo">
          <div className="dnav-logo-icon">
            <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
              <path d="M8 1L9.8 6H15L10.5 9.2L12.3 14.5L8 11.5L3.7 14.5L5.5 9.2L1 6H6.2L8 1Z" fill="#00e5a0"/>
            </svg>
          </div>
          DiagnoAI
        </a>

        {/* Center links */}
        <ul className="dnav-links">
          {navLinks.map(({ href, label, icon }) => (
            <li key={label}>
              <a
                href={href}
                className={`dnav-link${currentPath === href ? " active" : ""}`}
              >
                {icon}
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right: user + logout */}
        <div className="dnav-right">
          {user && (
            <div className="dnav-user">
              <div className="dnav-avatar">{getInitials(user?.name)}</div>
              <span className="dnav-username">hi, {user?.name?.split(" ")[0]?.toLowerCase()}</span>
            </div>
          )}
          <button className="dnav-logout" onClick={handleLogout}>
            <svg viewBox="0 0 11 11" fill="none">
              <path d="M4 1.5H2a.5.5 0 00-.5.5v7a.5.5 0 00.5.5h2M7.5 7.5L10 5.5 7.5 3.5M10 5.5H4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            logout
          </button>
        </div>

        {/* Mobile hamburger */}
        <button className="dnav-hamburger" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <span style={{ transform: open ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
          <span style={{ opacity: open ? 0 : 1 }} />
          <span style={{ transform: open ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`dnav-drawer${open ? " open" : ""}`}>
        {navLinks.map(({ href, label, icon }) => (
          <a
            key={label}
            href={href}
            className={`dnav-drawer-link${currentPath === href ? " active" : ""}`}
            onClick={() => setOpen(false)}
          >
            {icon}
            {label}
          </a>
        ))}
        <hr className="dnav-drawer-divider" />
        {user && (
          <div className="dnav-drawer-user">
            <div className="dnav-avatar" style={{ width:28, height:28, fontSize:"0.65rem", borderRadius:"50%", background:"rgba(0,229,160,0.12)", border:"1px solid rgba(0,229,160,0.28)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Syne,sans-serif", fontWeight:700, color:"#00e5a0" }}>
              {getInitials(user?.name)}
            </div>
            <span className="dnav-drawer-username">hi, {user?.name?.split(" ")[0]?.toLowerCase()}</span>
          </div>
        )}
        <button className="dnav-drawer-logout" onClick={handleLogout}>
          <svg viewBox="0 0 11 11" fill="none" width="11" height="11">
            <path d="M4 1.5H2a.5.5 0 00-.5.5v7a.5.5 0 00.5.5h2M7.5 7.5L10 5.5 7.5 3.5M10 5.5H4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          logout
        </button>
      </div>
    </>
  );
}
