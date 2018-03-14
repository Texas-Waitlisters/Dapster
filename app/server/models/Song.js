var mongoose    = require('mongoose');

var schema = new mongoose.Schema({
    
    cid: {
        type: Number,
        required: true
    },

    artist: {
        type: String
    },

    contractAddress: {
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

schema.statics.findOneByCid = function(cid, callback) {
    this.findOne({
        cid: cid
    }).lean().exec(function(err, doc) {
        if (err) {
            callback(err);
        }
        else {
            callback(doc);
        }
    })
}

module.exports = mongoose.model('Song', schema);
