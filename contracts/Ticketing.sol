// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Ticketing {
    address public owner;

    constructor() {
        owner = msg.sender;
    }
}