var Song = require('../models/Song');
var moment = require('moment');
var contracts = require('../services/blockchain')

const async = require('asyncawait/async');
const await = require('asyncawait/await');

var SongController = {};

SongController.deployContract = async(function(id, beneficiaries, callback) {
    contractAddress = await(contracts.createToken())
    var s = Song();
    s.cid = id;
    s.artist = beneficiaries;
    s.lastUpdated = Date.now();
    s.contractAddress = contractAddress;
    await(s.save());
    callback({contractAddress: s.contractAddress});
});

SongController.findById = function(id, callback) {
    Song.findOneByCid(id, callback);
}

module.exports = SongController;
