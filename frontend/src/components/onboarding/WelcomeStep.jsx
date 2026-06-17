import { Sparkles, Check, ChevronRight } from "lucide-react";

export default function WelcomeStep({ onNext }) {
  return (
    <div className="onboarding-step-content animate-slide">
      <div className="onboarding-icon-wrapper">
        <Sparkles size={28} />
      </div>
      <h2 className="onboarding-title">Welcome to PRHawk</h2>
      <p className="onboarding-desc">
        AI-driven code reviews tailored directly to your team's coding rules.
        Let's set up your workspace in just two minutes.
      </p>

      <div className="onboarding-features-list">
        <div className="onboarding-feature-item">
          <div className="feature-icon-bullet"><Check size={12} /></div>
          <div>
            <h4>Audit Coding Guidelines</h4>
            <p>Analyzes your pull requests for architectural and formatting compliance.</p>
          </div>
        </div>
        <div className="onboarding-feature-item">
          <div className="feature-icon-bullet"><Check size={12} /></div>
          <div>
            <h4>Actionable Suggested Fixes</h4>
            <p>Copy and apply code reviews instantly inside your editor.</p>
          </div>
        </div>
      </div>

      <button onClick={onNext} className="btn btn-primary onboarding-next-btn">
        Get Started <ChevronRight size={16} />
      </button>
    </div>
  );
}
