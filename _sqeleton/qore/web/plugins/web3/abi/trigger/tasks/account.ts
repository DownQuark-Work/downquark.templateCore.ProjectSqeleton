import "@nomicfoundation/hardhat-toolbox"
import "@nomiclabs/hardhat-ethers"

export const baseAccnts = [
  { privateKey: '5f8e8640ee2960b050fad7d4bac9da2946d6965787e82b071758ee8fe1dfca83', balance: '10000000000000000000000' }, // DQ MAIN
  { privateKey: '51aa90ade416e00ec694f720f8ee18a80550cbbc3e37829de0a8f3cf95744239', balance: '10000000000000000000000' }, // DQ DEV
  { privateKey: '616E6769652E6A6A706572657A616775696E6167612E6574682E6C696E6B0D0A', balance: '50000000000000000000' }, // Alice
  { privateKey: '75d79919b02eec894d0d92745f6fd14c76898351deda37124f3dd0d71cb13ca8', balance: '50000000000000000000' }, // Bob
  // BURNERS
  { privateKey: '70ad51513db7294f93cb6b41c237de6e4cbf5a5615c9495fc2dc27a686857148', balance: '50000000000000000000' },
  { privateKey: '0x87592d758690bcd0245f158fc741f43337df51c8e6d873835f68e361e381767f', balance: '25000000000000000000' },
  { privateKey: '0x8bb60366527bd7a8f1b83406b5a07129fdd920cdf88cc04584b837659cad2caa', balance: '2500000000000000000' },
  { privateKey: '0x2be72d0473f22127ff00ee7796b89296b4eb555ab2aa2a1c70fbd7f07bf62c66', balance: '0' },
]

task("balance", "Prints an account's balance")
  .addParam("account", "The account's address")
  .setAction(async (taskArgs) => {
    const balance = await ethers.provider.getBalance(taskArgs.account);

    console.log(ethers.utils.formatEther(balance), "ETH");
  });