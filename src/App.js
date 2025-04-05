import React, { useEffect, useState } from "react";
import web3 from "./web3";

function App() {
  const [account, setAccount] = useState(null);
  const contractABI = [
    /* ABI array from Truffle after deployment */
  ];
  const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";

  const contract = new web3.eth.Contract(contractABI, contractAddress);

  const mintTicket = async (ticketName) => {
    await contract.methods
      .mintTicket(account, ticketName)
      .send({ from: account });
  };

  useEffect(() => {
    const loadAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    };
    loadAccount();
  }, []);

  return (
    <div>
      <h1>Welcome to the Ticketing App</h1>
      <p>Account: {account ? account : "Not connected"}</p>
      <button
        onClick={() =>
          window.ethereum.request({ method: "eth_requestAccounts" })
        }
      >
        Connect Wallet
      </button>
    </div>
  );
}

export default App;
