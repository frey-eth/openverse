// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./erc1155.sol";

contract ERC1155Factory {
    event ERC1155Created(address indexed newToken);

    function createERC1155(string memory uri) external returns (address) {
        ERC1155Token newToken = new ERC1155Token(uri);
        newToken.transferOwnership(msg.sender);
        emit ERC1155Created(address(newToken));
        return address(newToken);
    }
} 
