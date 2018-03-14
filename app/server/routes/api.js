var request = require('request');

const async = require('asyncawait/async');
const await = require('asyncawait/await');

var UserController = require('../controllers/UserController');
var SongController = require('../controllers/SongController');

var blockchain = require('../services/blockchain')

var counter = 0;

function getSongById(songId, artist) {
    return new Promise(function (resolve, reject) {
        SongController.findById(songId, function(result, err) {
            console.log(result);
            if (err) {
                console.log("error 1");
                SongController.deployContract(songId, artist, function(error, result1) {
                    resolve(error.contractAddress);
                });
            }
            else if (result) {
                console.log("result 1")
                getPromise(result.contractAddress).then(function(thing) {
                    resolve(thing);
                });
            } 
            else {
                console.log("no result 1");
                SongController.deployContract(songId, artist, function(error, result1) {
                    resolve(error.contractAddress);
                });
            }
        });
    });
}

function getUserById(fbId) {
    return new Promise(function (resolve, reject) {
        UserController.findOneByFbId(fbId, function(result, err) {
            console.log(result);
            if (err) {
                console.log("error 2");
                UserController.createWallet(fbId, blockchain.getUserAccounts()[counter], function(result1, error) {
                    resolve(result1.walletAddress);    
                });
            }
            else if (result) {
                console.log("result 2")
                resolve(result.walletAddress);
            } 
            else {
                console.log("no result 2");
                UserController.createWallet(fbId, blockchain.getUserAccounts()[counter], function(result1, error) {
                    counter++;
                    resolve(result1.walletAddress);
                });
            }
        });
    })
}

getPromise = async(function(object) {
    var result = await(object);
    return result;
})

module.exports = function(router) {
    router.post('/buy', async(function(req, res, next) {
        console.log(req.body);
        var contractAddress = await(getSongById(req.body.songId, req.body.artist));
        var walletAddress = await(getUserById(req.body.facebookId));

        console.log(contractAddress + " " + walletAddress);
       
        await(blockchain.addToken(req.body.songId, walletAddress, contractAddress, [blockchain.getAdminAccount()])); 
        console.log("Wallet Address:" + walletAddress + " has successfully bought from " + contractAddress);
        res.send(200, {message: "ok"});
    }));

    router.post('/check', async(function(req, res) {
        console.log(req.body);

        var contractAddress = await(getSongById(req.body.songId, req.body.artist));
        var walletAddress = await(getUserById(req.body.facebookId));

        value = await(blockchain.hasToken(walletAddress, contractAddress));

        res.send(200, {message: value.toString()});
    }));
}
