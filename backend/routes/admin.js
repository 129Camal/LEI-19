var express = require('express');
var router = express.Router();

const { verifyAdmin } = require('../config/token');

const User = require('../controllers/user')
const File = require('../controllers/file')


/* GET users listing. */
router.get('/users', verifyAdmin, (req, res, next) => {
    User.allUsers()
        .then(resp => {
            res.status(200).jsonp(resp)
        })
        .catch(err => res.status(404).jsonp({ status: "SYSTEM ERROR" }))
});

router.delete('/users/:id', verifyAdmin, (req, res, next) => {
    User.deleteUser(req.params.id)
        .then(resp => {
            res.status(200).jsonp({ status: "OK" })
        })
        .catch(err => res.status(404).jsonp({ status: "SYSTEM ERROR" }))
});

router.get('/files', verifyAdmin, (req, res, next) => {
    File.adminAllFiles()
        .then(resp => {
            res.status(200).jsonp(resp)
        })
        .catch(err => res.status(404).jsonp({ status: "SYSTEM ERROR" }))
});


module.exports = router;