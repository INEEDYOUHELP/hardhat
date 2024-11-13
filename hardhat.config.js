require("@nomicfoundation/hardhat-toolbox");
// require("dotenv").config();
require("@chainlink/env-enc").config();
require("@nomicfoundation/hardhat-verify");


//task任务
// require("./task/deployFundMe");
// require("./task/interacFundMe");
require('./task/index.js')

const { SEPOLIA_URL } = process.env;
const { PRIMARY_KEY } = process.env;
const { ETHERSCAN_API_KEY } = process.env;
const { PRIMARY_KEY_1 } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [PRIMARY_KEY, PRIMARY_KEY_1],
      chainId: 11155111,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
    // timeout: 20000, // 20秒
    sourcify: {
      enabled: true,
    },
  },
};
console.log("Sepolia URL:", SEPOLIA_URL);
console.log("Primary Key:", PRIMARY_KEY);
