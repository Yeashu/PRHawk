import { Save, X } from "lucide-react";
import { SEVERITY_OPTIONS } from "./severityOptions";

export default function RuleEditCard({
  rule,
  setRule,
  rationale,
  setRationale,
  severity,
  setSeverity,
  onSave,
  onCancel,
}) {
  return (
    <div className="card" style={{ borderColor: "var(--border-focus)" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div className="form-group">
          <label className="form-label">Rule Description</label>
          <input
            type="text"
            className="input-text"
            value={rule}
            onChange={(e) => setRule(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Rationale</label>
          <textarea
            className="input-textarea"
            value={rationale}
            onChange={(e) => setRationale(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Severity</label>
          <select
            className="select-dropdown"
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
          >
            {SEVERITY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
          <button onClick={onCancel} className="btn btn-secondary" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}>
            <X size={14} /> Cancel
          </button>
          <button onClick={onSave} className="btn btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}>
            <Save size={14} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
