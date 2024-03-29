import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractAbi, contractAddress } from "../utils/constants";

export interface ContextInfo {
    connectWallet: () => void;
    currentAccount: string;
    formData: { addressTo: string; amount: string; keyword: string; message: string };
    setformData: React.Dispatch<
        React.SetStateAction<{
            addressTo: string;
            amount: string;
            keyword: string;
            message: string;
        }>
    >;
    transactions: any[];
    handleChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
    sendTransaction: () => void;
}

export const TransactionContext = React.createContext<ContextInfo>();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = provider.getSigner();

    const transactionContract = new ethers.Contract(contractAddress, contractAbi, signer);

    console.log({ provider, signer, transactionContract });

    return transactionContract;
};

export const TransactionProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
    const [isLoading, setLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
    const [transactions, setTransactions] = useState([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("metamask 설치해주세요");

            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);

                getAllTransactions();
            } else {
                console.log("No accounts found");
            }
            console.log("accounts :>> ", accounts);
        } catch (error) {
            console.log("checkIfWalletIsConnected_Error : ", error);

            throw new Error("No ethereum object.");
        }
    };

    const getAllTransactions = async () => {
        try {
            if (ethereum) {
                const transactionsContract = getEthereumContract();

                const availableTransactions = await transactionsContract.getAllTransactions();

                const structuredTransactions = availableTransactions.map((transaction) => ({
                    addressTo: transaction.receiver,
                    addressFrom: transaction.sender,
                    timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                    message: transaction.message,
                    keyword: transaction.keyword,
                    amount: parseInt(transaction.amount._hex) / 10 ** 18,
                }));

                console.log(structuredTransactions);

                setTransactions(structuredTransactions);
            } else {
                console.log("Ethereum is not present");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const checkIfTransactionsExist = async () => {
        try {
            const transactionsContract = getEthereumContract();

            const transactionCount = await transactionsContract.getTransactionCount();

            window.localStorage.setItem("transactionCount", transactionCount);
        } catch (error) {
            console.log("connectWallet_Error : ", error);

            throw new Error("No ethereum object.");
        }
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

    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("metamask 설치해주세요");
            console.log("sendTransaction");
            const { addressTo, amount, keyword, message } = formData;

            const transactionContract = getEthereumContract();

            const parsedAmount = ethers.utils.parseEther(amount);
            console.log("parsedAmount :>> ", parsedAmount);
            await ethereum.request({
                method: "eth_sendTransaction",
                params: [
                    {
                        from: currentAccount,
                        to: addressTo,
                        gas: "0x5208", // hex,
                        value: parsedAmount, // 0.00001
                    },
                ],
            });
            console.log("parsedAmount 111:>> ");
            const transactionHash = await transactionContract.addToBlockchain(
                addressTo,
                parsedAmount,
                message,
                keyword
            );
            console.log("transactionHash :>> ", transactionHash);
            setLoading(true);
            console.log(`loading = ${transactionHash.hash}`);
            await transactionHash.wait();

            setLoading(false);
            console.log(`success = ${transactionHash.hash}`);

            const transactionCount = await transactionContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber());
        } catch (error) {
            console.log("sendTransaction_Error : ", error);

            throw new Error("No ethereum object.");
        }
    };

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExist();
    }, []);

    return (
        <TransactionContext.Provider
            value={{
                connectWallet,
                currentAccount,
                transactions,
                formData,
                setformData,
                handleChange,
                sendTransaction,
            }}
        >
            {children}
        </TransactionContext.Provider>
    );
};
