// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract OpenverseMarket is Ownable {

    struct ListingItem {
        uint256 tokenId;
        address seller;
        uint price;
        bool active;
    }

    address private _ownerAddress = 0xD9C477548B75778774D1F698A4Ec1DDDA726962c;
    uint256 public listingFee = 0 ether;
    mapping(uint256 => ListingItem) private ListingItems;
    ListingItem[] private allListingItems;
    ERC721 private nftContract;

    constructor(address _nftContract) Ownable(_ownerAddress) {
        nftContract = ERC721(_nftContract);
    }

    event ListingCreated(uint256 indexed tokenId, address indexed seller, uint256 price);
    event ListingRemoved(uint256 indexed tokenId, address indexed seller);
    event ListingBought(uint256 indexed  tokenId, address indexed buyer, uint256 price);

    modifier onlyNFTOwner(uint256 _tokenId){
        require(nftContract.ownerOf(_tokenId) == msg.sender, "Only the owner of the NFT can perform this action");
        _;
    }

    modifier onlyNFTListing(uint256 _tokenId){
        require(ListingItems[_tokenId].active, "NFT is not listed");
        _;
    }

    modifier onlySellerOrOwner(uint256 _tokenId){
        require(ListingItems[_tokenId].seller == msg.sender || owner() == msg.sender, "Only seller can perform this action");
        _;
    }

    function createListingItem(uint256 _tokenId, uint256 _price) external payable onlyNFTOwner(_tokenId){
        require(msg.value >= listingFee, "You must have to pay listing fee");
        require(ListingItems[_tokenId].active == false, "Item already listed");
        require(nftContract.getApproved(_tokenId) == address(this) || nftContract.isApprovedForAll(msg.sender, address(this)), "Contract is not approved to transfer this NFT");
        ListingItem memory item = ListingItem({
            tokenId: _tokenId,
            seller: msg.sender,
            price: _price,
            active: true
        });
        ListingItems[_tokenId] = item;
        allListingItems.push(item);
        emit ListingCreated(_tokenId, msg.sender, _price);

        nftContract.transferFrom(msg.sender, address(this), _tokenId);
    }

    function removeListing(uint256 _tokenId) external onlySellerOrOwner(_tokenId) onlyNFTListing(_tokenId) {
        delete ListingItems[_tokenId];
        _removeListingItem(_tokenId);
        emit ListingRemoved(_tokenId, msg.sender);

        nftContract.transferFrom(address(this), msg.sender, _tokenId);
    }

    function buyListingItem(uint256 _tokenId) external payable onlyNFTListing(_tokenId) {
        ListingItem storage Item = ListingItems[_tokenId];

        require(msg.value >= Item.price, "Incorrect amount sent");

        delete ListingItems[_tokenId];
        _removeListingItem(_tokenId);

        emit ListingBought(_tokenId, msg.sender, Item.price);

        payable(Item.seller).transfer(Item.price);

        nftContract.transferFrom(address(this), msg.sender, _tokenId);
    }

    function getItemListing(uint256 _tokenId) public view returns (uint256, address, uint256, bool) {
        ListingItem memory Item = ListingItems[_tokenId];
        return (Item.tokenId, Item.seller, Item.price, Item.active);
    }

    function getAllListingItems() public view returns (ListingItem[] memory){
        return allListingItems;
    }

    function updateListingFee(uint256 _fee) external onlyOwner {
        listingFee = _fee;
    }
   
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function _removeListingItem(uint256 _tokenId) internal {
        ListingItems[_tokenId].active = false;
        
        // Find the index of the item to remove
        uint index = allListingItems.length;
        for (uint i = 0; i < allListingItems.length; i++) {
            if (allListingItems[i].tokenId == _tokenId) {
                index = i;
                break;
            }
        }
        
        if (index < allListingItems.length) {
            // Swap with the last item and pop from the array
            allListingItems[index] = allListingItems[allListingItems.length - 1];
            allListingItems.pop();
        }
    }
}
