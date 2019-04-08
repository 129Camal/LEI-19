var express = require('express');
var router = express.Router();
var jsmzml = require('js_mzml');
var fs = require('fs')
const multer = require('multer')
const exec = require('child_process').exec;


//Set storage engine
const storage = multer.diskStorage({
  destination: './mzML/',
  filename: (req, file, cb) =>{
    cb(null, file.originalname)
  }
})

const upload = multer({
  storage: storage
}).array('file', 100)

router.get('/', (req, res) =>{
  res.render('file')
})

router.post('/import', (req, res) => {
  upload(req, res, (errupl) =>{
    if(!errupl){
      let testscript = exec('docker run --rm -e WINEDEBUG=-all -v /Users/fredericopinto/Documents/LEI-19/backend/mzML:/mzML/ rawconverter wine msconvert ')// + req.files[0].originalname);
    
      testscript.stderr.on('data', function(data){
        console.log("ERRO NA CONVERSÃO DO FICHEIRO");
      });

      //testscript.on('close', (data) => {
      //  console.log("Conversão efetuada com sucesso!");
      //});
    } else {
      console.log(errupl)
    }
  })
  console.log(req.body)
  res.redirect('/file')
})

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
