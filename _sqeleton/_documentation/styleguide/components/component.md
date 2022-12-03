# Component

- This file will be rendered at `/#/styleguide/components/oomponent`

> TODO: `Symlink` this file to the **PROJECT_NAME** `Components` > `Component`

**docsify-demo** [plugin](https://github.com/JacobWeinbren/docsify-demo)
> This plugin is focused on testing local code within Docsify, based on the @shoelace code-block implementation. Unlike other docsify plugins that exist, this plugin supports LitElement, more recently known as Lit.Dev. Similar to Storybook, this allows for testing common use cases, but in a simpler way.

<p>Here are some tests.</p>

```html preview
<b style="color: red;">Inline styles are supported too.</b>
```

```html preview
<b style="color: blue;">Test.</b>
```

```html preview
<div>
    <span>
        <b style="color: blue;">Test.</b>
    </span>
</div>
```

```html preview
<p>This plugin allows for lit component</p>
<h2>TODO: Add lit.dev example</h2>
```

```html preview
import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('my-element')
export class MyElement extends LitElement {
  @property()
  version = 'STARTING';

  render() {
    return html`
    <p>Welcome to the Lit tutorial!</p>
    <p>This is the ${this.version} code.</p>
    `;
  }
}
```