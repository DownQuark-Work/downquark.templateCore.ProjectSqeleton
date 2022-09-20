# DownQuark Open Source Template

:rotating_light: **WARNING** :rotating_light: This README should only show on the repository at https://github.com/DownQuark-Work/downquark.templateCore.ProjectSqeleton. If it is showing on some other repo, please open an issue to have it fixed.

---

## Basic Template for DownQuark projects

This readme will be updated as development continues.
Attempts will be made to keep this [miro board](https://miro.com/app/board/uXjVOqxaA3Y=/?share_link_id=146671647169) up to date.

<details><summary>Current(ish) Directory Tree</summary>
`% tree -I 'node_modules|.git*' | pbcopy`

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
│   │   │   └── mock-my-db
│   │   │       ├── ReadMe.dbml.md
│   │   │       └── ReadMe.dbml.sql
│   │   └── modules
│   ├── overseers
│   │   ├── CLI
│   │   ├── Documentation
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
│       │   ├── ReadMe.md
│       │   ├── browser
│       │   │   └── indexeddb
│       │   │       ├── _controller.js
│       │   │       ├── models
│       │   │       │   ├── index.js
│       │   │       │   ├── objectstore.js
│       │   │       │   └── trxn.js
│       │   │       ├── test.html
│       │   │       └── views
│       │   │           └── test.js
│       │   ├── graph
│       │   │   └── arango
│       │   │       └── arangodump
│       │   ├── relational
│       │   │   ├── ReadMe.md
│       │   │   └── mariadb
│       │   │       ├── dump-dq.relational-202208251435.sql
│       │   │       ├── dump-dq.relational-202208280025-STRUCTURE.sql
│       │   │       ├── example-logging-and-functions.sql
│       │   │       ├── example-procedure.sql
│       │   │       └── scratchwork.sql
│       │   └── time
│       │       └── ReadMe.md
│       ├── protocol
│       │   ├── chains
│       │   │   ├── main
│       │   │   ├── side
│       │   │   └── test
│       │   └── contracts
│       │       ├── main
│       │       ├── side
│       │       └── test
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
│           │   │           ├── database.html
│           │   │           └── landing.html
│           │   ├── business
│           │   │   ├── graph
│           │   │   │   ├── _api
│           │   │   │   │   └── users.ts
│           │   │   │   └── _views
│           │   │   │       └── database.ts
│           │   │   ├── relational
│           │   │   │   ├── _api
│           │   │   │   │   └── users.ts
│           │   │   │   └── _views
│           │   │   │       └── database.ts
│           │   │   └── timeseries
│           │   │       ├── _api
│           │   │       │   └── metrics.ts
│           │   │       └── _views
│           │   │           └── database.ts
│           │   ├── network
│           │   │   ├── _assets
│           │   │   │   ├── _logs
│           │   │   │   │   ├── 20228.17.log
│           │   │   │   │   ├── 20228.26.log
│           │   │   │   │   ├── 20228.27.log
│           │   │   │   │   ├── 20228.28.log
│           │   │   │   │   └── 20228.29.log
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
│           │   │   │   │   ├── Database.ts
│           │   │   │   │   └── Landing.ts
│           │   │   │   └── types
│           │   │   │       ├── api
│           │   │   │       │   ├── index.ts
│           │   │   │       │   ├── metrics.ts
│           │   │   │       │   └── users.ts
│           │   │   │       ├── error_handler.ts
│           │   │   │       ├── persistence
│           │   │   │       │   ├── graph.ts
│           │   │   │       │   ├── relational.ts
│           │   │   │       │   └── timeseries.ts
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
│           │   │   ├── _bus
│           │   │   │   └── pubsub.ts
│           │   │   ├── graph
│           │   │   │   ├── index.ts
│           │   │   │   ├── query
│           │   │   │   └── read
│           │   │   │       └── graph.ts
│           │   │   ├── relational
│           │   │   │   ├── index.ts
│           │   │   │   ├── query
│           │   │   │   └── read
│           │   │   │       └── users.ts
│           │   │   └── timeseries
│           │   │       ├── index.ts
│           │   │       ├── query
│           │   │       └── read
│           │   │           └── time.ts
│           │   └── protocol
│           ├── extensions
│           │   └── pwa
│           │       ├── README.md
│           │       ├── _dist
│           │       ├── _extension
│           │       │   ├── TRANSPILED
│           │       │   │   ├── content-scripts.js
│           │       │   │   ├── dq.pwa.umd.js
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
│           │       ├── rollup.config.js
│           │       ├── src
│           │       │   ├── _components
│           │       │   │   └── dq.qomponents.esm.js
│           │       │   ├── _content
│           │       │   │   └── script.ts
│           │       │   ├── _scss
│           │       │   │   └── extension.scss
│           │       │   └── app
│           │       │       ├── dq.pwa.ts
│           │       │       └── index.ts
│           │       └── tsconfig.json
│           └── plugins
│               ├── ipfs
│               ├── web3
│               │   ├── __spec
│               │   ├── _trigger
│               │   ├── _web3.min.js
│               │   ├── swarm
│               │   └── whisper
│               ├── websockets
│               │   ├── app.ts
│               │   └── deps.ts
│               └── workers
│                   ├── dedicated
│                   │   └── _example
│                   │       ├── fibonacci
│                   │       │   ├── fibonacci.js
│                   │       │   └── index.html
│                   │       └── simple
│                   │           ├── index.html
│                   │           ├── main.js
│                   │           └── worker.js
│                   ├── service
│                   │   ├── _template
│                   │   │   ├── serviceworker.js
│                   │   │   ├── tempate.js
│                   │   │   └── template.html
│                   │   ├── _utils
│                   │   │   └── conversions.js
│                   │   ├── analytics-api.js
│                   │   ├── cache
│                   │   │   ├── cache-and-update.js
│                   │   │   └── cache-then-network.js
│                   │   ├── proxy-fetch.js
│                   │   └── push
│                   │       ├── clients.js
│                   │       ├── rich.js
│                   │       ├── simple.js
│                   │       └── subscribe.js
│                   └── shared
│                       └── _example
│                           ├── index.html
│                           ├── index2.html
│                           ├── multiply.js
│                           ├── nosubmit.js
│                           ├── square.js
│                           └── worker.js
├── package.json
└── yarn.lock

154 directories, 187 files
```

</details>
