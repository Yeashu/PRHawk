// Centralized localStorage keys used across the app.
// Keeping these in one place avoids typos and keeps persistence consistent.
export const STORAGE_KEYS = {
  accessKey: "prhawk_access_key",
  onboardingComplete: "code_reviewer_onboarding_complete",
  credType: "code_reviewer_cred_type",
  githubToken: "code_reviewer_github_token",
  openRouterKey: "code_reviewer_openrouter_key",
  theme: "prhawk_theme",

  // Persisted UI / data state (so it survives a page refresh)
  activeTab: "prhawk_active_tab",
  reviewResult: "prhawk_review_result",
  reviewUrl: "prhawk_review_url",
};
