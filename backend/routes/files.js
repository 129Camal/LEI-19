var express = require('express');
var router = express.Router();
var jsmzml = require('js_mzml');
var fs = require('fs')
const multer = require('multer')
var Regex = require("regex");
const exec = require('child_process').exec;
const createCsvWriter = require('csv-writer').createArrayCsvWriter;
const File = require('../controllers/file')
var url = require('url');


const { verifyToken } = require('../config/token');

//Set storage engine
const storage = multer.diskStorage({
  destination: './RAW/',
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({
  storage: storage
}).array('file', 100)

function getContent(filename, req) {

  return new Promise((resolve, reject) => {
    file = 'RAW/' + filename + '.mzML'

    var mzml = new jsmzml(file);

    var options = {
      'level': '1',
      'rtBegin': 0,
      'rtEnd': 9999999999
    };

    var spectra = mzml.retrieve(options, () => {
      if (mzml != undefined) {
        
        let matrix = []
        let sumIntensity = new Array(Object.keys(mzml.spectra).length).fill(0);

        let header = []
        let sumMass = new Array(950).fill(0)

        for (let aux = 50; aux <= 1000; aux++) {
          header.push(aux)
        }

        matrix[0] = header

        for (let i = 0; i < Object.keys(mzml.spectra).length; i++) {
          matrix[i] = new Array(950).fill(0);
          let key = Object.keys(mzml.spectra)[i]

          for (let j = 0; j < mzml.spectra[key].mass.length; j++) {
            let mass = Math.round(mzml.spectra[key].mass[j])
            let intensity = mzml.spectra[key].intensity[j]

            if (intensity) {
              matrix[i][mass - 50] = Number.parseFloat(intensity.toFixed(2))
              sumMass[mass - 51] = Number.parseFloat(sumMass[mass - 51] + Number.parseFloat(intensity.toFixed(2))).toFixed(2)
            }
          }
          sumIntensity[i] = parseFloat(matrix[i].reduce((acc, actual) => acc + actual).toFixed(2))
        }

        var response = "ERROR CREATING CSV"

        if (!fs.existsSync('./csv/' + req.userId)) {
          fs.mkdirSync('./csv/' + req.userId)
        }

        let file = {
          name: filename,
          dateTest: req.body.dateTest,
          description: req.body.description,
          nScans: Object.keys(mzml.spectra).length,
          idUser: req.userId,
          sumIntensities: sumIntensity,
          sumIntensitiesPerMass: sumMass
        }

        let csvWriter = createCsvWriter({
          header: header,
          path: './csv/' + req.userId + '/' + filename + '.csv'
        })
        csvWriter.writeRecords(matrix)
          .then(() => {
            response = "OK"
            File.addFile(file)
            matrix = undefined
            sumIntensity = undefined
            sumMass = undefined
            mzml = undefined

            resolve({ status: response })
          })
          .catch(err => {

            matrix = undefined
            sumIntensity = undefined
            sumMass = undefined
            mzml = undefined

            reject({ status: response })
          });
      }
    })
  })


}

//---------------------------------------  Routes -------------------------------------------//

router.get('/', /*verifyToken,*/(req, res) => {
  res.status(200).render('file')

})

router.get('/graph/sumMass', verifyToken, (req, res) => {
  var file = url.parse(req.url, true).query.file

  File.getIntMass(file)
    .then(resp => {
      let sum = resp[0].sumIntensitiesPerMass
      for (let i = 0; i < sum.length; i++) {
        sum[i] = parseFloat(sum[i])
      }
      res.status(200).jsonp(resp)
    })
    .catch(err => res.status(404).jsonp({ status: "FILE NOT AVAILABLE" }))
})


router.get('/graph/sumIntensity', verifyToken, (req, res) => {
  var file = url.parse(req.url, true).query.file
  console.log(file)
  File.getSumIntensity(file)
    .then(resp => {
      let sum = resp[0].sumIntensities
      for (let i = 0; i < sum.length; i++) {
        sum[i] = parseFloat(sum[i])
      }
      res.status(200).jsonp(resp)
    })
    .catch(err => res.status(404).jsonp({ status: "FILE NOT AVAILABLE" }))
})

router.get('/info', verifyToken, (req, res) => {
  var file = url.parse(req.url, true).query.file
  File.getInfoFile(file)
    .then(resp => {
      res.status(200).jsonp(resp)
    })
    .catch(err => res.status(404).jsonp({ status: "FILE NOT AVAILABLE" }))
})

router.delete('/delete/:id/:name', verifyToken, (req, res) => {
  File.deleteFile(req.params.id)
    .then(resp => {
      
      exec('rm ' + __dirname + '/../RAW/'+ req.userId + '/' + req.params.name + '.RAW');
      exec('rm ' + __dirname + '/../csv/' + req.userId + '/' + req.params.name + '.csv');
      res.status(200).jsonp({ status: "OK" })
    })
    .catch(err => res.status(404).jsonp({ status: "ERROR DELETING THE FILE" }))
});

router.post('/import', verifyToken, (req, res) => {
  upload(req, res, (errupl) => {

    if (!errupl) {
      console.log(req.body)
      let fileRaw = req.files[0].originalname.replace(/(\s)+/g, '\\ ');
      let fileMzml = fileRaw.split('.')[0] + '.mzML'

      if (fileRaw.split('.')[1] != "RAW") {
        exec('rm ' + __dirname + '/../RAW/' + fileRaw);
        res.status(500).jsonp({ status: "FILE TYPE ERROR" })
      }

      else {
        let error = 0
        let testscript = exec('docker run --rm -e WINEDEBUG=-all -v ' + __dirname + '/../RAW:/data/ rawconverter wine msconvert ' + fileRaw);

        testscript.stderr.on('data', (data) => {
          error = 1
          exec('rm ' + __dirname + '/../RAW/' + fileRaw);
          exec('rm ' + __dirname + '/../RAW/' + fileMzml);
          res.status(500).jsonp({ status: "ERROR CONVERTING THE FILE" })
        });

        testscript.on('exit', () => {
          if (error == 0) {
            
            getContent(fileRaw.split('.')[0], req)
              .then(response => {
                if (!fs.existsSync('./RAW/' + req.userId)) {
                  fs.mkdirSync('./RAW/' + req.userId)
                }
                exec('mv ' + __dirname + '/../RAW/' + fileRaw + " " + __dirname + '/../RAW/' + req.userId );
                exec('rm ' + __dirname + '/../RAW/' + fileMzml);
                res.status(200).jsonp(response)
              })
          }
        })
      }
    } else {
      console.log(errupl)
    }
  })

})

router.get('/csv/:id', verifyToken, (req, res) => {

  fs.readFile(__dirname + "/../csv/" + req.userId + "/" + req.params.id + '.csv', (error, data) => {
    if (!error) {
      res.setHeader('Content-disposition', 'attachment; filename=' + req.params.id + '.csv');
      res.set('Content-Type', 'text/csv');
      res.status(200).send(data)
    } else {
      res.status(404).send({ status: "ERROR FILE NOT FOUND" })
    }

  })
})

router.get('/raw/:id', verifyToken, (req, res) => {

  fs.readFile(__dirname + "/../raw/" + req.userId + "/" + req.params.id + '.RAW', (error, data) => {
    if (!error) {
      res.setHeader('Content-disposition', 'attachment; filename=' + req.params.id + '.RAW');
      res.set('Content-Type', 'text/*');
      res.status(200).send(data)
    } else {
      res.status(404).send({ status: "ERROR FILE NOT FOUND" })
    }

  })
})

router.get('/all', verifyToken, (req, res) => {
  File.allFiles(req.userId)
    .then(resp => {
      res.status(200).jsonp(resp)
    })
    .catch(err => res.status(404).jsonp({ status: "FILES NOT AVAILABLE" }))
})


module.exports = router;
