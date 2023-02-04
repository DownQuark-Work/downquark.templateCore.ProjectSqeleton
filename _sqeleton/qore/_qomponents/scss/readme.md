https://web.dev/design-system/
> https://github.com/googlechrome/web.dev
> > https://github.com/GoogleChrome/web.dev/blob/main/src/site/_data/design/tokens.json

https://css-tricks.com/css-cascade-layers/
- https://github.com/orgs/vanillawc/repositories?type=all

# SCSS Options
There are two approaches we support when it comes to organizing and structuring the styling of the Application/Project:

## [The 7-1 Pattern](https://sass-guidelin.es/#the-7-1-pattern)
The 7-1 pattern: 7 folders, 1 file. Basically, you have all your partials stuffed into 7 different folders, and a single file at the root level (usually named main.scss) which imports them all to be compiled into a CSS stylesheet.

> NOTE: `layout` and `pages` have been renamed to `templates` and `screens` to match the best practices of the Atomic Design Pattern
> > 'https://daverupert.com/2022/08/modern-alternatives-to-bem/

--- 

## [CUBE CSS Pattern](https://piccalil.li/blog/cube-css/)
-  More of a [methodology](https://cube.fyi/composition.html#why-macro-level-thinking) than [strict rules](https://piccalil.li/tutorial/build-a-dashboard-with-cube-css/)

> The core of this methodology is that most of the work is already done for you with global and high-level styles. This means that before you even starting thinking about components—or the in the case of CUBE CSS—blocks, your typography is mostly set, your colours are working great and your elements are working harmoniously with each other. We use the rest of the methodology—CUBE—not to style everything, but instead, to provide contextual styles that deviate from the common, global system.
---
_CUBE CSS_ in essence, is a progressive enhancement approach, vs a fight against the grain of CSS or a pixel-pushing your project to within an inch of its life approach. 

_CUBE CSS_ also takes into account a **Grouping Mechanism** on the HTML side.
For instance:
`<article class="[ card ] [ section box ] [ bg-base color-primary ]" data-state="reversed"></article>`
Or:
`<article class="card | section box | bg-base color-primary" data-state="reversed"></article>`

The important thing is that related classes are grouped together, but a recommended order is as follows:
  1. The elements’s primary block class
  1. Any subsequent block classes
  1. Standard utility classes
  1. Design token utility classes

CUBE CSS Use logical properties (`margin-inline`, `padding-inline`) -> [tutorial](https://piccalil.li/tutorial/css-logical-properties/)

**Consistency is the aim**
Whether you choose square brackets, pipes or even unicorns: the priority is consistency and ease-of-reading.
CUBE CSS's [Tutorial Implementation](https://github.com/piccalil-li/cube-css-dashboard/tree/master/scss)

> https://web.dev/design-system/ - built with CUBE CSS in mind
> - https://github.com/GoogleChrome/web.dev/tree/main/src/scss
> - https://github.com/GoogleChrome/web.dev/tree/main/src/component-library
> (all patterns: https://web.dev/patterns/)