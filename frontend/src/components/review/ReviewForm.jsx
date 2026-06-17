import { GitPullRequest, Clock, X } from "lucide-react";

export default function ReviewForm({ url, setUrl, loading, onSubmit }) {
  return (
    <div className="review-input-section">
      <h2 className="review-input-title">PRHawk</h2>
      <p className="review-input-subtitle">Paste a GitHub pull request URL to audit changes against conventions</p>

      <form onSubmit={onSubmit}>
        <div className="pr-input-container">
          <input
            type="text"
            placeholder="e.g., https://github.com/owner/repo/pull/42"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={loading}
          />
          {url && !loading && (
            <button
              type="button"
              className="icon-btn"
              onClick={() => setUrl("")}
              title="Clear URL"
            >
              <X size={18} />
            </button>
          )}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <>
                <Clock size={18} className="spin" /> Reviewing...
              </>
            ) : (
              <>
                <GitPullRequest size={18} /> Run Review
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
