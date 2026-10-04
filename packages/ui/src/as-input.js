import { LitElement, html, css } from "lit";
import { defineOnce } from "./define.js";

export class AsInput extends LitElement {
  static properties = {
    label: { type: String },
    type: { type: String },
    value: { type: String },
    error: { type: String },
    placeholder: { type: String },
  };

  static styles = css`
    :host {
      display: block;
      margin-bottom: 14px;
    }
    label {
      display: block;
      font-size: 14px;
      margin-bottom: 4px;
      color: #374151;
    }
    input {
      width: 100%;
      box-sizing: border-box;
      font: inherit;
      padding: 9px 12px;
      border: 1px solid #d1d5db;
      border-radius: 8px;
    }
    input:focus {
      outline: 2px solid var(--as-primary, #1d4ed8);
      border-color: transparent;
    }
    .error {
      display: block;
      margin-top: 4px;
      font-size: 13px;
      color: #b91c1c;
    }
  `;

  constructor() {
    super();
    this.label = "";
    this.type = "text";
    this.value = "";
    this.error = "";
    this.placeholder = "";
  }

  _onInput(event) {
    this.value = event.target.value;
    this.dispatchEvent(
      new CustomEvent("value-changed", {
        detail: this.value,
        bubbles: true,
        composed: true,
      }),
    );
  }

  _onKeydown(event) {
    if (event.key === "Enter") {
      this.dispatchEvent(
        new CustomEvent("enter-pressed", { bubbles: true, composed: true }),
      );
    }
  }

  render() {
    return html`
      <label>${this.label}</label>
      <input
        .value=${this.value}
        type=${this.type}
        placeholder=${this.placeholder}
        @input=${this._onInput}
        @keydown=${this._onKeydown}
      />
      ${this.error ? html`<span class="error">${this.error}</span>` : ""}
    `;
  }
}

defineOnce("as-input", AsInput);
