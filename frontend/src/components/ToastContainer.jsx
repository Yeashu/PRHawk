import { CheckCircle, XCircle, Info } from "lucide-react";

export default function ToastContainer({ toasts }) {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast ${toast.type}`}>
          {toast.type === "success" && <CheckCircle size={16} style={{ color: "var(--color-safe)" }} />}
          {toast.type === "error" && <XCircle size={16} style={{ color: "var(--color-bug)" }} />}
          {toast.type !== "success" && toast.type !== "error" && <Info size={16} style={{ color: "var(--terra)" }} />}
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
