import { GitPullRequest } from "lucide-react";

// Quality score -> gauge color.
function getScoreColor(score) {
  if (score >= 80) return "var(--color-safe)";
  if (score >= 50) return "var(--color-performance)";
  return "var(--color-bug)";
}

function renderDecisionBadge(decision) {
  switch (decision) {
    case "approve":
      return <span className="badge badge-safe">Approve</span>;
    case "request_changes":
      return <span className="badge badge-bug">Request Changes</span>;
    case "comment":
    default:
      return <span className="badge badge-performance">Comment</span>;
  }
}

export default function ReviewSummary({ result }) {
  const { summary } = result;

  return (
    <div className="dashboard-grid">
      {/* Circular Quality Gauge */}
      <div className="card score-card">
        <div
          className="score-gauge"
          style={{
            "--score-percent": `${summary.qualityScore}%`,
            "--score-color": getScoreColor(summary.qualityScore),
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span className="score-value">{summary.qualityScore}</span>
            <span className="score-label">Score</span>
          </div>
        </div>
        <h3 style={{ fontSize: "1.15rem", fontWeight: "700", marginBottom: "0.5rem" }}>Code Quality Rating</h3>
        <p style={{ fontSize: "0.85rem", color: "var(--t2)", maxWidth: "220px" }}>
          Score is based on convention alignment, bug frequency, and performance risks.
        </p>
      </div>

      {/* Overview / Decisions */}
      <div className="card results-overview-card">
        <div className="card-title">
          <GitPullRequest size={20} className="file-icon" />
          Review Outcome
        </div>

        <div className="overview-row">
          <div className="overview-label">Decision:</div>
          <div className="overview-content">
            {renderDecisionBadge(summary.mergeDecision)}
          </div>
        </div>

        <div className="overview-row">
          <div className="overview-label">Rationale:</div>
          <div className="overview-content" style={{ fontWeight: "500", color: "var(--t1)" }}>
            {summary.rationale}
          </div>
        </div>

        {summary.highestRiskChanges && summary.highestRiskChanges.length > 0 && (
          <div className="overview-row">
            <div className="overview-label">High-Risk Changes:</div>
            <div className="overview-content" style={{ flex: 1 }}>
              <ul className="risk-list">
                {summary.highestRiskChanges.map((change, idx) => (
                  <li key={idx} className="risk-item">{change}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="overview-row" style={{ marginTop: "auto", paddingTop: "1rem", borderTop: "1px solid var(--border)" }}>
          <div className="overview-label">Conventions:</div>
          <div className="overview-content" style={{ fontSize: "0.85rem", color: "var(--t2)" }}>
            Audited with <strong>{result.conventionsUsed}</strong> custom convention rules.
          </div>
        </div>
      </div>
    </div>
  );
}
