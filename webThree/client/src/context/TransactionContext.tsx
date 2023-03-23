import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractAbi, contractAddress } from "../utils/constants";

export interface ContextInfo {
    value: string;
}

export const TransactionContext = React.createContext<ContextInfo>();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    const transactionContract = new ethers.Contract(contractAddress, contractAbi, signer);

    console.log({ provider, signer, transactionContract });
};

export const TransactionProvider = ({ children }: { children: React.ReactNode }) => {
    const checkIfWalletIsConnected = async () => {
        if (!ethereum) return alert("metamask 설치해주세요");

        const accounts = await ethereum.request({ method: "eth_accounts" });

        console.log("accounts :>> ", accounts);
    };

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return <TransactionContext.Provider value={{ value: "test" }}>{children}</TransactionContext.Provider>;
};
