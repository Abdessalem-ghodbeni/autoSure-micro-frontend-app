import { apiFetch, readErrorMessage, startSession } from "@autosure/shared";

const REGISTER_PATH = "/autoSure/auth/registerAgent";
const LOGIN_PATH = "/autoSure/auth/login";

export async function register({ nom, prenom, email, password, numeroPhone }) {
  const body = new URLSearchParams({
    nom,
    prenom,
    email,
    password,
    numeroPhone,
  });

  const response = await apiFetch(REGISTER_PATH, { method: "POST", body });

  if (!response.ok) {
    throw new Error(
      await readErrorMessage(response, "L'inscription a échoué."),
    );
  }
  return response.json();
}

export async function login({ email, password }) {
  const response = await apiFetch(LOGIN_PATH, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (response.status === 401 || response.status === 403) {
    throw new Error("Email ou mot de passe incorrect, ou compte non activé.");
  }
  if (!response.ok) {
    throw new Error(await readErrorMessage(response, "La connexion a échoué."));
  }

  const data = await response.json();
  startSession(data);
}
