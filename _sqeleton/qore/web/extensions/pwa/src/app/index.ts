import {html, css, LitElement} from 'lit'
import {customElement, property} from 'lit/decorators.js'

import { DQ_PWA } from './dq.pwa'
import '../_components/dq.qomponents.esm.js'

@customElement('simple-greeting')
export class SimpleGreeting extends LitElement {
  static styles = css`p { color: blue }`;

  @property()
  name = 'Somebody';

  render() {
    return html`<p>Hello, ${this.name}!
    <br/><b>${DQ_PWA}</b></p>
    <br/><my-element>loading...</my-element>`;
  }
}

// entry point for all PWA source files
//   rollup process will (com/trans)pile these to:
//     `_extension/TRANSPILED/extension.js`