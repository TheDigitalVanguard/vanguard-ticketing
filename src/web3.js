import Web3 from 'web3';

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and MetaMask is running
  web3 = new Web3(window.ethereum);
  window.ethereum.request({ method: 'eth_requestAccounts' });
} else {
  console.log("MetaMask is not installed or not detected");
}

export default web3;
