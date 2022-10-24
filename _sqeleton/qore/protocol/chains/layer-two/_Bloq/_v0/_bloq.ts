// import { crypto, encode } from  '../deps.ts'
// import sha256 from '../../../../_CryptoJS/rollups/sha256.js'
  // import {ec} from '../../../../../_CryptoJS/elliptic.js';
  // import { crypto } from '../../deps.ts'
// import { createGenesisBlock } from '../_v0/utils.bloqchain.ts'
// createGenesisBlock() // may as well as soon as the server spins up

import type { IBloqChainConstructorType } from '../types.d.ts';

export enum enumConsensusType {
  PROOF_OF_STAKE = 'PROOF_OF_STAKE',
  PROOF_OF_WORK = 'PROOF_OF_WORK',
}

let _bloqChain:Bloq[] = []
export const BloqChain = Object.assign(_bloqChain, {
  reset: (bc:Bloq[] = []) => _bloqChain = bc,
})

export class Bloq {
  
    public index: number;
    public hash: string;
    public previousHash: string;
    public timestamp: number;
    public data: string;

    // this will probably default to stake when complete
    #consensus:unknown = enumConsensusType.PROOF_OF_WORK;
  
    constructor(props:IBloqChainConstructorType) {
      const {
        index,
        hash,
        previousHash,
        timestamp,
        data,
        consensus
      } = props

      this.index = index;
      this.previousHash = previousHash;
      this.timestamp = timestamp;
      this.data = data;
      this.hash = hash;
      
      if(consensus) this.#consensus = consensus
    }
  
  }
