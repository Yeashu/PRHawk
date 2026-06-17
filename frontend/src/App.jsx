import React, { useState, useEffect } from "react";
import { 
  GitPullRequest, 
  BookOpen, 
  LogOut, 
  Lock, 
  ShieldAlert, 
  Info,
  CheckCircle,
  XCircle,
  HelpCircle
} from "lucide-react";
import ReviewTab from "./components/ReviewTab";
import RulesTab from "./components/RulesTab";
import AuthOverlay from "./components/AuthOverlay";

export default function App() {
  // Authentication states
  const [authRequired, setAuthRequired] = useState(false);
  const [accessKey, setAccessKey] = useState(localStorage.getItem("prhawk_access_key") || "");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(true);

  // Layout states
  const [activeTab, setActiveTab] = useState("review");
  
  // Toast notifications state
  const [toasts, setToasts] = useState([]);

  // Toast utility
  const addToast = (message, type = "info") => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Check auth requirement on startup
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await fetch("/api/auth-required");
        const data = await res.json();
        setAuthRequired(data.authRequired);
        
        if (data.authRequired && accessKey) {
          // Verify saved key by trying to fetch conventions
          const testRes = await fetch("/api/conventions", {
            headers: { "x-access-key": accessKey }
          });
          if (testRes.status === 401) {
            setAuthError("Saved access key is invalid. Please log in again.");
            setAccessKey("");
            localStorage.removeItem("prhawk_access_key");
          }
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        addToast("Error checking authentication status.", "error");
      } finally {
        setAuthLoading(false);
      }
    };
    
    checkAuthStatus();
  }, [accessKey]);

  // Ensure body dark mode is always disabled since the dark mode feature is removed
  useEffect(() => {
    document.body.classList.remove("dark");
    localStorage.removeItem("prhawk_theme");
  }, []);

  const handleSaveKey = async (key) => {
    setAuthError("");
    try {
      // Test the input key
      const res = await fetch("/api/conventions", {
        headers: { "x-access-key": key }
      });

      if (res.status === 401) {
        setAuthError("Access key is invalid. Please try again.");
      } else {
        localStorage.setItem("prhawk_access_key", key);
        setAccessKey(key);
        addToast("Authenticated successfully!", "success");
      }
    } catch (err) {
      setAuthError("Failed to verify access key. Is the server running?");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("prhawk_access_key");
    setAccessKey("");
    addToast("Logged out successfully.", "success");
  };

  // Show loading spinner if checking auth status
  if (authLoading) {
    return (
      <div style={{ display: "flex", width: "100vw", height: "100vh", alignItems: "center", justifyContent: "center", backgroundColor: "var(--bg)" }}>
        <div className="loader-spinner"></div>
      </div>
    );
  }

  // Determine whether to display the authentication form
  const showAuthForm = authRequired && !accessKey;

  return (
    <div className="app-container">
      {showAuthForm && (
        <AuthOverlay onSave={handleSaveKey} errorMsg={authError} />
      )}

      {/* Header */}
      <header className="app-header">
        <div className="brand" onClick={() => setActiveTab("review")}>
          <div className="brand-logo-mark">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2L30 16L16 30L2 16L16 2Z" stroke="var(--terra)" strokeWidth="2.5" strokeLinejoin="round"/>
              <path d="M16 9L23 16L16 23" stroke="var(--terra)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="16" r="2.5" fill="var(--terra)" />
            </svg>
          </div>
          <div className="brand-title">
            <h1>Code<span className="brand-title-accent">Reviewer</span><span className="brand-title-dot">.</span></h1>
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

          {/* Logout button if authenticated */}
          {authRequired && accessKey && (
            <button onClick={handleLogout} className="icon-btn" title="Logout" style={{ borderColor: "rgba(184, 74, 34, 0.2)" }}>
              <LogOut size={18} style={{ color: "var(--terra)" }} />
            </button>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main>
        {activeTab === "review" ? (
          <ReviewTab accessKey={accessKey} addToast={addToast} />
        ) : (
          <RulesTab accessKey={accessKey} addToast={addToast} />
        )}
      </main>

      {/* Toast Notification Container */}
      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className={`toast ${toast.type}`}>
            {toast.type === "success" && <CheckCircle size={16} style={{ color: "var(--color-safe)" }} />}
            {toast.type === "error" && <XCircle size={16} style={{ color: "var(--color-bug)" }} />}
            {toast.type !== "success" && toast.type !== "error" && <Info size={16} style={{ color: "var(--terra)" }} />}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
