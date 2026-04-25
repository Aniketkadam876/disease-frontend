import React, { useEffect, useState, useMemo } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

const RISK_COLORS = {
  high:     { bg: "#FCEBEB", color: "#791F1F" },
  moderate: { bg: "#FAEEDA", color: "#633806" },
  low:      { bg: "#E1F5EE", color: "#085041" },
};

function DiseaseBadge({ disease, risk }) {
  const style = RISK_COLORS[risk?.toLowerCase()] ?? { bg: "#E6F1FB", color: "#0C447C" };
  return (
    <span style={{
      display: "inline-block", padding: "3px 10px", borderRadius: 100,
      fontSize: 12, fontWeight: 500, background: style.bg, color: style.color,
    }}>
      {disease}
    </span>
  );
}

function SymptomPills({ symptoms }) {
  return symptoms.split(",").map((s, i) => (
    <span key={i} style={{
      display: "inline-block", margin: "1px 2px", padding: "2px 8px",
      borderRadius: 100, fontSize: 11, background: "var(--color-bg-secondary, #f5f5f5)",
      border: "0.5px solid #ddd", color: "#555",
    }}>
      {s.trim()}
    </span>
  ));
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=DM+Mono:wght@500&display=swap');

  .hist-page { background: #0d0f0e; min-height: 100vh; font-family: 'DM Sans', sans-serif; color: #e8ede9; }
  .hist-inner { max-width: 900px; margin: 0 auto; padding: 3rem 1.5rem; }

  .hist-toprow { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 12px; }
  .hist-title  { font-size: 18px; font-weight: 500; }

  .hist-search {
    background: #161a18; border: 0.5px solid #2a3330; border-radius: 8px;
    padding: 7px 12px; font-family: 'DM Sans', sans-serif; font-size: 13px;
    color: #e8ede9; outline: none; width: 220px; transition: border-color 0.15s;
  }
  .hist-search:focus { border-color: #1D9E75; }
  .hist-search::placeholder { color: #3a4540; }

  .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 1.5rem; }
  .stat-card  { background: #161a18; border-radius: 8px; padding: 12px 14px; }
  .stat-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.09em; color: #4a5550; margin-bottom: 4px; }
  .stat-val   { font-size: 22px; font-weight: 500; }

  .filter-row { display: flex; gap: 6px; margin-bottom: 1rem; flex-wrap: wrap; }
  .filter-btn {
    padding: 4px 12px; border: 0.5px solid #2a3330; border-radius: 100px;
    background: transparent; font-size: 12px; font-family: 'DM Sans', sans-serif;
    color: #6b7a74; cursor: pointer; transition: all 0.12s;
  }
  .filter-btn:hover  { background: #161a18; }
  .filter-btn.active { background: #161a18; border-color: #1D9E75; color: #e8ede9; font-weight: 500; }

  .table-wrap { border: 0.5px solid #2a3330; border-radius: 12px; overflow: hidden; }
  table { width: 100%; border-collapse: collapse; table-layout: fixed; }
  thead tr { background: #111413; }
  th {
    padding: 10px 14px; font-size: 11px; font-weight: 500; text-transform: uppercase;
    letter-spacing: 0.08em; color: #4a5550; text-align: left;
    border-bottom: 0.5px solid #2a3330;
  }
  th:nth-child(1) { width: 20%; }
  th:nth-child(2) { width: 45%; }
  th:nth-child(3) { width: 35%; }

  td { padding: 11px 14px; font-size: 13px; color: #c8d4cc; border-bottom: 0.5px solid #1a1f1d; vertical-align: middle; }
  tbody tr:last-child td { border-bottom: none; }
  tbody tr { transition: background 0.1s; }
  tbody tr:hover { background: #131716; }

  .date-cell { font-family: 'DM Mono', monospace; font-size: 12px; color: #4a5550; }
  .symptom-pill {
    display: inline-block; margin: 1px 2px; padding: 2px 8px;
    border-radius: 100px; font-size: 11px; background: #1a1f1d;
    border: 0.5px solid #2a3330; color: #6b7a74;
  }
  .empty-row td { text-align: center; padding: 3rem; color: #3a4540; font-size: 14px; }

  @keyframes fadeRow { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
  .fade-row { animation: fadeRow 0.2s ease forwards; }
`;

export default function History({ user }) {
  const [history, setHistory] = useState([]);
  const [search,  setSearch]  = useState("");
  const [filter,  setFilter]  = useState("All");

  useEffect(() => {
    if (!user) return;
    api.get(`/history/${user.user_id}`).then(res => setHistory(res.data)).catch(console.error);
  }, [user]);



  const filters = ["All", "High", "Moderate", "Low"];

  const rows = useMemo(() => history.filter(h => {
    const q = search.toLowerCase();
    const matchQ = !q || (h.symptoms + h.disease).toLowerCase().includes(q);
    const matchF = filter === "All" || h.risk?.toLowerCase() === filter.toLowerCase();
    return matchQ && matchF;
  }), [history, search, filter]);

  const highRisk  = history.filter(h => h.risk?.toLowerCase() === "high").length;
  const lastDate  = history[0]?.created_at?.split(" ")[0] ?? "—";

  if (!user) return null;
  
  return (
    <div className="hist-page">
      <style>{styles}</style>
      <Navbar user={user} />

      <div className="hist-inner">
        <div className="hist-toprow">
          <span className="hist-title">Prediction history</span>
          <input
            className="hist-search"
            type="text"
            placeholder="Search symptoms or disease…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-label">Total records</div>
            <div className="stat-val">{history.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">High risk</div>
            <div className="stat-val" style={{ color: "#F09595" }}>{highRisk}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Last checked</div>
            <div className="stat-val" style={{ fontSize: 15, marginTop: 4 }}>{lastDate}</div>
          </div>
        </div>

        <div className="filter-row">
          {filters.map(f => (
            <button
              key={f}
              className={`filter-btn${filter === f ? " active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Date</th><th>Symptoms</th><th>Diagnosis</th></tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr className="empty-row"><td colSpan="3">No records found</td></tr>
              ) : (
                rows.map((h, i) => (
                  <tr key={i} className="fade-row" style={{ animationDelay: `${i * 0.04}s` }}>
                    <td className="date-cell">{h.created_at}</td>
                    <td><SymptomPills symptoms={h.symptoms} /></td>
                    <td><DiseaseBadge disease={h.disease} risk={h.risk} /></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}