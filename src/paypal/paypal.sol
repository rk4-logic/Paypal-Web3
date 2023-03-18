// SPDX-License-Identifier: Unlicensed

pragma solidity >=0.7.0;

contract paypal {
    event transactions(address indexed from, address to, uint amount, string symbol);
    event recipeints(address indexed reecipientOf, address recipient, string recipientName);

    function _transfer(address payable _to, string memory symbol) public payable {
        _to.transfer(msg.value);
        emit transactions(msg.sender, _to, msg.value, symbol);
    }

    function saveTx(address from, address to, uint amount, string memory symbol) public {
        emit transactions(from, to, amount, symbol);
    }

    function addRecipient(address recipient, string memory name) public {
        emit recipeints(msg.sender, recipient, name);
    } 
}

// 0xBd9EdA6C519d202B22dce4223015Dce09D261f89 - Goerli

// 0xE125D30faDd25AaA27b9f5f8aCe42D9CD66301E3 - Sepolia