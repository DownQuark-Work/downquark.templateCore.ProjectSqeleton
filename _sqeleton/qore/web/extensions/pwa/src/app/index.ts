// import {LitElement, html} from 'lit';
// import {customElement} from 'lit/decorators.js';

import { DQ_PWA } from './dq.pwa'
import { MyElement } from '../_components/dq.qomponents.esm'

(document.getElementById('extension') as HTMLDivElement).innerHTML = `HTML has been updated with an imported typescript file: ${DQ_PWA}
<p>TODO: RENDER THIS WITH LIT AS OPPOSED TO innerHTML and include the duped my-element file
`
console.log('MyElement', MyElement)

// <my-element>

// entry point for all PWA source files
//   rollup process will (com/trans)pile these to:
//     `_extension/TRANSPILED/extension.js`