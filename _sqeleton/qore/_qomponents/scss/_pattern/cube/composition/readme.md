https://cube.fyi/composition.html#why-macro-level-thinking

# Composition
In CUBE CSS, the composition layer extends CSS and is very much a high level macro view—even when applied in smaller, component-level contexts.

The composition layer’s job is to create flexible, component-agnostic layout systems that support as many variants of content as possible.

This links back to the principle that **the browser should be hinted with flexible CSS rules, rather than micro-managed with strict CSS rules**. With the composition layer, we are _suggesting_ layout rules and **allowing the browser to make the right judgements**, based on the context it finds itself in.

## Why macro-level thinking?
Even when you are working with tiny, reusable components, you have to, at some point, consider how they will be applied in a larger context: such as a page or view.

The composition layer is designed to _aid_ this process by providing a **skeletal layout structure** that shouldn’t interfere with the components (or block, in the context of CUBE CSS) that are featured, but also, support any variant of a component.

## What should the composition layer do?
- Provide high-level, flexible layouts
- Determine how elements interact with each other
- Create consistent flow and rhythm

## What shouldn’t the composition layer do?
- Provide visual treatment such as colour or font style
- Provide decorative styles such as shadows and patterns
- Force a browser to generate a pixel-perfect layout instead of a flexible, progressive layout
