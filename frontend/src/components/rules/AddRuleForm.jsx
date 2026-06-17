import { X } from "lucide-react";
import { SEVERITY_OPTIONS } from "./severityOptions";

export default function AddRuleForm({
  rule,
  setRule,
  rationale,
  setRationale,
  severity,
  setSeverity,
  onSubmit,
  onCancel,
}) {
  return (
    <div className="card" style={{ border: "2px dashed var(--border-focus)", backgroundColor: "var(--surface-hover)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: "700" }}>Add New Convention Rule</h3>
        <button onClick={onCancel} className="icon-btn" style={{ width: "32px", height: "32px" }}>
          <X size={16} />
        </button>
      </div>

      <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div className="form-group">
          <label className="form-label">Rule Description</label>
          <input
            type="text"
            placeholder="e.g. Always check if index is out of bounds in critical loops"
            className="input-text"
            value={rule}
            onChange={(e) => setRule(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Rationale / Evidence</label>
          <textarea
            placeholder="e.g. History shows 3 production crashes due to index out of bounds in loop.ts"
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

        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save Custom Rule
          </button>
        </div>
      </form>
    </div>
  );
}
