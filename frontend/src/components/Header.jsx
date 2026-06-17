import { GitPullRequest, BookOpen, LogOut, Settings } from "lucide-react";

export default function Header({
  activeTab,
  setActiveTab,
  onOpenSettings,
  showLogout,
  onLogout,
}) {
  return (
    <header className="app-header">
      <div className="brand" onClick={() => setActiveTab("review")}>
        <div className="brand-logo-mark">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2L30 16L16 30L2 16L16 2Z" stroke="var(--terra)" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M16 9L23 16L16 23" stroke="var(--terra)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="16" r="2.5" fill="var(--terra)" />
          </svg>
        </div>
        <div className="brand-title">
          <h1>PR<span className="brand-title-accent">Hawk</span><span className="brand-title-dot">.</span></h1>
          <p className="brand-subtitle">AI Code Intelligence</p>
        </div>
      </div>

      <div className="header-actions">
        {/* Tabs Navigation */}
        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === "review" ? "active" : ""}`}
            onClick={() => setActiveTab("review")}
          >
            <GitPullRequest size={16} />
            Review PR
          </button>
          <button
            className={`tab-btn ${activeTab === "rules" ? "active" : ""}`}
            onClick={() => setActiveTab("rules")}
          >
            <BookOpen size={16} />
            Rules Manager
          </button>
        </div>

        {/* Settings Button */}
        <button
          onClick={onOpenSettings}
          className="icon-btn"
          title="Workspace Settings"
        >
          <Settings size={18} />
        </button>

        {/* Logout button if authenticated */}
        {showLogout && (
          <button onClick={onLogout} className="icon-btn" title="Logout" style={{ borderColor: "rgba(184, 74, 34, 0.2)" }}>
            <LogOut size={18} style={{ color: "var(--terra)" }} />
          </button>
        )}
      </div>
    </header>
  );
}
