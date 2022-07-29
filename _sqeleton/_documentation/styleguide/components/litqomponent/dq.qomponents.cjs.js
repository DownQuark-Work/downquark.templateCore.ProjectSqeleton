'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var lit = require('lit');
var decorators_js = require('lit/decorators.js');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

exports.MyElement = class MyElement extends lit.LitElement {
    constructor() {
        super(...arguments);
        // Define reactive properties--updating a reactive property causes
        // the component to update.
        this.greeting = "Hello";
        this.planet = "World";
    }
    // The render() method is called any time reactive properties change.
    // Return HTML in a string template literal tagged with the `html`
    // tag function to describe the component's internal DOM.
    // Expressions can set attribute values, property values, event handlers,
    // and child nodes/text.
    render() {
        return lit.html `
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
};
// Styles are scoped to this element: they won't conflict with styles
// on the main page or in other components. Styling API can be exposed
// via CSS custom properties.
exports.MyElement.styles = lit.css `
  
    :host {
      display: inline-block;
      padding: 10px;
      background: lightgray;
    }
    .planet {
      color: var(--planet-color, blue);
    }
  `;
__decorate([
    decorators_js.property()
], exports.MyElement.prototype, "greeting", void 0);
__decorate([
    decorators_js.property()
], exports.MyElement.prototype, "planet", void 0);
exports.MyElement = __decorate([
    decorators_js.customElement("my-element")
], exports.MyElement);
