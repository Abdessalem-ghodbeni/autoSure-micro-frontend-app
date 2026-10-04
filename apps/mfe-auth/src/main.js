import { createApp, h, reactive } from "vue";
import App from "./App.vue";

class AutosureAuth extends HTMLElement {
  static get observedAttributes() {
    return ["view"];
  }

  constructor() {
    super();
    this.state = reactive({ view: "login" });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "view") this.state.view = newValue || "login";
  }

  connectedCallback() {
    this.app = createApp({ render: () => h(App, { view: this.state.view }) });
    this.app.mount(this);
  }

  disconnectedCallback() {
    this.app?.unmount();
    this.app = null;
  }
}

if (!customElements.get("autosure-auth")) {
  customElements.define("autosure-auth", AutosureAuth);
}
