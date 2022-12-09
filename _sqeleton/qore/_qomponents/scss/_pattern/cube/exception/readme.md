https://cube.fyi/exception.html

These are little variations to a block.
- For example, you might have a “reversed” state or an “inactive” state.

> For these: we use data attributes.
> `<article class="card" data-state="reversed"></article>`

This provides a useful hook for both CSS and JavaScript! You can reverse the content like so:
```
.card[data-state='reversed'] {
  display: flex;
  flex-direction: column-reverse;
}
```

## Why data attributes?
We use data attributes because an exception should only occur in exceptional circumstances (the clue is in the name). Because the exception is often caused by outside influence, such as JavaScript, a mechanism that both CSS and JavaScript can use efficiently makes sense, too. It’s also useful to consider exceptions in the context of a finite state machine (opens new window)too.

The goal of most of the CUBE CSS methodology is clarity and separating exceptions into data attributes achieves exactly that.

## What should an exception do?
- Provide a concise variation to a block
- Use data attributes

## What shouldn’t an exception do?
- Variate a block to the point where it isn’t recognisable anymore. This is where a new block should be created
- Use CSS classes