import { LitElement, html, css } from "lit";
import { defineOnce } from "./define.js";

export class AsAlert extends LitElement {
  static properties = { type: { type: String } };

  static styles = css`
    :host {
      display: block;
      margin-bottom: 14px;
    }
    div {
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 14px;
    }
    .error {
      background: #fee2e2;
      color: #991b1b;
    }
    .success {
      background: #dcfce7;
      color: #166534;
    }
    .info {
      background: #dbeafe;
      color: #1e40af;
    }
  `;

  constructor() {
    super();
    this.type = "info";
  }

  render() {
    return html`<div class=${this.type} role="alert"><slot></slot></div>`;
  }
}

defineOnce("as-alert", AsAlert);
