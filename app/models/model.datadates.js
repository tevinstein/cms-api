var mongoose = require('mongoose'),
    moment = require('moment')

var dataDateSchema = mongoose.Schema({
    letter: Date,
    frequency: Number
}, { collection: 'datadates' })

dataDateSchema.methods.toJSON = function() {
    var obj = this.toObject()
    obj.letter = moment(obj.letter).format('YYYY-MM-DD')
    return obj
};

module.exports = mongoose.model('DataDate', dataDateSchema)
