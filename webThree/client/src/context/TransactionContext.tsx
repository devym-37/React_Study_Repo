import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractAbi, contractAddress } from "../utils/constants";

export interface ContextInfo {
    connectWallet: () => void;
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
    const [currentAccount, setCurrentAccount] = useState("");

    const checkIfWalletIsConnected = async () => {
        if (!ethereum) return alert("metamask 설치해주세요");

        const accounts = await ethereum.request({ method: "eth_accounts" });

        console.log("accounts :>> ", accounts);
    };

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("metamask 설치해주세요");

            const accounts = await ethereum.request({ method: "eth_requestAccounts" });

            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log("connectWallet_Error : ", error);

            throw new Error("No ethereum object.");
        }
    };

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return <TransactionContext.Provider value={{ connectWallet }}>{children}</TransactionContext.Provider>;
};
