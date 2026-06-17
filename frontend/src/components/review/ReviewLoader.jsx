import { Check } from "lucide-react";

// Descriptions shown for each simulated progress stage.
const LOADER_STAGES = [
  "Fetching Pull Request details from GitHub...",
  "Parsing changed files and diff patches...",
  "Consulting your team's learned conventions...",
  "Generating AI review comments and quality report...",
];

export default function ReviewLoader({ stage }) {
  return (
    <div className="card">
      <div className="loader-container">
        <div className="loader-spinner"></div>
        <div style={{ textAlign: "center" }}>
          <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "0.25rem" }}>Reviewing Pull Request</h3>
          <p style={{ fontSize: "0.85rem", color: "var(--t3)" }}>This can take up to a minute depending on the size of the changes</p>
        </div>

        <div className="loader-stages">
          {LOADER_STAGES.map((stageText, idx) => {
            let statusClass = "";
            if (stage > idx) statusClass = "completed";
            else if (stage === idx) statusClass = "active";

            return (
              <div key={idx} className={`loader-stage-item ${statusClass}`}>
                <div className="loader-stage-bullet">
                  {stage > idx && <Check size={10} />}
                </div>
                <span>{stageText}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
