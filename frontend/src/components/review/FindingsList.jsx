import { CheckCircle, FileText } from "lucide-react";
import DiagnosticCard from "./DiagnosticCard";

export default function FindingsList({ allComments, filteredComments, copiedIndex, onCopy }) {
  if (filteredComments.length === 0) {
    return (
      <div className="empty-state">
        <CheckCircle size={40} style={{ color: "var(--color-safe)" }} />
        <div className="empty-state-title">No Findings Match Filters</div>
        <div className="empty-state-desc">Your code changes align perfectly with the selected severity filters.</div>
      </div>
    );
  }

  // Group comments by file path (preserves original order of insertion).
  const commentsByFile = filteredComments.reduce((acc, comment) => {
    if (!acc[comment.path]) acc[comment.path] = [];
    acc[comment.path].push(comment);
    return acc;
  }, {});

  return Object.keys(commentsByFile).map((filePath) => (
    <div key={filePath} className="file-group">
      <div className="file-header">
        <FileText size={16} className="file-icon" />
        <span>{filePath}</span>
        <span className="file-comment-count">{commentsByFile[filePath].length}</span>
      </div>

      <div className="file-comments-container">
        {commentsByFile[filePath].map((comment, index) => {
          const globalIndex = allComments.indexOf(comment);
          return (
            <DiagnosticCard
              key={index}
              comment={comment}
              copied={copiedIndex === globalIndex}
              onCopy={(text) => onCopy(text, globalIndex)}
            />
          );
        })}
      </div>
    </div>
  ));
}
