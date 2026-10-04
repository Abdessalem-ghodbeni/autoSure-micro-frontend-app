import { getConfig } from "./config.js";
import { authStore, endSession } from "./auth.js";
import { emitEvent, EVENTS } from "./bus.js";

// fetch() amélioré : URL de base + JWT automatique + gestion du 401.
export async function apiFetch(path, options = {}) {
  const { token } = authStore.getState();

  const headers = new Headers(options.headers);
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(getConfig().apiUrl + path, {
    ...options,
    headers,
  });

  if (response.status === 401 && token) {
    endSession();
    emitEvent(EVENTS.NAVIGATE, "/login");
  }
  return response;
}

export async function readErrorMessage(response, fallback) {
  try {
    const text = await response.text();
    if (!text) return fallback;
    try {
      const data = JSON.parse(text);
      return data.message ?? data.error ?? fallback;
    } catch {
      return text.length < 200 ? text : fallback;
    }
  } catch {
    return fallback;
  }
}
