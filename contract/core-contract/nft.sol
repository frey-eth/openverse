// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OpenverseCollection is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    uint256 public _mintFee = 0 ether;
    constructor(string memory collectionName, string memory collectionSymbol)  ERC721(collectionName, collectionSymbol) Ownable(msg.sender) {}
    
    function mintNFT(string memory tokenURI) external payable returns (uint256) {
        require(msg.value >= _mintFee, "Insufficient balance");
        
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current(); 
        
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        
        emit Minted(msg.sender, newItemId, tokenURI);
        
        return newItemId;
    }

    /**
     * @notice Withdraws the contract's balance to the owner's address.
     */
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function changeFee(uint256 newFee) external onlyOwner returns (uint256) {
        _mintFee =newFee; 
        return  newFee;
    }

    /**
     * @dev Emitted when a new NFT is minted.
     */
    event Minted(address indexed owner, uint256 indexed tokenId, string tokenURI);
}
