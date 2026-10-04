export function getConfig() {
  return (
    window.AUTOSURE_CONFIG ?? { apiUrl: "http://localhost:8089", remotes: {} }
  );
}
