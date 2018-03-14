require('dotenv').load({silent: true});

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

/*const mnemonic = "ginger immense calm miss gas mango visual orchard antenna regular atom balance";
const hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));

const hdWalletPath = "m/44'/60'/0'/0/";
const wallet = hdwallet.derivePath(`${hdWalletPath}0`).getWallet();*/

const RPC_SERVER = util.format('https://rinkeby.infura.io/%s', process.env.INFURA_KEY);
const LOCAL_SERVER = 'http://127.0.0.1:7545'
const privateKey = process.env.ETHEREUM_PRIVATE_KEY;
const web3Provider = new Web3.providers.HttpProvider(RPC_SERVER);

var wallet = ethereumjsWallet.fromPrivateKey(new Buffer(privateKey, 'hex'));
const address = `0x${wallet.getAddress().toString('hex')}`;
console.log('address', address);

const engine = new ProviderEngine();
engine.addProvider(new FilterSubprovider);
engine.addProvider(new WalletSubprovider(wallet, {}));
engine.addProvider(new Web3Subprovider(web3Provider));
engine.start();

blockchain = {};
/*var web3 = new Web3(web3Provider);
web3.eth.defaultAccount = process.env.WALLET_ID;


/** Blockchain functions 

blockchain.getUserAccounts = function() {
    return web3.eth.accounts.slice(1);
}

blockchain.getAdminAccount = function() {
    return web3.eth.defaultAccount;
}*/

blockchain.getAddress = function() {
    return address;
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
    console.log("Trying to load contract ABI.")
    let contract = await(loadContract(MusicChecker, engine, address));
    console.log("Contract ABI loaded.")
    console.log("Trying to create new contract..");
    let musicChecker = await(contract.new(address));
    return musicChecker.address;
});


// adds a token to an user
blockchain.addToken = async(function(cid, userAddress, contractAddress, ownerAddresses) {
    let contract = await(loadContract(MusicChecker, engine, address));
    let musicChecker = await(contract.at(contractAddress));
    let counter = await(musicChecker.getCounter());
    if (counter == 0) {
        await(musicChecker.setApprovedHandler(address, true));
    }
    await(musicChecker.receiveNotification(cid, userAddress, ownerAddresses, [1]));
    return true;
});


// checks if a user has a token
blockchain.hasToken = async(function(userAddress, contractAddress) {
    let contract = await(loadContract(MusicChecker, engine, address));
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
