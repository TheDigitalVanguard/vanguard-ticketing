require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost for Ganache
      port: 8545, // Ganache CLI default port
      network_id: "*", // Match any network
    },

    sepolia: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: process.env.MNEMONIC,
          },
          providerOrUrl: `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
        }),
      network_id: 11155111, // Sepolia's network ID
      gas: 4500000,
      gasPrice: 10000000000, // Adjust if needed
      confirmations: 2, // # of confirmations to wait between deployments
      timeoutBlocks: 200, // # of blocks before deployment times out
      skipDryRun: true, // Skip dry run before migrations
    },
  },

  compilers: {
    solc: {
      version: "0.8.13",
    },
  },
};
