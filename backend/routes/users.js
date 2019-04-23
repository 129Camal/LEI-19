var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs')
const fs = require('fs')
const jwt = require('jsonwebtoken')

const privateKey =  fs.readFileSync('./keys/private.key', 'utf8')
const publicKey =  fs.readFileSync('./keys/public.key', 'utf8')

const { verifyToken } = require('../config/token');

const User = require('../controllers/user')


/* GET users listing. */
router.get('/login', (req, res, next) => {
	res.render('login')
});

router.post('/login', (req, res, next) =>{
	
	User.getUser(req.body.email)
		.then(user =>{
			if(!user){
				res.status(404).jsonp({status:"ERROR EMAIL DOESNT EXIST"})
			} else {
				
				bcrypt.compare(req.body.password, user.password, (err, isMatch) =>{
					if(err){
						console.log(err)
						res.status(500).jsonp({status:"ERROR"})
					} else {
						if(isMatch){
							
							jwt.sign({id: user._id, LevelPermission: user.userType }, privateKey, {expiresIn: '1h', algorithm: 'RS256'}, (err, token) => {
								res.status(200).jsonp({status: "OK LOGGED", acessToken: token})
							})	
							
						} else {
							res.status(404).jsonp({status:"ERROR PASSWORD INVALID"})
						}
					}
				
				})
			}
		})
		.catch(err => {
			console.log(err)
			res.status(500).send({status:"ERROR"})
		})
});

router.get('/register', (req, res) =>{

	res.render('register')

})

// Register Handler
router.post('/register', (req , res)=>{
	const { name, email, password } = req.body

	// Check password length
	if(password.length < 2){
		res.send({ status: 'ERROR PASSWORD SIZE 2 MIN'})
	}

	User.getUser(email)
		.then(resp => {
			if(resp){
				res.send({status: "ERROR EMAIL ALREADY IN USE"})
			} else {
				let user = {
					name,
					email,
					password,
					userType: 2
				}
				bcrypt.genSalt( 10, ( err, salt) =>{
					bcrypt.hash( user.password, salt, (err, hash) => {
						if(err){
							res.send({status: "ERROR ENC PASSWORD"})
						}
						user.password = hash 

						User.addUser(user)
							.then(()=>{
								res.send({status:"OK"})
							})
							.catch(err => {
								console.log(err) 
								res.send({status:"ERROR ADDING USER"})
							})
					})
				})
			}
	})
	.catch(err => {
		console.log(err)
		res.send({status:"ERROR BD"})
	})
})

module.exports = router;