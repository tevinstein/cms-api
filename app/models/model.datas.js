var mongoose = require('mongoose')

var dataSchema = mongoose.Schema({
	letter   : String,
	frequency: Number
}, { collection: 'datas' })

module.exports = mongoose.model('Data', dataSchema)