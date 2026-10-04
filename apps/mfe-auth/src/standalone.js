import { mount } from "./mount.js";

// Mode autonome : le micro frontend tourne seul, sans le shell.
const view = new URLSearchParams(location.search).get("view") ?? "login";

mount(document.getElementById("app"), {
  view,
  navigate: (path) =>
    console.log("[mode autonome] navigation demandée vers", path),
});
