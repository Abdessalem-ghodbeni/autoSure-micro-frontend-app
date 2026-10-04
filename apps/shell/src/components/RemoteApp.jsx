import { useEffect, useRef, useState } from "react";

export default function RemoteApp({ load, props }) {
  const containerRef = useRef(null);
  const instanceRef = useRef(null);
  const [status, setStatus] = useState("loading");

  // 1. Charger le micro frontend et le démarrer
  useEffect(() => {
    let cancelled = false;
    setStatus("loading");

    load()
      .then((remote) => {
        if (cancelled) return;
        instanceRef.current = remote.mount(containerRef.current, props);
        setStatus("ready");
      })
      .catch((error) => {
        console.error("Micro frontend indisponible :", error);
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
      instanceRef.current?.unmount();
      instanceRef.current = null;
    };
  }, [load]); // eslint-disable-line react-hooks/exhaustive-deps

  // 2. Transmettre les nouvelles props (ex. view="register")
  useEffect(() => {
    instanceRef.current?.update(props);
  });

  return (
    <div>
      {status === "loading" && <p>Chargement du module…</p>}
      {status === "error" && (
        <p className="mfe-error">Ce module est momentanément indisponible.</p>
      )}
      <div ref={containerRef} />
    </div>
  );
}
