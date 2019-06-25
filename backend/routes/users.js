var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs')
const fs = require('fs')
const jwt = require('jsonwebtoken')

const privateKey = fs.readFileSync('./keys/private.key', 'utf8')

const { verifyToken } = require('../config/token');

const User = require('../controllers/user')

router.get('/', verifyToken, (req, res, next) => {
	User.getUserInfo(req.userId)
		.then(resp => {
			res.status(200).jsonp(resp)
		})
		.catch(err => {
			console.log(err)
			res.status(500).send({ status: "SYSTEM ERROR" })
		})
});

router.post('/update', verifyToken, (req, res, next) => {
	User.getUser(req.body.email)
		.then(resp => {
			if (resp && resp._id != req.userId) {
				res.status(200).send({ status: "ERROR EMAIL ALREADY IN USE" })
			} else {
				User.changeUser(req.userId, req.body.name, req.body.email)
					.then(resp => {
						res.status(200).jsonp({ status: "OK" })
					})
					.catch(err => {
						res.status(404).send({ status: "USER NOT FOUND" })
					})
			}
		})
		.catch(err => {
			res.send({ status: "ERROR BD" })
		})

});

/* GET users listing. */
router.get('/login', (req, res, next) => {
	res.render('login')
});

router.post('/login', (req, res, next) => {

	User.getUser(req.body.email)
		.then(user => {
			if (!user) {
				res.status(200).jsonp({ status: "ERROR EMAIL DOESNT EXIST" })
			} else {

				bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
					if (err) {
						console.log(err)
						res.status(500).jsonp({ status: "ERROR" })
					} else {
						if (isMatch) {

							jwt.sign({ id: user._id, "user": user.userType }, privateKey, { expiresIn: '1h', algorithm: 'RS256' }, (err, token) => {
								res.status(200).jsonp({ status: "OK LOGGED", acessToken: token })
							})

						} else {
							res.status(200).jsonp({ status: "ERROR PASSWORD INVALID" })
						}
					}

				})
			}
		})
		.catch(err => {
			res.status(500).send({ status: "SYSTEM ERROR" })
		})
});

router.get('/register', (req, res) => {

	res.render('register')

})

// Register Handler
router.post('/register', (req, res) => {
	const { name, email, password } = req.body

	// Check password length
	if (password.length < 2) {
		res.send({ status: 'ERROR PASSWORD SIZE 2 MIN' })
	}

	User.getUser(email)
		.then(resp => {
			if (resp) {
				res.send({ status: "ERROR EMAIL ALREADY IN USE" })
			} else {
				let user = {
					name,
					email,
					password,
					userType: 2
				}
				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(user.password, salt, (err, hash) => {
						if (err) {
							res.send({ status: "ERROR ENC PASSWORD" })
						}
						user.password = hash

						User.addUser(user)
							.then(() => {
								res.send({ status: "OK" })
							})
							.catch(err => {
								console.log(err)
								res.send({ status: "ERROR ADDING USER" })
							})
					})
				})
			}
		})
		.catch(err => {
			res.send({ status: "ERROR BD" })
		})
})

module.exports = router;