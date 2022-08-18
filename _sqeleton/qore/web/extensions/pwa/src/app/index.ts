import { DQ_PWA } from "./dq.pwa";

(document.getElementById('extension') as HTMLDivElement).innerHTML = `HTML has been updated with an imported typescript file: ${DQ_PWA}`

// entry point for all PWA source files
//   rollup process will (com/trans)pile these to:
//     `_extension/TRANSPILED/extension.js`