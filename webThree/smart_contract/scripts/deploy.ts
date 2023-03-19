import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    // console.log("Account balance:", (await deployer.getBalance()).toString());

    const Token = await ethers.getContractFactory("Transactions");
    const token = await Token.deploy();

    console.log("Token address:", token.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

runMain();
