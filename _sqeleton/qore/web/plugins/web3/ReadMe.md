https://www.blockscope.tech/auth/sign-up

# Hardhat quick deploy
- `% y hat compile`
- `% y hat test` // test will also compile the contract
- `% y hat node` // New terminal window

## Scripts
- `% y hat run web3/abi/trigger/scripts/deploy.ts --network localhost` // deploy
- `% y hat console` // open interactive prompt
> PROOF: `> config` _OR_ `> ethers`
> `> console.log(await ethers.getSigners())` // top level await

## Tasks
- `% y hat help balance`
- `% y hat node` OR `% y hat console`
- `% y hat balance --account 0x5b2F22803Eed7b6026AEF045e1556D6b6993F953`
- `% y hat balance --account 0x67c3b12548b785378545D076f633593f14612C03`

# libraries
## ethers
> recommended

## web3js
Whisper and Swarm are currently deprecated in web3.js and will not be included in teh template
- https://swarm-guide.readthedocs.io/en/latest/index.html

This may be worth integrating if needed before `Bee` (above link) is available
- https://erebos.js.org/docs/introduction

And there are deprecated demo scripts in the `web3js-plugin-validation.html` in this directory that may work as well.

The **eth** library in `web3.js` seems to be valid and working examples are shown in the `web3js-plugin-validation.html` in this directory.
The **utils** library in `web3.js` seems to be valid and documentation can be found [here](https://web3js.readthedocs.io/en/v1.2.0/web3-utils.html).