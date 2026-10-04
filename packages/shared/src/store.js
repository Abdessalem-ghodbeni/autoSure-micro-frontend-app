// c est un  mini store un objet qui garde un etat et previent ceux qui l ecoutentt
export function createStore(initialState) {
  let state = initialState;
  const listeners = new Set();

  return {
    getState: () => state,

    setState(patch) {
      state = { ...state, ...patch };
      listeners.forEach((listener) => listener(state));
    },

    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}
