import { STORAGE_KEYS } from "./storageKeys";

// Builds the request headers shared by the data endpoints. Personal GitHub /
// OpenRouter keys are read from localStorage and only attached when present —
// this mirrors the original per-component logic exactly.
function credentialHeaders(accessKey, { json = false } = {}) {
  const githubToken = localStorage.getItem(STORAGE_KEYS.githubToken) || "";
  const openRouterKey = localStorage.getItem(STORAGE_KEYS.openRouterKey) || "";
  return {
    ...(json ? { "Content-Type": "application/json" } : {}),
    ...(accessKey ? { "x-access-key": accessKey } : {}),
    ...(githubToken ? { "x-github-token": githubToken } : {}),
    ...(openRouterKey ? { "x-openrouter-key": openRouterKey } : {}),
  };
}

async function parseJsonOrThrow(response, fallbackError) {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || fallbackError);
  }
  return data;
}

// Whether this instance requires an access key. -> { authRequired: boolean }
export async function fetchAuthRequired() {
  const res = await fetch("/api/auth-required");
  return res.json();
}

// Probes the conventions endpoint with just the access key so the caller can
// inspect response.status (401 => invalid key). Returns the raw Response.
export function verifyAccessKey(key) {
  return fetch("/api/conventions", { headers: { "x-access-key": key } });
}

export async function runReview(url, accessKey) {
  const response = await fetch("/api/review", {
    method: "POST",
    headers: credentialHeaders(accessKey, { json: true }),
    body: JSON.stringify({ url }),
  });
  return parseJsonOrThrow(response, "Failed to run review");
}

export async function getConventions(accessKey) {
  const response = await fetch("/api/conventions", {
    headers: credentialHeaders(accessKey),
  });
  return parseJsonOrThrow(response, "Failed to load rules");
}

export async function learnConventions(repo, accessKey) {
  const response = await fetch("/api/learn", {
    method: "POST",
    headers: credentialHeaders(accessKey, { json: true }),
    body: JSON.stringify({ repo }),
  });
  return parseJsonOrThrow(response, "Failed to learn conventions");
}

export async function saveConventions(rules, accessKey) {
  const response = await fetch("/api/conventions", {
    method: "PUT",
    headers: credentialHeaders(accessKey, { json: true }),
    body: JSON.stringify({ rules }),
  });
  return parseJsonOrThrow(response, "Failed to save conventions");
}
