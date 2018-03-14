const async = require('asyncawait/async');
const await = require('asyncawait/await');
const util = require('util');
const MusicChecker = require('../../../build/contracts/MusicChecker.json');
const TruffleContract = require('truffle-contract');
const Web3 = require('web3');
const ethereumjsWallet = require('ethereumjs-wallet');
const ProviderEngine = require('web3-provider-engine');
const WalletSubprovider = require('web3-provider-engine/subproviders/wallet.js');
const Web3Subprovider = require('web3-provider-engine/subproviders/web3.js');
const FilterSubprovider = require('web3-provider-engine/subproviders/filters.js');

const RPC_SERVER = util.format('https://rinkeby.infura.io/%s', process.env.INFURA_KEY);
const LOCAL_SERVER = 'http://127.0.0.1:7545'
const privateKey = process.env.ETHEREUM_PRIVATE_KEY;
const web3Provider = new Web3.providers.HttpProvider(LOCAL_SERVER);

//const wallet = ethereumjsWallet.fromPrivateKey(new Buffer(privateKey, 'hex'));
const engine = new ProviderEngine();
engine.addProvider(new FilterSubprovider);
//engine.addProvider(new WalletSubprovider(wallet, {}));
engine.addProvider(new Web3Subprovider(web3Provider));
engine.start();

var web3 = new Web3(web3Provider);
web3.eth.defaultAccount = web3.eth.accounts[0];

blockchain = {};

/** Blockchain functions **/

blockchain.getUserAccounts = function() {
    return web3.eth.accounts.slice(1);
}

blockchain.getAdminAccount = function() {
    return web3.eth.defaultAccount;
}

/** Contract functions **/

// loads a Truffle contract
function loadContract(file, provider, address) {
    return new Promise(function (resolve, reject) {
        let contract = TruffleContract(file);
        contract.setProvider(provider);
        contract.defaults({from: address, gas:4500000});
        resolve(contract);
    })
}

// deploys a new contract of the token
blockchain.createToken = async(function() {
    let contract = await(loadContract(MusicChecker, engine, web3.eth.defaultAccount));
    let musicChecker = await(contract.new(web3.eth.defaultAccount));
    return musicChecker.address;
});


// adds a token to an user
blockchain.addToken = async(function(cid, userAddress, contractAddress, ownerAddresses) {
    let contract = await(loadContract(MusicChecker, engine, web3.eth.defaultAccount));
    let musicChecker = await(contract.at(contractAddress));
    let counter = await(musicChecker.getCounter());
    if (counter == 0) {
        await(musicChecker.setApprovedHandler(web3.eth.defaultAccount, true));
    }
    await(musicChecker.receiveNotification(cid, userAddress, ownerAddresses, [1]));
    return true;
});


// checks if a user has a token
blockchain.hasToken = async(function(userAddress, contractAddress) {
    let contract = await(loadContract(MusicChecker, engine, web3.eth.defaultAccount));
    let musicChecker = await(contract.at(contractAddress));
    let tokens = await(musicChecker.getAllTokens(userAddress));
    if (typeof tokens !== 'undefined' && tokens.length > 0) {
        // the array is defined and has at least one element
        return true;
    }
    else {
        return false;
    }
});

module.exports = blockchain;
