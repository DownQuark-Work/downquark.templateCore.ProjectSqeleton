# qore qomponents
`$ yarn dev`
- the above will (com|trans)pile the files.
- you can then use the `UMD` output files to import into the Design System within `Docsify` for viewability.

> REMEMBER:
- Run the following command, which will generate a new directory called .yarn/sdks:
  - `yarn dlx @yarnpkg/sdks vscode`
- For safety reason VSCode requires you to explicitly activate the custom TS settings:
- Press `ctrl+shift+p` in a TypeScript file
- Choose **"Select TypeScript Version"**
- Pick **"Use Workspace Version"**

- Also; `yarn plugin import typescript` helps with some other caveats

Your VSCode project is now configured to use the exact same version of TypeScript as the one you usually use, except that it will now be able to properly resolve the type definitions!

> Note that VSCode might ask you to do Step 3 again from time to time, but apart from that your experience should be mostly the same as usual. Happy development!

## jsdoc is forthcoming:
- there are some issues to work out with it and yarn playing together
-> that should work when it is time`% jsdoc -c jsdoc.conf.json -d jsdoc   `