https://cube.fyi/block.html

A **block** is a **skeletal component or organisational structure**.
To compare it to common user interface elements: it is a card element or a button element.

A block is skeletal because by the time you get to the block-level in CUBE CSS, **most of the work has already been done** by the global CSS, composition and utility layers.

## A block has no formal element syntax

## Composition within blocks
It is advised that you approach the internals of your block with a composition layer.

example:
> Inside a card’s content area, we have a heading and some content.
> Using a flow utility, we create a block-level composition layer, which means that any content should be supported in this element.
> Thanks to composition, any content will work fine.
> This all ties-back to **hinting the browser with flexible rules, rather than micro-managing it**. This mantra is why CUBE CSS helps to create really scalable front-ends.

## What should a block do?
- Extend the work already done by the global CSS, composition and utility layers
- Apply a collection of design tokens within a concise group
- Create a namespace or specificity boost to control a specific context

## What shouldn’t a block do?
- Grow to anything larger than a handful of CSS rules (max 80-100 lines)
- Solve more than one contextual problem. For example: styling a card and a button in one file