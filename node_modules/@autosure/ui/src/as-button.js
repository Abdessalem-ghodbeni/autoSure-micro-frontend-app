import { LitElement, html, css } from "lit";
import { defineOnce } from "./define.js";

export class AsButton extends LitElement {
  static properties = {
    variant: { type: String },
    loading: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
  };

  static styles = css`
    :host {
      display: inline-block;
    }
    :host([disabled]),
    :host([loading]) {
      pointer-events: none;
      opacity: 0.7;
    }
    button {
      width: 100%;
      font: inherit;
      cursor: pointer;
      border: 1px solid var(--as-primary, #1d4ed8);
      border-radius: 8px;
      padding: 10px 18px;
      color: #fff;
      background: var(--as-primary, #1d4ed8);
    }
    button.secondary {
      color: var(--as-primary, #1d4ed8);
      background: transparent;
    }
  `;

  constructor() {
    super();
    this.variant = "primary";
    this.loading = false;
    this.disabled = false;
  }

  render() {
    return html`
      <button class=${this.variant} ?disabled=${this.disabled || this.loading}>
        ${this.loading ? "Chargement…" : html`<slot></slot>`}
      </button>
    `;
  }
}

defineOnce("as-button", AsButton);
