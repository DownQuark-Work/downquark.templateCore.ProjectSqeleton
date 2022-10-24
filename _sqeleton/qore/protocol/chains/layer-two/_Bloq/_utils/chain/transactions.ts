import { Bloq, BloqChain} from '../../_v0/_bloq.ts'
import { hashBloq, sha256 } from './crypto.ts'

export const isValid = async (newBlock: Bloq, previousBlock: Bloq) => {
  const validStructure = (): boolean => {
    return typeof newBlock.index === 'number'
        && typeof newBlock.hash === 'string'
        && typeof newBlock.previousHash === 'string'
        && typeof newBlock.timestamp === 'number'
        && typeof newBlock.data === 'string';
  };

  if (previousBlock.index + 1 !== newBlock.index) { console.error('invalid index'); return false; }
  if (previousBlock.hash !== newBlock.previousHash) { console.error('invalid previoushash'); return false; }
  const newHash = await hashBloq({...newBlock})
  if (newHash !== newBlock.hash) {
      console.log(typeof (newBlock.hash) + ' ' + typeof newBlock.hash);
      console.log('invalid hash: ' + newBlock.hash + ' ' + newBlock.hash);
      return false;
  }
  return validStructure();
};

export const validateChain = async (chainToValidate:Bloq[] = BloqChain) => {
  const validateChainIterable = {
    async *[Symbol.asyncIterator]() {
      let prevBlq:Bloq|null = null
      for(const bloqchn of chainToValidate) {
        if(prevBlq) {
          const validChainPos = await isValid(bloqchn, prevBlq)
          console.log('validating: ', bloqchn.index)
          yield validChainPos
        }
        prevBlq = bloqchn
      }
    }
  }

  for await (const iteratedBloqValidation of await validateChainIterable) {
    console.log('validation result: ', iteratedBloqValidation)
    if(!iteratedBloqValidation){ return false }
  }
  return true
}

export const resolveChainConflict = async (challengeChain:Bloq[]) => {
  console.log('challengeChain: ', challengeChain) // TODO: incorporate this with p2p
  const validChallenge = await validateChain(challengeChain)
  if(!validChallenge) return console.error('INVALID CHALLENGE CHAIN')
  if(challengeChain.length > BloqChain.length) {
    console.log('Received blockchain is valid. Replacing current blockchain with received blockchain');
    BloqChain.reset(challengeChain)
    // broadcastLatest();
  }
}

export function getTransaction(hash?: string): Blob {
throw new Error("Function not implemented.");
}


export function getPool(): Blob {
throw new Error("Function not implemented.");
}


export function send(trxnData:unknown):void {
  console.log('Adding trxn', trxnData);
  
throw new Error("Function not implemented.");
}