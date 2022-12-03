// https://coolaj86.com/articles/hashing-with-the-web-crypto-api.html

import { HashBloqPropsType } from '../../types.d.ts'

// Computes the SHA-256 digest of a string with Web Crypto
// Source: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest

export const sha256 = async (str:string):Promise<string> => {
  const buffer = new TextEncoder().encode(str)
  const hash = await crypto.subtle.digest("SHA-256", buffer)
  return hex(hash)
}

const hex = (buffer:ArrayBuffer): string => {
  let digest = ''
  const view = new DataView(buffer)
  for(let i = 0; i < view.byteLength; i += 4) {
    // We use getUint32 to reduce the number of iterations (notice the `i += 4`)
    const value = view.getUint32(i)
    // toString(16) will transform the integer into the corresponding hex string
    // but will remove any initial "0"
    const stringValue = value.toString(16)
    // One Uint32 element is 4 bytes or 8 hex chars (it would also work with 4
    // chars for Uint16 and 2 chars for Uint8)
    const padding = '00000000'
    const paddedValue = (padding + stringValue).slice(-padding.length)
    digest += paddedValue
  }
  return digest
}

export const hashBloq = async ({index, previousHash, timestamp, data}:HashBloqPropsType): Promise<string> =>
  await sha256(index + previousHash + timestamp + data)
// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey#elliptic_curve_key_pair_generation
// - https://github.com/mdn/dom-examples/blob/main/web-crypto/sign-verify/ecdsa.js

// https://github.com/ssttevee/deno-elliptic
// - https://github.com/indutny/elliptic
// 

// const digested = await sha256('foobar'+Date.now())
//   console.log('digested: ', digested, digested.length)