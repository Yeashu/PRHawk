import { Sparkles, Info } from "lucide-react";

export default function LearnPanel({ repoInput, setRepoInput, learning, onSubmit }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div className="card">
        <div className="card-title">
          <Sparkles size={20} style={{ color: "var(--terra)" }} />
          Learn Conventions
        </div>
        <p className="card-desc">
          Analyze historical merged pull requests in a Git repository to automatically discover coding conventions.
        </p>

        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div className="form-group">
            <label className="form-label" htmlFor="repo-learn">GitHub Repository</label>
            <input
              id="repo-learn"
              type="text"
              className="input-text"
              placeholder="e.g. facebook/react or full Github URL"
              value={repoInput}
              onChange={(e) => setRepoInput(e.target.value)}
              disabled={learning}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%" }} disabled={learning}>
            {learning ? (
              <>
                <div className="loader-spinner" style={{ width: "16px", height: "16px", borderThickness: "2px", marginRight: "0.5rem" }}></div>
                Learning from PRs...
              </>
            ) : (
              <>
                <Sparkles size={16} /> Learn from Git History
              </>
            )}
          </button>
        </form>

        <div style={{ marginTop: "1.5rem", padding: "1rem", backgroundColor: "var(--surface-alt)", borderRadius: "var(--r-md)", border: "1px solid var(--border)", display: "flex", gap: "0.75rem" }}>
          <Info size={20} style={{ color: "var(--terra)", flexShrink: 0, marginTop: "2px" }} />
          <div style={{ fontSize: "0.85rem", color: "var(--t2)" }}>
            PRHawk pulls the last 10 merged pull requests, extracts changes, and prompts AI to catalog repeated patterns.
          </div>
        </div>
      </div>
    </div>
  );
}
