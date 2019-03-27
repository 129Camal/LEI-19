var express = require('express');
var router = express.Router();
var jsmzml = require('js_mzml');
var fs = require('fs')


/* GET home page. */
router.get('/mzml', (req, res, next) => {
  
  filename = 'mzML/mydata.mzML';

  let mzml = new jsmzml(filename);
  
  let options = {
    'level': '1',
    'rtBegin': 0,
    'rtEnd': 9999999999
  };

  let spectra = mzml.retrieve(options, () => {
    let matrix = []
    let sumIntensity = new Array(Object.keys(mzml.spectra).length).fill(0);
    let numScans = Array.apply(null, {length: Object.keys(mzml.spectra).length}).map(Number.call, Number)
    
    matrix[0] = Array.apply(null, {length: 1000}).map(Number.call, Number)
    
    for(let i = 0; i < Object.keys(mzml.spectra).length; i++){
      matrix[i+1] = new Array(1000).fill(0);
      let key = Object.keys(mzml.spectra)[i]

      for(let j = 0; j< mzml.spectra[key].mass.length; j++){
        let mass = Math.round(mzml.spectra[key].mass[j])
        let intensity = mzml.spectra[key].intensity[j]
        
        if(intensity){
          matrix[i+1][mass-1] = Number.parseFloat(intensity.toFixed(2))
        } 
      }
      sumIntensity[i] = parseFloat(matrix[i+1].reduce((acc, actual) => acc + actual).toFixed(2))
      
    }
    
    var output = []

    var result = {
      scans: numScans,
      intensity: sumIntensity
    }

    output.push(result)
    res.jsonp(output)
    
  });
})

router.get('/getfile', (req, res, next) => {
  fs.readFile('result.json', (data, err) =>{
    if(!err){
      let json = JSON.parse(data)
      res.write(json)
      
    } else {
      res.write(err)
    }
    res.end()
  })
})

router.get('/mzmlweb', (req, res, next) => {
  
  filename = 'mzML/mydata.mzML';

  var mzml = new jsmzml(filename);
  
  var options = {
    'level': '1',
    'rtBegin': 0,
    'rtEnd': 1
  };

  var spectra = mzml.retrieve(options, () => {
    
    res.send(mzml.spectra)
    
  });
})


module.exports = router;
