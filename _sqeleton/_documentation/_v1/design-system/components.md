# Style Guide
## Components

- This file will be rendered at `/#/design-system/components`

> TODO: `Symlink` this file to the **PROJECT_NAME** `Components`

<script>
  window.$docsify.vueComponents = {
    'button-counter': {
      template: `
        <button @click="count += 1">
          You clicked me {{ count }} times
        </button>
      `,
      data() {
        return {
          count: 0,
        };
      },
    },
  }
    // REFERENCE : https://docsify.js.org/#/vue
  // Vue content can mounted using a <script> tag in your markdown pages.
  /* // only one `<script>` tag will be read
    Vue.createApp({
    // Options...
  }).mount('#example');
  */
</script>


<button-counter></button-counter>
<button-counter></button-counter>

[vue integration documentation](https://github.com/docsifyjs/docsify/blob/develop/docs/index.html)
<!-- Sequenced content (i.e. loop)-->
<ul>
  <li v-for="i in 3">Item {{ i }}</li>
</ul>

<!-- JavaScript expressions -->
<p>2 + 2 = {{ 2 + 2 }}</p>