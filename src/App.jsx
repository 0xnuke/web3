import { useState } from 'react'
import './App.css'
import Web3 from 'web3';
import SwapTokens from './component/SwapToken';

// Initialize Web3 with Metamask provider
const web3 = new Web3(window.ethereum);

function App() {
  const [connected, setConnected] = useState(false);

  const connectToWeb3 = async () => {
    try {
      // Request access to Metamask accounts
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      setConnected(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
    <button onClick={connectToWeb3}>
      {connected ? 'Connected to Web3' : 'Connect to Web3'}
    </button>
    <SwapTokens />
    </div>
  )
}

export default App
