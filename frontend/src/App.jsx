import { useState, useEffect } from "react";
import { fetchAuthRequired, verifyAccessKey } from "./lib/api";
import { STORAGE_KEYS } from "./lib/storageKeys";
import usePersistentState from "./hooks/usePersistentState";
import ReviewTab from "./components/ReviewTab";
import RulesTab from "./components/RulesTab";
import OnboardingOverlay from "./components/OnboardingOverlay";
import Header from "./components/Header";
import ToastContainer from "./components/ToastContainer";

export default function App() {
  // Authentication & Onboarding states
  const [authRequired, setAuthRequired] = useState(false);
  const [accessKey, setAccessKey] = useState(localStorage.getItem(STORAGE_KEYS.accessKey) || "");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(true);

  // Onboarding state
  const [onboardingComplete, setOnboardingComplete] = useState(
    localStorage.getItem(STORAGE_KEYS.onboardingComplete) === "true"
  );

  // Settings modal state
  const [showSettings, setShowSettings] = useState(false);

  // Layout states (persisted so the active tab survives a refresh)
  const [activeTab, setActiveTab] = usePersistentState(STORAGE_KEYS.activeTab, "review");

  // Toast notifications state
  const [toasts, setToasts] = useState([]);

  // Toast utility
  const addToast = (message, type = "info") => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Check auth status on startup
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const data = await fetchAuthRequired();
        setAuthRequired(data.authRequired);

        if (data.authRequired && accessKey) {
          // Verify saved key by trying to fetch conventions
          const testRes = await verifyAccessKey(accessKey);
          if (testRes.status === 401) {
            setAuthError("Saved access key is invalid. Please log in again.");
            setAccessKey("");
            localStorage.removeItem(STORAGE_KEYS.accessKey);
            setOnboardingComplete(false); // Force re-auth/onboarding
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

  // Ensure dark mode is always disabled since the dark mode feature is removed
  useEffect(() => {
    document.body.classList.remove("dark");
    localStorage.removeItem(STORAGE_KEYS.theme);
  }, []);

  const handleCompleteOnboarding = async (key) => {
    setAuthError("");
    if (authRequired) {
      if (!key) {
        setAuthError("Access key is required.");
        return;
      }

      try {
        // Test the input key
        const res = await verifyAccessKey(key);

        if (res.status === 401) {
          setAuthError("Access key is invalid. Please try again.");
          return;
        }

        localStorage.setItem(STORAGE_KEYS.accessKey, key);
        setAccessKey(key);
      } catch (err) {
        setAuthError("Failed to verify access key. Is the server running?");
        return;
      }
    }

    setOnboardingComplete(true);
    addToast("Setup completed successfully!", "success");
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEYS.accessKey);
    localStorage.removeItem(STORAGE_KEYS.onboardingComplete);
    setAccessKey("");
    setOnboardingComplete(false);
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

  // Display onboarding wizard on first visit, or settings override
  const showOnboarding = !onboardingComplete || (authRequired && !accessKey);

  return (
    <div className="app-container">
      {showOnboarding && (
        <OnboardingOverlay
          authRequired={authRequired}
          onComplete={handleCompleteOnboarding}
          errorMsg={authError}
        />
      )}

      {showSettings && (
        <OnboardingOverlay
          settingsMode={true}
          onClose={() => {
            setShowSettings(false);
            addToast("Settings updated!", "success");
          }}
        />
      )}

      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSettings={() => setShowSettings(true)}
        showLogout={authRequired && accessKey}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main>
        {activeTab === "review" ? (
          <ReviewTab accessKey={accessKey} addToast={addToast} />
        ) : (
          <RulesTab accessKey={accessKey} addToast={addToast} />
        )}
      </main>

      <ToastContainer toasts={toasts} />
    </div>
  );
}
