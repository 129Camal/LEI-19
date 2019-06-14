var mongoose = require('mongoose')
var Schema = mongoose.Schema

var FileSchema = new Schema({
    name: String,
    dateInput: {type: Date, default: Date.now},
    dateTest: Date,
    description: String,
    nScans: Number,
    idUser: String,
    sumIntensities: [mongoose.Decimal128],
    sumIntensitiesPerMass: [mongoose.Decimal128]
}, {
    versionKey: false 
})

module.exports = mongoose.model('File', FileSchema, 'files')