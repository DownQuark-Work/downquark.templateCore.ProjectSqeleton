import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

import '../../scss/main.cube.scss'
// may have to use [this](https://lit.dev/docs/components/styles/#external-stylesheet) until I can think of a better way

@customElement("atom-timeline")
export class AtomTimeline extends LitElement {
  // Styles are scoped to this element: they won't conflict with styles
  // on the main page or in other components. Styling API can be exposed
  // via CSS custom properties.
  static styles = css`
    .timeline {
        /* Used to position the left vertical line */
        position: relative;
    }

    .timeline-line {
        /* Border */
        border-right: 2px solid #d1d5db;

        /* Positioned at the left */
        left: 0.75rem;
        position: absolute;
        top: 0px;

        /* Take full height */
        height: 100%;
    }

    .timeline-items {
        /* Reset styles */
        list-style-type: none;
        margin: 0px;
        padding: 0px;
    }

    .timeline-item {
        margin-bottom: 8px;
    }

    .timeline-top {
        /* Center the content horizontally */
        align-items: center;
        display: flex;
    }

    .timeline-circle {
        /* Rounded border */
        background-color: #d1d5db;
        border-radius: 9999px;

        /* Size */
        height: 1.5rem;
        width: 1.5rem;
    }

    .timeline-title {
        /* Take available width */
        flex: 1;
        margin-left: 0.5rem;
    }

    .timeline-desc {
        /* Make it align with the title */
        margin-left: 2rem;
    }
  `;
  /**
 * @type {string | boolean}
 */
  render() {
    return html`
    <div class="timeline">
      <div class="timeline-line"></div>
      <div class="timeline-items">
        <div class="timeline-item">
          <div class="timeline-top">
            <div class="timeline-circle"></div>
            <div class="timeline-title">Event One</div>
          </div>
          <div class="timeline-desc">
            <p>Lorem and pirates</p>
            <p>CommonJS (for Node) and ES module (for bundlers) build.
              (We could have three entries in the configuration array
              instead of two, but it's quicker to generate multiple
              builds from a single configuration where possible, using
              an array for the <code>output</code> option, where we can specify 
              <code>file</code> and <code>format</code> for each target)</p>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-top">
            <div class="timeline-circle"></div>
            <div class="timeline-title">Event Two</div>
          </div>
          <div class="timeline-desc">
            <p>Pirates and lorem</p>
            <p>The render() method is called any time reactive properties change.
                Return HTML in a string template literal tagged with the <code>html</code>
                tag function to describe the component's internal DOM.
                Expressions can set attribute values, property values, event handlers,
                and child nodes/text.</p>
          </div>
        </div>
      </div>
    </div>`
  }

  // Event handlers can update the state of @properties on the element
  // instance, causing it to re-render
  
}
