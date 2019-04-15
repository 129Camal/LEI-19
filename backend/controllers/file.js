var File = require('../models/file')

module.exports.allFiles = ()=>{
    return File
        .find()
        .exec()
}

module.exports.addFile = file =>{
    return File.create(file)
}


module.exports.getIntMass = name =>{
    return File
        .find({name: name},{_id:0, sumIntensitiesPerMass:1})
        .exec()
}

module.exports.getSumIntensity = name =>{
    return File
        .find({name: name},{_id:0, sumIntensities:1, nScans:1})
        .exec()
}

module.exports.getInfoFile = name =>{
    return File
        .find({name: name},{sumIntensities:0, sumIntensitiesPerMass:0})
        .exec()
}

module.exports.deleteFile = id =>{
    return File
        .findOneAndDelete({_id: id})
        .exec()
}