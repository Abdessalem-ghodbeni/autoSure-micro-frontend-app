import { useEffect, useRef, useState } from "react";
import { loadScript } from "../lib/loadScript.js";

export default function MicroFrontend({ tag, src, attrs = {} }) {
  const containerRef = useRef(null);
  const [status, setStatus] = useState("loading");
  const attrsKey = JSON.stringify(attrs);

  useEffect(() => {
    let cancelled = false;
    const container = containerRef.current;
    setStatus("loading");

    loadScript(src)
      .then(() => {
        if (cancelled) return;
        const element = document.createElement(tag);
        Object.entries(JSON.parse(attrsKey)).forEach(([name, value]) => {
          element.setAttribute(name, value);
        });
        container.appendChild(element);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
      container.innerHTML = "";
    };
  }, [tag, src, attrsKey]);

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
