import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

import '../../scss/main.cube.scss'
// may have to use [this](https://lit.dev/docs/components/styles/#external-stylesheet) until I can think of a better way

@customElement("atom-button")
export class AtomButton extends LitElement {
  // Styles are scoped to this element: they won't conflict with styles
  // on the main page or in other components. Styling API can be exposed
  // via CSS custom properties.
  static styles = css`
    span {
      color: black;
      display: inline-block;
      padding: 10px;
      background: hsl(50 80% 40%);
    }
    .planet {
      color: var(--planet-color, white);
    }
  `;



  // Define reactive properties--updating a reactive property causes
  // the component to update.
  @property() greeting = "Hello!!!";
  @property() planet = "World";

  // The render() method is called any time reactive properties change.
  // Return HTML in a string template literal tagged with the `html`
  // tag function to describe the component's internal DOM.
  // Expressions can set attribute values, property values, event handlers,
  // and child nodes/text.
  render() {
    return html`
      <span @click=${this.togglePlanet}
        >${this.greeting}
        <span class="planet">${this.planet}</span>
      </span>
    `;
  }

  // Event handlers can update the state of @properties on the element
  // instance, causing it to re-render
  togglePlanet() {
    this.planet = this.planet === "World" ? "Mars" : "World";
  }
}
