import { Search, RotateCcw } from "lucide-react";

// Severity chips shown next to the "All" filter (label + dot color).
const SEVERITY_CHIPS = [
  { value: "bug", label: "Bugs", color: "var(--color-bug)" },
  { value: "security", label: "Security", color: "var(--color-security)" },
  { value: "performance", label: "Perf", color: "var(--color-performance)" },
  { value: "style", label: "Style", color: "var(--color-style)" },
  { value: "suggestion", label: "Suggest", color: "var(--color-suggestion)" },
];

export default function FindingsToolbar({
  total,
  severityFilter,
  setSeverityFilter,
  searchPath,
  setSearchPath,
  onClear,
}) {
  return (
    <div className="findings-section-header">
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <h2 className="section-title">Review Findings ({total})</h2>
        <button
          onClick={onClear}
          className="btn btn-secondary"
          style={{ padding: "0.4rem 0.75rem", fontSize: "0.85rem" }}
          title="Clear this review and start over"
        >
          <RotateCcw size={14} /> Start New Review
        </button>
      </div>

      <div className="filters-bar">
        <div style={{ position: "relative", marginRight: "0.5rem" }}>
          <input
            type="text"
            placeholder="Search file path..."
            className="input-text"
            value={searchPath}
            onChange={(e) => setSearchPath(e.target.value)}
            style={{ paddingRight: "2rem", width: "180px", fontSize: "0.85rem", padding: "0.4rem 0.75rem" }}
          />
          <Search size={14} style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--t3)" }} />
        </div>

        <button
          onClick={() => setSeverityFilter("all")}
          className={`filter-chip ${severityFilter === "all" ? "active" : ""}`}
        >
          All
        </button>

        {SEVERITY_CHIPS.map((chip) => (
          <button
            key={chip.value}
            onClick={() => setSeverityFilter(chip.value)}
            className={`filter-chip ${severityFilter === chip.value ? "active" : ""}`}
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: chip.color }}></span>
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  );
}
