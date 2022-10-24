import { Bloq, BloqChain} from '../../_v0/_bloq.ts'
import { hashBloq, sha256 } from './crypto.ts'
import { isValid } from './transactions.ts';
import { DOWNQUARK_BLOQCHAIN } from '../constants.ts'

import type { OrUndefined } from '../../types.d.ts';

// HELPERS
const getLatestBlock = ():Bloq|undefined => BloqChain.at(-1);
export const chainBloq = async (bloq:Bloq, debug = false):Promise<void> => {
  // validate before adding
  if(bloq.data !== 'GENESIS: DOWNQUARK_BLOQCHAIN') {
    const validBloq = await isValid(bloq,BloqChain[bloq.index-1])
    if(!validBloq) throw new Error('Invalid block when adding index ' + bloq.index)
    console.log('validBloq: ', validBloq)
  }

  BloqChain.push(bloq)
  debug && console.log('BloqChain', BloqChain)
}


// EVENT DRIVEN
export const createGenesisBlock = async () => {
  if(BloqChain.length) return
  const genHash = await sha256(DOWNQUARK_BLOQCHAIN)
  const genesisBlock: Bloq = new Bloq({
    index:0,
    hash:genHash,
    previousHash:'',
    timestamp:Date.now(),
    data:`GENESIS: ${DOWNQUARK_BLOQCHAIN}`
  });
  await chainBloq(genesisBlock)
  return 1
}

export const generateBloqMeta = async (blockData:string) => {
  const previousBlock: OrUndefined<Bloq> = getLatestBlock();
  const nextIndex: number = previousBlock?.index ? previousBlock?.index + 1 : 1;
  const nextTimestamp: number = Date.now();
  const nextHash: string = await hashBloq({index:nextIndex, previousHash: previousBlock?.hash||'', timestamp:nextTimestamp, data:blockData});
  const bloqMeta: Bloq = new Bloq({index:nextIndex, hash:nextHash, previousHash: previousBlock?.hash||'', timestamp:nextTimestamp, data:blockData});
  return bloqMeta
}

// API
export const getChain = (chainSha?: { hash: string; }): string => {
  return JSON.stringify('{bobby:"joe"}')
  throw new Error("Function not implemented.");
}

export const mine = async (blockData:unknown, type = 'BLOCK'): Promise<Bloq|null> => {
  if(type !== 'BLOCK') return null // TODO: implement more mining methods
  const data = JSON.stringify(blockData)
  const previousBlock: OrUndefined<Bloq> = getLatestBlock();
  const nextIndex: number = previousBlock?.index ? previousBlock?.index + 1 : 1;
  const nextTimestamp: number = Date.now();
  const nextHash: string = await hashBloq({index:nextIndex, previousHash: previousBlock?.hash||'', timestamp:nextTimestamp, data});
  const bloqMeta: Bloq = new Bloq({index:nextIndex, hash:nextHash, previousHash: previousBlock?.hash||'', timestamp:nextTimestamp, data});
  return bloqMeta
}
