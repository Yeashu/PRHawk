import { Search, Plus } from "lucide-react";

export default function RulesToolbar({
  searchQuery,
  setSearchQuery,
  severityFilter,
  setSeverityFilter,
  showAddForm,
  onShowAddForm,
}) {
  return (
    <div className="card" style={{ padding: "1.25rem" }}>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
          <input
            type="text"
            placeholder="Search rules or rationales..."
            className="input-text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingRight: "2.5rem" }}
          />
          <Search size={18} style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--t3)" }} />
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <select
            className="select-dropdown"
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            style={{ padding: "0.5rem 2rem 0.5rem 1rem", fontSize: "0.85rem", width: "150px" }}
          >
            <option value="all">All Severities</option>
            <option value="bug">Bugs</option>
            <option value="security">Security</option>
            <option value="performance">Performance</option>
            <option value="style">Style</option>
            <option value="suggestion">Suggestion</option>
          </select>

          {!showAddForm && (
            <button
              onClick={onShowAddForm}
              className="btn btn-primary"
              style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}
            >
              <Plus size={16} /> Add Custom
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
