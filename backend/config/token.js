const jwt = require('jsonwebtoken')
const fs = require('fs')

const publicKey = fs.readFileSync('./keys/public.key', 'utf8')

module.exports = {
	verifyToken: (req, res, next) => {
		const bearerHeader = req.headers['authorization']

		if (typeof bearerHeader !== 'undefined') {
			req.token = bearerHeader.split(' ')[1]

			jwt.verify(req.token, publicKey, { algorithm: 'RS256' }, (err, authData) => {
				if (err) {
					res.status(200).jsonp({ status: "ERROR INVALID TOKEN" })
				} else {
					req.userId = authData.id
					next()
				}
			})
		} else {
			res.status(200).jsonp({ status: "ACESS DENIED" })
		}
	},
	verifyAdmin: (req, res, next) => {
		const bearerHeader = req.headers['authorization']

		if (typeof bearerHeader !== 'undefined') {
			req.token = bearerHeader.split(' ')[1]

			jwt.verify(req.token, publicKey, { algorithm: 'RS256' }, (err, authData) => {
				if (err) {
					res.status(200).jsonp({ status: "ERROR INVALID TOKEN" })
				} else {
					if (authData.user != 1) {
						res.status(200).jsonp({ status: "ACESS DENIED" })
					} else {
						req.userId = authData.id
						next()
					}
				}
			})
		} else {
			res.status(200).jsonp({ status: "ACESS DENIED" })
		}
	}
};