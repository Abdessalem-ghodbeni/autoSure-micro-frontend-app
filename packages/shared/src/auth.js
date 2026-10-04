import { createStore } from "./store.js";
import { emitEvent, EVENTS } from "./bus.js";

const STORE_KEY = Symbol.for("autosure.authStore");
const STORAGE_KEY = "autosure.session";
const EMPTY_SESSION = { token: null, user: null };

// Décoder le contenu (payload) d'un JWT. Attention : ce n'est PAS une vérification,
// seul le backend peut vérifier la signature.
export function parseJwt(token) {
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join(""),
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function isExpired(token) {
  const payload = parseJwt(token);
  if (!payload) return true;
  if (!payload.exp) return false;
  return payload.exp * 1000 < Date.now();
}

function loadInitialSession() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
    if (saved?.token && !isExpired(saved.token)) return saved;
  } catch {
    // session illisible : on repart de zéro
  }
  return EMPTY_SESSION;
}

// Le store est créé UNE seule fois, même si ce fichier est copié dans plusieurs bundles.
export const authStore = (globalThis[STORE_KEY] ??=
  createStore(loadInitialSession()));

export function startSession(authResponse) {
  const accessToken = authResponse?.accessToken;
  const refreshToken = authResponse?.refreshToken;
  const userDetails = authResponse?.userDetails;

  if (!accessToken) {
    throw new Error("Access token manquant dans la réponse de login.");
  }

  // Décodage du JWT
  const payload = parseJwt(accessToken);

  // On récupère le rôle depuis userDetails en priorité,
  // puis authorities, puis JWT
  const role =
    userDetails?.role ??
    userDetails?.authorities?.[0]?.authority ??
    payload?.role ??
    payload?.roles?.[0] ??
    null;

  // On ne garde que les données nécessaires
  // et surtout PAS le password
  const user = {
    id: userDetails?.id ?? null,
    email: userDetails?.email ?? payload?.sub ?? null,
    nom: userDetails?.nom ?? null,
    prenom: userDetails?.prenom ?? null,
    numeroPhone: userDetails?.numeroPhone ?? null,
    role,
    isActive: userDetails?.isActive ?? false,
    enabled: userDetails?.enabled ?? false,
  };

  // On conserve "token" pour rester compatible
  // avec ton apiFetch() et ProtectedRoute()
  const session = {
    token: accessToken,
    refreshToken,
    user,
  };

  // Persistance de la session
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));

  // Mise à jour du store partagé
  authStore.setState(session);

  // Information des autres micro-frontends
  emitEvent(EVENTS.LOGIN, user);
}

export function endSession() {
  sessionStorage.removeItem(STORAGE_KEY);
  authStore.setState(EMPTY_SESSION);
  emitEvent(EVENTS.LOGOUT);
}
