
module.exports = {
    verifyToken: (req, res, next) => {
        const bearerHeader = req.headers['authorization']
        
        if(typeof bearerHeader !== 'undefined'){
		    req.token = bearerHeader.split(' ')[1]
		    next()

	    } else {
		    res.status(403).jsonp({status:"ACESS DENIED"})
	    }
    }
};