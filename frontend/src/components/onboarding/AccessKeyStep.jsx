import { Lock, ShieldAlert, ChevronLeft, Check } from "lucide-react";

export default function AccessKeyStep({
  errorMsg,
  accessKeyInput,
  setAccessKeyInput,
  onSubmit,
  onBack,
}) {
  return (
    <div className="onboarding-step-content animate-slide">
      <div className="onboarding-icon-wrapper">
        <Lock size={28} />
      </div>
      <h2 className="onboarding-title">Security Check</h2>
      <p className="onboarding-desc">
        This instance is secured. Please enter the App Access Key to initialize your workspace.
      </p>

      {errorMsg && (
        <div className="error-alert">
          <ShieldAlert size={16} />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={onSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div className="form-group" style={{ textAlign: "left" }}>
          <label className="form-label" htmlFor="onboarding-access-key">App Access Key</label>
          <input
            id="onboarding-access-key"
            type="password"
            placeholder="Enter access key"
            className="input-text"
            value={accessKeyInput}
            onChange={(e) => setAccessKeyInput(e.target.value)}
            required
          />
        </div>

        <div className="onboarding-navigation">
          <button type="button" onClick={onBack} className="btn btn-secondary">
            <ChevronLeft size={16} /> Back
          </button>
          <button type="submit" className="btn btn-primary">
            Complete Setup <Check size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
