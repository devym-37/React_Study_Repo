// https://eth-goerli.g.alchemy.com/v2/mKjmyXRhsHS9yC_nIBReiWlzJRwOvspm
require("@nomiclabs/hardhat-waffle");

module.exports = {
    solidity: "0.8.18",
    networks: {
        goelri: {
            url: "https://eth-goerli.g.alchemy.com/v2/mKjmyXRhsHS9yC_nIBReiWlzJRwOvspm",
            accounts: ["76dc7bbd09b43ff4d45ed280e297f01ecb14aefae0edb492dd598432cbccae25"],
        },
    },
};
