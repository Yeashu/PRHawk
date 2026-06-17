import { Copy, Check, Lightbulb, Zap } from "lucide-react";

export default function DiagnosticCard({ comment, copied, onCopy }) {
  return (
    <div className={`diagnostic-card sev-${comment.severity}`}>
      {/* Colored severity accent bar */}
      <div className="diag-accent-bar" />

      <div className="diag-body">
        {/* Card Header: badge + line pill */}
        <div className="diag-header">
          <div className="diag-header-left">
            <span className={`badge badge-${comment.severity}`}>{comment.severity}</span>
            <span className="diag-line-pill">L{comment.line}</span>
          </div>
        </div>

        {/* Issue Title */}
        <div className="diag-issue">{comment.issue}</div>

        {/* Why It Matters — tinted callout */}
        <div className={`diag-why sev-bg-${comment.severity}`}>
          <div className="diag-why-label">
            <Lightbulb size={13} />
            Why it matters
          </div>
          <p className="diag-why-text">{comment.whyItMatters}</p>
        </div>

        {/* Suggested Fix — IDE-style code panel */}
        <div className="diag-fix-panel">
          <div className="diag-fix-header">
            <div className="diag-fix-header-left">
              <Zap size={13} />
              Suggested Fix
            </div>
            <button
              className="diag-copy-btn"
              onClick={() => onCopy(comment.suggestedFix)}
              title="Copy fix"
            >
              {copied
                ? <><Check size={13} /> Copied</>
                : <><Copy size={13} /> Copy</>}
            </button>
          </div>
          <pre className="diag-fix-code">{comment.suggestedFix}</pre>
        </div>
      </div>
    </div>
  );
}
