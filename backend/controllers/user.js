var User = require('../models/user')

module.exports.allUsers = ()=>{
        return User
        .find({}, {password:0})
        .sort({name:-1})
        .exec()
}


module.exports.getUser = email => {
    return User
        .findOne({email : email})
        .exec()

}

module.exports.getUserInfo = id => {
    return User
        .findOne({_id : id}, {_id:0, password:0, userType:0})
        .exec()

}
module.exports.deleteUser = id =>{
    return User
        .findOneAndDelete({_id: id})
        .exec()
}

module.exports.addUser = user =>{
    return User.create(user)
}

module.exports.changeUser = (id, name, email) =>{

    return User.updateOne({_id: id},{$set: {name: name, email: email}})
        
}