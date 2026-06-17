import { useState } from "react";
import { X } from "lucide-react";
import { STORAGE_KEYS } from "../lib/storageKeys";
import WelcomeStep from "./onboarding/WelcomeStep";
import CredentialsStep from "./onboarding/CredentialsStep";
import AccessKeyStep from "./onboarding/AccessKeyStep";

export default function OnboardingOverlay({ authRequired, onComplete, errorMsg, settingsMode, onClose }) {
  // If settingsMode, we start directly on step 2
  const [step, setStep] = useState(settingsMode ? 2 : 1);
  const [credType, setCredType] = useState(
    localStorage.getItem(STORAGE_KEYS.credType) || "central"
  );

  // Custom credential states
  const [customGithubToken, setCustomGithubToken] = useState(
    localStorage.getItem(STORAGE_KEYS.githubToken) || ""
  );
  const [customOpenRouterKey, setCustomOpenRouterKey] = useState(
    localStorage.getItem(STORAGE_KEYS.openRouterKey) || ""
  );

  // Access Key state
  const [accessKeyInput, setAccessKeyInput] = useState("");

  // Persist the chosen credential configuration to localStorage.
  const persistCredentials = () => {
    if (credType === "custom") {
      localStorage.setItem(STORAGE_KEYS.githubToken, customGithubToken.trim());
      localStorage.setItem(STORAGE_KEYS.openRouterKey, customOpenRouterKey.trim());
      localStorage.setItem(STORAGE_KEYS.credType, "custom");
    } else {
      localStorage.removeItem(STORAGE_KEYS.githubToken);
      localStorage.removeItem(STORAGE_KEYS.openRouterKey);
      localStorage.setItem(STORAGE_KEYS.credType, "central");
    }
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (settingsMode) {
        handleSaveSettings();
      } else if (authRequired) {
        setStep(3);
      } else {
        handleFinish();
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSaveSettings = () => {
    persistCredentials();
    if (onClose) onClose();
  };

  const handleFinish = (e) => {
    if (e) e.preventDefault();

    persistCredentials();

    // Mark onboarding as complete
    localStorage.setItem(STORAGE_KEYS.onboardingComplete, "true");

    // Complete onboarding
    onComplete(accessKeyInput.trim());
  };

  const totalSteps = authRequired ? 3 : 2;

  return (
    <div className="auth-overlay">
      <div className="auth-modal onboarding-modal">
        {/* Cancel button if settingsMode */}
        {settingsMode && (
          <button onClick={onClose} className="onboarding-close-btn" title="Close Settings">
            <X size={18} />
          </button>
        )}

        {/* Stepper progress indicator (hidden in settings mode) */}
        {!settingsMode && (
          <div className="onboarding-stepper">
            {Array.from({ length: totalSteps }).map((_, idx) => (
              <div
                key={idx}
                className={`step-dot ${step === idx + 1 ? "active" : ""} ${step > idx + 1 ? "completed" : ""}`}
              />
            ))}
          </div>
        )}

        {step === 1 && !settingsMode && (
          <WelcomeStep onNext={handleNext} />
        )}

        {step === 2 && (
          <CredentialsStep
            settingsMode={settingsMode}
            credType={credType}
            setCredType={setCredType}
            customGithubToken={customGithubToken}
            setCustomGithubToken={setCustomGithubToken}
            customOpenRouterKey={customOpenRouterKey}
            setCustomOpenRouterKey={setCustomOpenRouterKey}
            totalSteps={totalSteps}
            onNext={handleNext}
            onBack={handleBack}
            onSaveSettings={handleSaveSettings}
            onClose={onClose}
          />
        )}

        {step === 3 && authRequired && !settingsMode && (
          <AccessKeyStep
            errorMsg={errorMsg}
            accessKeyInput={accessKeyInput}
            setAccessKeyInput={setAccessKeyInput}
            onSubmit={handleFinish}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
}
