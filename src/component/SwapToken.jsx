import React, { useState } from "react";
import Web3 from "web3";
import TokenSwapABI from "./TokenSwapABI.json";

const TokenSwapAddress = "0x1234567890123456789012345678901234567890";

function SwapToken() {
    const [amount1, setAmount1] = useState("");
    const [amount2, setAmount2] = useState("");
    const [token1, setToken1] = useState("ETH");
    const [token2, setToken2] = useState("USDT");

    async function handleSwap() {
        if (!window.ethereum) {
            alert("Please install Metamask to use this feature");
            return;
        }
    
        try {
            // Prompt the user to connect their Metamask account
            await window.ethereum.request({ method: "eth_requestAccounts" });
    
            const web3 = new Web3(window.ethereum);
    
            // Get the user's account address
            const accounts = await web3.eth.getAccounts();
            const account = accounts[0];
    
            // Create a contract instance
            const tokenSwap = new web3.eth.Contract(TokenSwapABI, TokenSwapAddress);
    
            // Determine the token addresses based on the user's choice
            let tokenAddress1, tokenAddress2;
            if (token1 === "ETH") {
                tokenAddress1 = Web3.utils.toChecksumAddress("0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE");
            } else if (token1 === "USDT") {
                tokenAddress1 = Web3.utils.toChecksumAddress("0xdAC17F958D2ee523a2206206994597C13D831ec7");
            } else if (token1 === "BTC") {
                tokenAddress1 = Web3.utils.toChecksumAddress("0x123456...");
            }
    
            if (token2 === "ETH") {
                tokenAddress2 = Web3.utils.toChecksumAddress("0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE");
            } else if (token2 === "USDT") {
                tokenAddress2 = Web3.utils.toChecksumAddress("0xdAC17F958D2ee523a2206206994597C13D831ec7");
            } else if (token2 === "BTC") {
                tokenAddress2 = Web3.utils.toChecksumAddress("0x123456...");
            }
    
            // Call the swapTokens function on the contract
            await tokenSwap.methods
                .swapTokens(tokenAddress1, web3.utils.toWei(amount1), tokenAddress2, web3.utils.toWei(amount2))
                .send({ from: account });
    
            // Update the UI with the swapped tokens
            // ...
        } catch (error) {
            console.error(error);
            alert("Failed to perform token swap");
        }
    }

    return(
        <div>
            <input
                type="number"
                placeholder={`Amount of ${token1}`}
                value={amount1}
                onChange={(e) => setAmount1(e.target.value)}
            />
            <select value={token1} onChange={(e) => setToken1(e.target.value)}>
                <option value="ETH">ETH</option>
                <option value="USDT">USDT</option>
                <option value="BTC">BTC</option>
            </select>
            <input
                type="number"
                placeholder={`Amount of ${token2}`}
                value={amount2}
                onChange={(e) => setAmount2(e.target.value)}
            />
            <select value={token2} onChange={(e) => setToken2(e.target.value)}>
                <option value="ETH">ETH</option>
                <option value="USDT">USDT</option>
                <option value="BTC">BTC</option>
            </select>
            <button onClick={handleSwap}>Swap Tokens</button>
        </div>
    )
}

export default SwapToken