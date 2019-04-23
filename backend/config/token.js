const jwt = require('jsonwebtoken')
const fs = require('fs')

const publicKey =  fs.readFileSync('./keys/public.key', 'utf8')

module.exports = {
    verifyToken: (req, res, next) => {
        const bearerHeader = req.headers['authorization']
        
        if(typeof bearerHeader !== 'undefined'){
		    req.token = bearerHeader.split(' ')[1]
			
			jwt.verify(req.token, publicKey, {algorithm: 'RS256'}, (err, authData)=>{
				if(err){
				  res.status(403).jsonp({status:"ERROR INVALID TOKEN"})
				} else {
					next()
				}
			  })
	    } else {
		    res.status(403).jsonp({status:"ACESS DENIED"})
	    }
    }
};