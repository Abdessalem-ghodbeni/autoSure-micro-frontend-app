// Bus d'événements : les micro frontends se parlent sans se connaître.
export const EVENTS = {
  NAVIGATE: "navigate",
  LOGIN: "login",
  LOGOUT: "logout",
};

export function emitEvent(name, detail) {
  window.dispatchEvent(new CustomEvent(`autosure:${name}`, { detail }));
}

export function onEvent(name, handler) {
  const listener = (event) => handler(event.detail);
  window.addEventListener(`autosure:${name}`, listener);
  return () => window.removeEventListener(`autosure:${name}`, listener);
}
