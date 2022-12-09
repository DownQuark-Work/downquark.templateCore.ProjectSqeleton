https://cube.fyi/utility.html

A utility, in the context of CUBE CSS, is a CSS class that does one job and does that job well.

> This CSS class, more often than not, will have one CSS property defined, but it might also have a few, in a concise group, like this example of a wrapper utility

## What should utilities do?
- Apply a single CSS property, or a concise group of related properties to create re-usable helpers
- Extend design tokens to maintain a single source of truth
- Abstract repeatability away from the CSS and apply it in the HTML instead

## What shouldn’t utilities do?
- Define a large group of unrelated CSS properties.
  - For example, a utility that defined `color`, `font-size` and `padding` would make more sense to be a block.
- Be used as a specificity hack.
  - For example, setting all properties with `!important` will undoubtedly cause problems in the long-run.

  > Sidenote: [this](https://hackingui.com/10-best-scss-utilities/) may have something worthwhile - but may not