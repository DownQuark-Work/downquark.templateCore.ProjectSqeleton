# Screens

If you have page-specific styles, it is better to put them in a `screens/` folder, in a file named after the page. For instance, it’s not uncommon to have very specific styles for the home page hence the need for a `_home.scss` file in `screens/`.

*Note — Depending on your deployment process, these files could be called on their own to avoid merging them with the others in the resulting stylesheet. It is really up to you.*

Reference: [Sass Guidelines](http://sass-guidelin.es/) > [Architecture](http://sass-guidelin.es/#architecture) > [Pages folder](http://sass-guidelin.es/#pages-folder)

> NOTE: This is named `pages` within the 7-1 Pattern but has been renamed `screens` to match the best practices of React's naming conventions

> NOTE: to follow the best practices of react each component will import their individual screen. `_common.scss` is reserved for shared styles between all screens.