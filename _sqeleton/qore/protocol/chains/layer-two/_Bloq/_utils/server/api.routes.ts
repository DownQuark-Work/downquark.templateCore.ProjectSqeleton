import * as Block from '../chain/block.ts'
import * as Peers from '../chain/peers.ts'
import * as Transactions from '../chain/transactions.ts'
import * as Wallet from '../chain/wallet.ts'

// api routes will always return JSON, but shape is unknown
export const apiRoutes: { [k: string]: { [k: string]: (data: string) => unknown } } = { // string|Blob } } = {
  GET: {
    address: data => Wallet.getPublic(data),
    addressed: data => Wallet.getUnspentTxOut(data),
    balance: _data => Wallet.getAccountBalance(),
    block: data => Block.getChain({ hash: data }),
    blocks: _data => Block.getChain(),
    myUnspentTransactionOutputs: _data => Wallet.getMyUnspentTransactionOutputs(),
    peers: _data => Peers.getSockets(),
    transaction: data => Transactions.getTransaction(data),
    transactionPool: _data => Transactions.getPool(),
    unspentTransactionOutputs: data => Wallet.getUnspentTxOut(data),
    validate: _data => Transactions.validateChain(),

  },
  POST: {
    peer: data => Peers.connectTo(data),
    mine: async (data) => {
      const bloq = await Block.mine(data)
      if(!bloq) return
      await Block.chainBloq(bloq,true)
      return bloq
    },
    mineRawBlock: data => Block.mine(data, 'RAW'),
    mineTransaction: data => Block.mine(data, 'TRANSACTION'),
    transaction: data => {Transactions.send((data as unknown)); return ''},
    // stop: async _data => {
    //   if (this && !this.stopped) {
    //     this.stopped = true;
    //     this.process.stderr?.close();
    //     this.process.kill(Deno.Signal.SIGKILL);
    //     this.process.close();
    //   }
    //   await this.done;
    // },
  }}