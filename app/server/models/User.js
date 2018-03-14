var mongoose    = require('mongoose');

var schema = new mongoose.Schema({
    
    facebookId: {
        type: String,
        min: 0,
        max: 100
    },

    walletAddress: {
        type: String,
        min: 0,
        max: 100
    },

    timestamp: {
        type: Number,
        required: true,
        default: Date.now()
    },

    lastUpdated:  {
        type: Number,
        required: Date.now()
    },

});

schema.set('toJSON', {
    virtuals: true
});

schema.set('toObject', {
    virtuals: true
});

schema.statics.findOneByFbId = function(fbId, callback) {
    this.findOne({
        facebookId: fbId
    }).lean().exec(function(err, doc) {
        if (err) {
            callback(err);
        }
        else {
            callback(doc);
        }
    });
}

module.exports = mongoose.model('User', schema);
