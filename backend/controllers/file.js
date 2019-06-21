var File = require('../models/file')

module.exports.allFiles = (id)=>{
    return File
        .find({idUser: id},{sumIntensities:0, sumIntensitiesPerMass:0})
        .exec()
}

module.exports.adminAllFiles = ()=>{
    return File
        .find({},{sumIntensities:0, sumIntensitiesPerMass:0})
        .exec()
}

module.exports.addFile = file =>{
    return File.create(file)
}


module.exports.getIntMass = id =>{
    return File
        .find({_id: id},{_id:0, sumIntensitiesPerMass:1})
        .exec()
}

module.exports.getSumIntensity = id =>{
    return File
        .find({_id: id},{_id:0, sumIntensities:1, nScans:1})
        .exec()
}

module.exports.getInfoFile = id =>{
    return File
        .find({_id: id},{sumIntensities:0, sumIntensitiesPerMass:0})
        .exec()
}

module.exports.deleteFile = id =>{
    return File
        .findOneAndDelete({_id: id})
        .exec()
}