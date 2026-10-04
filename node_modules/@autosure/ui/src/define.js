// sajili un composant une seule fois (fzet erreur te3 already defined )
export function defineOnce(tag, component) {
  if (!customElements.get(tag)) customElements.define(tag, component);
}
