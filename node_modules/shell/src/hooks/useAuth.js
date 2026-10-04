import { useSyncExternalStore } from "react";
import { authStore } from "@autosure/shared";

export function useAuth() {
  return useSyncExternalStore(authStore.subscribe, authStore.getState);
}
