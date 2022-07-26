# Setup
- `$ yarn init -w -i=berry`
- `$ touch .yarnrc.yml`
- `$ yarn set version berry`
- `$ yarn plugin import constraints`
  - https://yarnpkg.com/features/constraints
- `$ touch constraints.pro`
- `$ enableGlobalCache: true`
- `$ yarn cache clean`

## [.yarnrc.yml config](https://yarnpkg.com/configuration/yarnrc)
```
cacheFolder: "./.yarn/cache"
globalFolder: "./.yarn/global"
constraintsPath: "./constraints.pro"
# Additional fields to set when creating packages via the init command.
initFields:
  homepage: "https://yarnpkg.com"
  downquarkDir: "./.dqrx"
npmAuthToken: "ffffffff-ffff-ffff-ffff-ffffffffffff"
progressBarStyle: "default"
```

## [manifest config](https://yarnpkg.com/configuration/manifest)
```
"name": "@downquark/qrx",
"version": "0.0.1",
"workspaces": [
  "packages/*",
]
```
## [plugins](https://yarnpkg.com/features/plugins#official-plugins)
- [typescript](https://github.com/yarnpkg/berry/tree/master/packages/plugin-typescript)
- [version](https://github.com/yarnpkg/berry/tree/master/packages/plugin-version)
- [tools](https://github.com/yarnpkg/berry/tree/master/packages/plugin-workspace-tools)
- [interactive tools](https://github.com/yarnpkg/berry/blob/HEAD/packages/plugin-interactive-tools/README.md)

## [Workspace](https://yarnpkg.com/features/workspaces#workspace-ranges-workspace)
- [protocols](https://yarnpkg.com/features/protocols#workspace)
- [release workflow](https://yarnpkg.com/features/release-workflow)

## API
### [$ yarn link](https://yarnpkg.com/cli/link) <workspace>
- Connect the local project to another one.
`$ yarn link <destination>`
- Register a remote workspace for use in the current project :
`$ yarn link ~/ts-loader`
- Register all workspaces from a remote project for use in the current project :
`$ yarn link ~/jest --all`
### [Patch](https://yarnpkg.com/cli/patch)
### [plugin](https://yarnpkg.com/cli/plugin/list)
- `$ yarn plugin list`
- `$ yarn plugin runtime` - currently active
- `$ yarn plugin import <name>` - import and activate
### [run](https://yarnpkg.com/cli/run)
- `$ yarn run --inspect-brk webpack` - Inspect Webpack while running
### [search](https://yarnpkg.com/cli/search)
- `$yarn plugin import interactive-tools` - requires plugin
  - `$ yarn search`
### [workspace](https://yarnpkg.com/cli/workspace)
- `$> yarn workspace <workspaceName> <commandName> ...`
- `$ yarn workspace components add -D react`
- `$ yarn workspace components run build`
> below will need the following plugin: `$ yarn plugin import workspace-tools`
- `$ yarn workspaces focus ...` - Install a single workspace and its dependencies.
- `$ yarn workspaces foreach <commandName> ...`
- `$ yarn workspaces foreach run build`
- `$ yarn workspaces foreach -ptR --from '{workspace-a,workspace-b}' run build` - [docs](https://yarnpkg.com/cli/workspaces/foreach)
- `$ yarn workspaces list` - [docs](https://yarnpkg.com/cli/workspaces/list)
- `$ yarn workspaces list -Rv --json`