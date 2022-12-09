# Timeline Component

- this would be in an actual structured file directory.
As opposed to a file... but I want to see if what it's going to take to get the separate pieces to commect.

<script src='./_v1/design-system/components/litqomponent/umd/atoms/timeline.js'></script>

```html preview
<style>
    .mars {
      --planet-color: red;
    }
  </style>
<atom-timeline></atom-timeline>
<hr />
<my-element class="mars" planet="Mars"></my-element>
```

> NOTE: https://rollupjs.org/guide/en/#input
> use the above to set the scss file name as well as parse through each file and load in sequence.