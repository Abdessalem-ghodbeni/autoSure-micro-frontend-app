import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onEvent, EVENTS } from "@autosure/shared";

export default function NavigationBridge() {
  const navigate = useNavigate();

  useEffect(() => {
    return onEvent(EVENTS.NAVIGATE, (path) => navigate(path));
  }, [navigate]);

  return null;
}
