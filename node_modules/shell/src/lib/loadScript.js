const loadedScripts = new Map();

export function loadScript(src) {
  if (loadedScripts.has(src)) return loadedScripts.get(src);

  const promise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = src;
    script.onload = resolve;
    script.onerror = () => {
      loadedScripts.delete(src);
      reject(new Error(`Impossible de charger ${src}`));
    };
    document.head.appendChild(script);
  });

  loadedScripts.set(src, promise);
  return promise;
}
