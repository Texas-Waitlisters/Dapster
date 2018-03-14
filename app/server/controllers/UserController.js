var User = require('../models/User');
var moment = require('moment');

const async = require('asyncawait/async');
const await = require('asyncawait/await');

var UserController = {};

UserController.createWallet = async(function(facebookId, walletAddress, callback) {
    console.log(facebookId + "  " + walletAddress);
    var u = User();
    u.facebookId = facebookId;
    u.walletAddress = walletAddress;
    u.lastUpdated = Date.now();
    await(u.save());
    callback({walletAddress: walletAddress});
});

UserController.findOneByFbId = function(fbId, callback) {
    User.findOneByFbId(fbId, callback);
}

module.exports = UserController;
