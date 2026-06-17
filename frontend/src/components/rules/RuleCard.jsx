import { Edit3, Trash2 } from "lucide-react";

export default function RuleCard({ ruleObj, onEdit, onDelete }) {
  return (
    <div className="card rule-item-card">
      <div className="rule-header">
        <span className={`badge badge-${ruleObj.severity}`}>{ruleObj.severity}</span>
        <div className="rule-actions">
          <button
            onClick={onEdit}
            className="icon-btn"
            style={{ width: "32px", height: "32px" }}
            title="Edit rule"
          >
            <Edit3 size={14} />
          </button>
          <button
            onClick={onDelete}
            className="icon-btn"
            style={{ width: "32px", height: "32px" }}
            title="Delete rule"
          >
            <Trash2 size={14} style={{ color: "var(--color-bug)" }} />
          </button>
        </div>
      </div>

      <div className="rule-text">{ruleObj.rule}</div>
      <div className="rule-rationale-box">
        <strong style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--t3)", display: "block", marginBottom: "0.25rem" }}>Rationale</strong>
        {ruleObj.rationale}
      </div>
    </div>
  );
}
