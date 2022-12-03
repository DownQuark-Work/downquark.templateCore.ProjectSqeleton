// deno-lint-ignore-file no-extra-boolean-cast
import {chalq, ensureFileSync} from '../_deps.ts'

import {VERSION_QLI,QLI_PERSISTENT_FILENAME} from './_constants.ts'

const validateQliVersion = (persistedVersion:string) => {
  console.log('persistedVersion: ', persistedVersion, VERSION_QLI)
}
export const extantFile = (path = `${Deno.env.get("HOME")}/${QLI_PERSISTENT_FILENAME}`):boolean => {
  console.log('ensureFileSync: ',path)
  try {
    const qrxText = Deno.readTextFileSync(path)
    console.log('qrxText: ', qrxText)
    if(qrxText.length) validateQliVersion('get this from qrxText')
  } catch (error) {
    if(!!~String(error).indexOf('NotFound')) {
      console.log('make a new one!', path, ensureFileSync, chalq.red(chalq.underline('<<--- ENABLE THIS WHEN READY')))
      return false
    }
  }
  return true
}
// https://deno.land/api@v1.28.0?s=Deno.FsFile
// https://deno.land/api@v1.28.0?s=Deno.symlink

/*
const response = await fetch("http://current/version/to/compare/to/~/.qrx");
console.log(response.status);  // e.g. 200
console.log(response.statusText); // e.g. "OK"
const jsonData = await response.json();
*/

// cheat sheet // `Deno.env.toObject(); Deno.env.get("HOME")`