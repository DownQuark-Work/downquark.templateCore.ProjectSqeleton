import '@nomicfoundation/hardhat-toolbox'
import '@nomiclabs/hardhat-ethers'

import './web3/abi/trigger/tasks/account.ts'

import { baseAccnts } from './web3/abi/trigger/tasks/account'

// extending the base
extendEnvironment((hre) => {
  (hre as any).DOWNQUARK_DEV = {
    Account: {
      main: '0x5b2F22803Eed7b6026AEF045e1556D6b6993F953',
      dev: '0xF4fD72EAe3008Bf7efBe2A44ad7d00FDced278ca',
      default: baseAccnts,
    }
  }
})

const config: HardhatUserConfig = {
  solidity: '0.8.17',
  networks: {
    hardhat: {
      accounts: baseAccnts,
    },
  },
  paths: {
    root: './web3/abi',
    artifacts: './artifacts',
    cache: './TO_BE_SYMLINKED/cache',
    sources: './TO_BE_SYMLINKED/contracts',
    tests: './TO_BE_SYMLINKED/spec',
  },
  // mocha: // https://github.com/mochajs/mocha/blob/master/example/config/.mocharc.yml
};

// this config file must be in same directory as the `package.json`
export default config;

// deploy > look into
// : https://github.com/wighawag/hardhat-deploy/tree/master