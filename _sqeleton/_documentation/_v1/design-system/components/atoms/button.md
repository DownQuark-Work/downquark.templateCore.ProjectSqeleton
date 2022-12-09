# Button Component

- this would be in an actual structured file directory.
As opposed to a file... but I want to see if what it's going to take to get the separate pieces to commect.

<script src='./_v1/design-system/components/litqomponent/umd/atoms/button.js'></script>

```html preview
<style>
    .mars {
      --planet-color: red;
    }
  </style>
<atom-button></atom-button>
<hr />
<atom-button class="mars" planet="Mars"></atom-button>
```

<script>
  // only first `script` tag will be acknowledged.
  // - this does nothing
  alert('hi')
</script>