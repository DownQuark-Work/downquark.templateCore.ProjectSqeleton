# Quick Start

## Bundle JavaScript
The `_modules` directory will manage the mapping of scripts to resources - All bundles should be able to be built using the syntax below
  - final arg is _hyphen-separated_ path from `_modules` dir to `ts` module file
    - TODO: debug adding the `--watch` flag to below
`$ deno run --allow-run --allow-write --allow-read _run.ts module landing-get`

## Start the Server
Running the script with no arguments will start the server
`$ deno run --allow-run --allow-write --allow-read _run.ts`

### tail the output
`$ tail -f process_output.txt`