var express = require('express');
var router = express.Router();
var jsmzml = require('js_mzml');
var fs = require('fs')
var matrixGen = require('../mzML/matrix.js')

/* GET home page. */
router.get('/mzml', (req, res, next) => {
  
  filename = 'mzML/mydata.mzML';

  var mzml = new jsmzml(filename);
  
  var options = {
    'level': '1',
    'rtBegin': 0,
    'rtEnd': 1
  };

  var spectra = mzml.retrieve(options, () => {
    
    //console.log(mzml.spectra)
    //res.send({})
    res.send(mzml.spectra);
    console.log(mzml.spectra["1"].time)
    matrixGen.createMatrix(mzml.spectra,( matrix ) => {
      
    })

  });

})

module.exports = router;
