pragma solidity ^0.4.18;

import "./ERC721.sol";

contract MusicChecker is ERC721 {
    address public admin;
    uint256 public counter = 0;
    mapping (address => bool) public approvedHandlers;
    mapping (uint256 => AdditionalTokenData) public additionalData;

    struct AdditionalTokenData {
        string cid;
        address[] beneficiaries;
        uint256[] amounts;
        uint256 minted;
    }

    function MusicChecker(address _admin) public {
        admin = _admin;
    }

    function getCounter() public view returns (uint256) {
        return counter;
    }

    function getCid(uint256 _tokenId) public view returns (string) {
        return additionalData[_tokenId].cid;
    }

    function getBeneficiaries(uint256 _tokenId) public view returns (address[]) {
        return additionalData[_tokenId].beneficiaries;
    }

    function getAmounts(uint256 _tokenId) public view returns (uint256[]) {
        return additionalData[_tokenId].amounts;
    }

    function getMinted(uint256 _tokenId) public view returns (uint256) {
        return additionalData[_tokenId].minted;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin);
        _;
    }

    modifier onlyApprovedHandler() {
        require(approvedHandlers[msg.sender]);
        _;
    }

    function setApprovedHandler(address _handler, bool _state) public onlyAdmin {
        approvedHandlers[_handler] = _state;
    }

    function changeAdmin(address _newAdmin) public onlyAdmin {
        admin = _newAdmin;
    }

    function setMetadata(uint256 _tokenId, string _metadata) public onlyAdmin {
        tokenMetadata[_tokenId] = _metadata;
    }

    function receiveNotification(string _cid,
                                address _buyer,
                                address[] _beneficiaries,
                                uint256[] _amounts) public payable onlyApprovedHandler {
                                    addToken(_buyer, counter);
                                    AdditionalTokenData memory aData;
                                    aData.cid = _cid;
                                    aData.beneficiaries = _beneficiaries;
                                    aData.amounts = _amounts;
                                    aData.minted = now;
                                    additionalData[counter] = aData;
                                    Transfer(0, _buyer, counter);
                                    totalSupply += 1;
                                    counter += 1;
                                }

    function burnToken(uint256 _tokenId) public {
        require(tokenOwner[_tokenId] == msg.sender);
        removeToken(msg.sender, _tokenId);
        Transfer(msg.sender, 0, _tokenId);
        totalSupply -= 1;
    }

}
