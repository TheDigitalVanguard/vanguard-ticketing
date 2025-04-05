import { useState, useEffect } from "react";

const ConnectMetaMask = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRequestPending, setIsRequestPending] = useState(false);
  const [account, setAccount] = useState(null); // State for storing the connected account

  // Check if the user is already connected
  useEffect(() => {
    if (window.ethereum) {
      checkIfConnected();
    }
  }, []);

  const checkIfConnected = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) {
        setIsConnected(true);
        setAccount(accounts[0]); // Set the account address
      }
    } catch (err) {
      console.error("Error checking connection", err);
      setError("Failed to check connection");
    }
  };

  const requestPermissions = async () => {
    if (isRequestPending) {
      console.log("Request is already in progress. Please wait.");
      return;
    }

    setIsRequestPending(true);
    setLoading(true);

    try {
      // Request permission to connect the wallet
      await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      });

      // After success, check if accounts are available
      checkIfConnected();
    } catch (err) {
      console.error("Error requesting permissions", err);
      setError("Connection request failed. Please try again.");
    } finally {
      setIsRequestPending(false);
      setLoading(false);
    }
  };

  const handleConnectClick = () => {
    // If already connected, no need to request again
    if (isConnected) {
      console.log("Already connected");
      return;
    }
    requestPermissions();
  };

  return (
    <div>
      <h2>Connect with MetaMask</h2>
      {isConnected ? (
        <>
          <p>Connected! Account: {account}</p>{" "}
          {/* Show the connected account address */}
        </>
      ) : (
        <>
          <button onClick={handleConnectClick} disabled={loading}>
            {loading ? "Connecting..." : "Connect to MetaMask"}
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </>
      )}
    </div>
  );
};

export default ConnectMetaMask;
