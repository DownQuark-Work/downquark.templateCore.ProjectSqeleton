#!/usr/bin/env -S deno run --unstable -A
import './tui/_proto.ts'

import {parse} from './_deps.ts'
import {handleArgs} from './_utils/args.ts'

if (import.meta.main) {
  const parsedArgs = parse(Deno.args, {
    boolean: ["help"],
    alias: {
      help: ["h"],
    },
  '--': true })
  // full argument parsing example: `./dq.sqeleton.ts -xkcd -a=arg1 --goo=arg2 something else -- goes here`
  // console.log('parsedArgs: ', parsedArgs)
  handleArgs(parsedArgs)
}