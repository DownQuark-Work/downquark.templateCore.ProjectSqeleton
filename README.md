# DownQuark Open Source Template

:rotating_light: **WARNING** :rotating_light: This README should only show on the repository at https://github.com/DownQuark-Work/downquark.templateCore.ProjectSqeleton. If it is showing on some other repo, please open an issue to have it fixed.

---

## Basic Template for DownQuark projects

This readme will be updated as development continues.
Attempts will be made to keep this [miro board](https://miro.com/app/board/uXjVOqxaA3Y=/?share_link_id=146671647169) up to date.

<details><summary>Current(ish) Directory Tree</summary>

```
.
├── CODE_OF_CONDUCT.md
├── CONFIGURATIONS
├── CONTRIBUTING.md
├── DISTRIBUTIONS
│   ├── CLI
│   ├── native
│   ├── persistent
│   ├── protocol
│   └── web
├── LICENSE
├── PULL_REQUEST_TEMPLATE.md
├── README.md
├── SUPPORT.md
├── _sqeleton
│   ├── _documentation
│   │   ├── README.md
│   │   ├── _404.md
│   │   ├── __projectname.md
│   │   ├── _navbar.md
│   │   ├── _sidebar.md
│   │   ├── index.html
│   │   ├── package.json
│   │   ├── styleguide
│   │   │   ├── README.md
│   │   │   ├── about.md
│   │   │   ├── components
│   │   │   │   ├── _navbar.md
│   │   │   │   ├── _sidebar.md
│   │   │   │   ├── component.md
│   │   │   │   └── litqomponent
│   │   │   │       ├── dq.qomponents.cjs.js
│   │   │   │       ├── dq.qomponents.esm.js
│   │   │   │       ├── dq.qomponents.umd.js
│   │   │   │       └── poc.md
│   │   │   ├── components.md
│   │   │   └── package.json
│   │   └── technical.md
│   ├── outliers
│   │   ├── _lib
│   │   └── modules
│   ├── overseers
│   │   ├── CLI
│   │   ├── Logging
│   │   ├── Metrics
│   │   └── Spec
│   └── qore
│       ├── _qomponents
│       │   ├── ReadMe.md
│       │   ├── atomic
│       │   │   ├── 0.particles
│       │   │   ├── 1.atoms
│       │   │   │   └── button.ts
│       │   │   ├── 2.molecules
│       │   │   ├── 3.organisms
│       │   │   ├── 4.templates
│       │   │   └── 5.screens
│       │   ├── package.json
│       │   ├── rollup.config.js
│       │   ├── scss
│       │   │   ├── _tokens
│       │   │   │   ├── _base.scss
│       │   │   │   ├── _colors.scss
│       │   │   │   ├── _dimensions.scss
│       │   │   │   ├── _fonts.scss
│       │   │   │   └── _typography.scss
│       │   │   ├── abstracts
│       │   │   │   ├── README.md
│       │   │   │   ├── _base.scss
│       │   │   │   ├── _functions.scss
│       │   │   │   ├── _mixins.scss
│       │   │   │   ├── _placeholders.scss
│       │   │   │   ├── _shapes.scss
│       │   │   │   ├── _variables.scss
│       │   │   │   ├── mixins
│       │   │   │   │   ├── _colors.scss
│       │   │   │   │   └── _queries.scss
│       │   │   │   └── variables
│       │   │   │       ├── _colors.scss
│       │   │   │       ├── _content.scss
│       │   │   │       ├── _dimensions.scss
│       │   │   │       ├── _fonts.scss
│       │   │   │       ├── _logo.scss
│       │   │   │       └── _typography.scss
│       │   │   ├── base
│       │   │   │   ├── README.md
│       │   │   │   ├── _base.scss
│       │   │   │   ├── _fonts.scss
│       │   │   │   ├── _typography.scss
│       │   │   │   └── _utils.scss
│       │   │   ├── components
│       │   │   │   ├── _common.scss
│       │   │   │   ├── atoms
│       │   │   │   │   └── datauri
│       │   │   │   │       └── _all.scss
│       │   │   │   ├── screens
│       │   │   │   └── templates
│       │   │   ├── main.scss
│       │   │   ├── overwrites
│       │   │   │   ├── README.md
│       │   │   │   └── _shame.scss
│       │   │   ├── readme.md
│       │   │   ├── screens
│       │   │   │   ├── README.md
│       │   │   │   └── _common.scss
│       │   │   ├── templates
│       │   │   │   ├── README.md
│       │   │   │   └── _common.scss
│       │   │   ├── themes
│       │   │   │   ├── README.md
│       │   │   │   └── _common.scss
│       │   │   └── vendors
│       │   │       ├── README.md
│       │   │       ├── _normalize.scss
│       │   │       └── _reset.scss
│       │   └── tsconfig.json
│       ├── native
│       │   ├── android
│       │   ├── executibles
│       │   └── ios
│       ├── persistent
│       │   ├── bus
│       │   ├── graph
│       │   ├── inmemory
│       │   ├── relational
│       │   └── time
│       ├── protocol
│       │   ├── mainnet
│       │   ├── sidechain
│       │   └── testnet
│       ├── smartcontracts
│       │   ├── mainnet
│       │   ├── sidechain
│       │   └── testnet
│       └── web
│           ├── browser
│           │   ├── _core
│           │   │   ├── ReadMe.md
│           │   │   ├── _run.ts
│           │   │   └── process_output.txt
│           │   ├── application
│           │   │   ├── scripts
│           │   │   │   ├── _modules
│           │   │   │   │   └── landing
│           │   │   │   │       └── get.ts
│           │   │   │   └── ui
│           │   │   │       └── ui.js
│           │   │   └── views
│           │   │       ├── _shell.html
│           │   │       ├── partials
│           │   │       │   └── landing
│           │   │       │       ├── even.html
│           │   │       │       └── odd.html
│           │   │       └── screens
│           │   │           └── landing.html
│           │   ├── business
│           │   │   ├── graph
│           │   │   │   ├── _views
│           │   │   │   │   └── landing.ts
│           │   │   │   ├── query.ts
│           │   │   │   └── read.ts
│           │   │   ├── logic.ts
│           │   │   ├── relational
│           │   │   │   ├── _views
│           │   │   │   │   └── landing.ts
│           │   │   │   ├── query.ts
│           │   │   │   └── read.ts
│           │   │   └── timeseries
│           │   │       ├── _views
│           │   │       │   └── landing.ts
│           │   │       ├── query.ts
│           │   │       └── read.ts
│           │   ├── network
│           │   │   ├── _assets
│           │   │   │   ├── _logs
│           │   │   │   │   └── 20228.17.log
│           │   │   │   ├── images
│           │   │   │   └── js
│           │   │   │       └── _v1
│           │   │   │           ├── _modules
│           │   │   │           │   ├── landing
│           │   │   │           │   │   └── get.js
│           │   │   │           │   └── landing-get.js
│           │   │   │           └── _qomponents
│           │   │   │               └── dq.qomponents.umd.js
│           │   │   ├── app.ts
│           │   │   ├── deno.jsonc
│           │   │   ├── deps.ts
│           │   │   ├── resources
│           │   │   │   ├── index.ts
│           │   │   │   ├── routes
│           │   │   │   │   └── Landing.ts
│           │   │   │   └── types
│           │   │   │       ├── error_handler.ts
│           │   │   │       ├── requests.ts
│           │   │   │       ├── responses.ts
│           │   │   │       ├── static_files_resource.ts
│           │   │   │       └── web_socket.ts
│           │   │   ├── services
│           │   │   │   ├── _template.ts
│           │   │   │   ├── boilerplate.ts
│           │   │   │   └── index.ts
│           │   │   └── types.d.ts
│           │   ├── persistence
│           │   └── protocol
│           ├── extensions
│           │   └── pwa
│           │       ├── README.md
│           │       ├── _dist
│           │       ├── _extension
│           │       │   ├── TRANSPILED
│           │       │   │   ├── content-scripts.js
│           │       │   │   └── extension.css
│           │       │   ├── assets
│           │       │   │   ├── gfx
│           │       │   │   │   ├── icon128.png
│           │       │   │   │   ├── icon16.png
│           │       │   │   │   ├── icon48.png
│           │       │   │   │   └── icon64.png
│           │       │   │   └── js
│           │       │   │       └── options.js
│           │       │   ├── html
│           │       │   │   ├── downquark.html
│           │       │   │   └── options.html
│           │       │   ├── manifest.json
│           │       │   └── sw.js
│           │       ├── package.json
│           │       └── src
│           │           ├── _content
│           │           │   └── script.ts
│           │           ├── _scss
│           │           │   └── extension.scss
│           │           └── app
│           │               └── index.ts
│           └── plugins
│               ├── ipfs
│               ├── serviceworkers
│               ├── web3
│               └── websockets
│                   ├── app.ts
│                   └── deps.ts
├── package.json
└── yarn.lock

115 directories, 127 files
```

</details>
