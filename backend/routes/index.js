var express = require('express');
var router = express.Router();
var jsmzml = require('js_mzml');
var fs = require('fs')

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
    
    res.send(mzml.spectra);
  
  });

})

module.exports = router;
